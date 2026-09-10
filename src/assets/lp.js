/* ==========================================================================
   Landing page behaviour.
   Priorities, in order: never lose a lead, always attribute it, never block
   the visitor from picking up the phone.
   No dependencies - this runs before any tag manager finishes loading.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.LP_CONFIG || {};
  var dl = (window.dataLayer = window.dataLayer || []);

  function gtagSafe() {
    // gtag may not exist yet if GTM is slow or blocked. Queue regardless:
    // the command queue is replayed once the library loads.
    window.dataLayer.push(arguments);
  }

  /* ----------------------------------------------------------------------
     Attribution capture.
     Click IDs live on the landing URL only. If we do not copy them onto the
     lead now, the CRM record can never be tied back to the keyword that
     paid for it.
     ---------------------------------------------------------------------- */
  var ATTR_KEYS = [
    'gclid', 'gbraid', 'wbraid', 'msclkid',
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  ];
  var STORE_KEY = 'lp_attr';

  function readStored() {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function captureAttribution() {
    var params = new URLSearchParams(location.search);
    var stored = readStored();
    var merged = {};
    ATTR_KEYS.forEach(function (k) {
      var v = params.get(k);
      // A value on this URL always wins; otherwise keep what we already had.
      merged[k] = v || stored[k] || '';
    });
    merged.landing_page = location.pathname;
    merged.referrer = stored.referrer || document.referrer || '';
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(merged)); } catch (e) {}
    return merged;
  }

  var attribution = captureAttribution();

  /* ----------------------------------------------------------------------
     Conversion reporting.
     Two channels on purpose: a dataLayer event so GTM can route it anywhere,
     and a direct gtag conversion so Ads still records it if the container is
     misconfigured. A missing label skips only the second.
     ---------------------------------------------------------------------- */
  function report(eventName, labelKey, extra) {
    var payload = Object.assign({ event: eventName }, attribution, extra || {});
    dl.push(payload);

    var label = (CFG.conversionLabels || {})[labelKey];
    if (label && CFG.googleAdsId) {
      gtagSafe('event', 'conversion', {
        send_to: CFG.googleAdsId + '/' + label,
        value: 0,
        currency: 'USD',
      });
    }
  }

  /* ----------------------------------------------------------------------
     Call tracking.
     Delegated so it covers the sticky bar, the header, the hero and every
     repeat CTA without per-element wiring. There are no sms: links on these
     pages - the firm does not offer text as a contact route.
     ---------------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!a) return;
    report('lp_call_click', 'call', {
      cta_location: a.getAttribute('data-loc') || 'unknown',
      // CallRail rewrites href in place, so read it at click time, not load.
      phone_number: a.getAttribute('href').replace(/^tel:/, ''),
    });
  }, true);

  /* ----------------------------------------------------------------------
     Form.
     Phone is the required field. Email is optional and deliberately last:
     on a phone, every required field costs completions, and an email-only
     lead in this vertical is a slow lead.
     ---------------------------------------------------------------------- */
  function digits(s) { return (s || '').replace(/\D/g, ''); }

  function validPhone(value) {
    var d = digits(value);
    // US/Canada: 10 digits, or 11 starting with a country code of 1.
    if (d.length === 11 && d.charAt(0) === '1') d = d.slice(1);
    if (d.length !== 10) return false;
    // Area code and exchange cannot start with 0 or 1.
    return !/^[01]/.test(d) && !/^[01]/.test(d.slice(3));
  }

  function setError(field, message) {
    var input = field.querySelector('input, select, textarea');
    var err = field.querySelector('.field__err');
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (err) { err.textContent = message; err.classList.add('is-shown'); }
    } else {
      input.removeAttribute('aria-invalid');
      if (err) { err.classList.remove('is-shown'); }
    }
    return !message;
  }

  /* --------------------------------------------------------------------
     Multi-step controller.

     The markup is a complete, working form before this runs: real radios,
     real inputs, every question visible. This only layers stepping on top,
     so a script that fails to load costs nobody a lead.
     -------------------------------------------------------------------- */
  function fill(template, vars) {
    return String(template || '').replace(/\{(\w+)\}/g, function (_, k) {
      return vars[k] == null ? '' : vars[k];
    });
  }

  function initSteps(form, T) {
    var steps = [].slice.call(form.querySelectorAll('[data-step]'));
    if (steps.length < 2) return null;

    var bar = form.querySelector('[data-bar]');
    var label = form.querySelector('[data-steplabel]');
    var progress = form.querySelector('[data-progress]');
    var back = form.querySelector('[data-back]');
    var announce = form.querySelector('[data-announce]');
    var at = 0;

    if (progress) progress.hidden = false;

    function valid(step) {
      var radios = step.querySelectorAll('input[type="radio"]');
      var err = step.querySelector('.field__err');
      var ok = true;
      var message = '';

      if (radios.length) {
        ok = [].some.call(radios, function (r) { return r.checked; });
        message = ok ? '' : T.errIncident;
      } else {
        var input = step.querySelector('input[name="name"], input[name="phone"]');
        if (input) {
          if (input.name === 'name') {
            ok = input.value.trim().length >= 2;
            message = ok ? '' : T.errName;
          } else {
            ok = validPhone(input.value);
            message = ok ? '' : T.errPhone;
          }
          if (ok) input.removeAttribute('aria-invalid');
          else input.setAttribute('aria-invalid', 'true');
        }
      }
      if (err) {
        err.textContent = message;
        err.classList.toggle('is-shown', !!message);
      }
      return ok;
    }

    function show(i, moving) {
      at = i;
      steps.forEach(function (s, n) { s.hidden = n !== i; });
      if (bar) bar.style.width = ((i + 1) / steps.length) * 100 + '%';
      if (label) label.textContent = fill(T.stepOf, { n: i + 1, total: steps.length });
      if (back) back.hidden = i === 0;

      var text = steps[i].getAttribute('data-label') || '';
      if (announce) {
        announce.textContent = fill(T.stepAnnounce, { n: i + 1, total: steps.length, label: text });
      }

      if (moving) {
        // Focus the first control so a keyboard or screen-reader user lands
        // in the question rather than at the top of the form. Not on first
        // paint, which would yank the page down to the form on load.
        var focusable = steps[i].querySelector('input:not([type="radio"]), input[type="radio"]');
        if (focusable) {
          try { focusable.focus({ preventScroll: true }); } catch (e) { focusable.focus(); }
        }
      }
    }

    function go(i) {
      if (i > at && !valid(steps[at])) return;
      if (i < 0 || i >= steps.length) return;
      report('lp_form_step', null, {
        form_id: form.id,
        step: i + 1,
        step_label: steps[i].getAttribute('data-label') || '',
      });
      show(i, true);
    }

    // A tapped choice is an answer; advance without making them find a button.
    form.addEventListener('change', function (e) {
      if (e.target.type !== 'radio') return;
      var step = e.target.closest('[data-step]');
      if (!step || steps.indexOf(step) !== at) return;
      valid(step);
      setTimeout(function () { go(at + 1); }, 180);
    });

    form.addEventListener('click', function (e) {
      if (e.target.closest('.fnext')) { e.preventDefault(); go(at + 1); }
      else if (e.target.closest('[data-back]')) { e.preventDefault(); go(at - 1); }
    });

    // Enter in a text step advances rather than submitting a half-filled form.
    form.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      if (e.target.tagName !== 'INPUT' || e.target.type === 'radio') return;
      if (at < steps.length - 1) { e.preventDefault(); go(at + 1); }
    });

    show(0, false);

    return {
      validateAll: function () {
        for (var i = 0; i < steps.length; i++) {
          if (!valid(steps[i])) { show(i, true); return false; }
        }
        return true;
      },
    };
  }

  function initForm(form) {
    var status = form.querySelector('.form-status');
    var T = CFG.i18n || {};
    var steps = form.hasAttribute('data-steps') ? initSteps(form, T) : null;
    // The last .btn--submit is the real one; earlier ones are step "Continue"
    // buttons that never submit.
    var submits = form.querySelectorAll('button[type="submit"]');
    var submit = submits[submits.length - 1];
    var submitLabel = submit ? submit.innerHTML : '';
    var started = false;

    // Fire once, the first time someone actually engages with the form.
    // Useful as a soft signal for smart bidding when volume is thin.
    form.addEventListener('input', function () {
      if (started) return;
      started = true;
      report('lp_form_start', null, { form_id: form.id });
    }, { once: false });

    // Live-format the phone as it is typed. Reduces mistyped numbers, which
    // are the single most common reason a "lead" cannot be reached.
    var phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        var d = digits(phoneInput.value).slice(0, 10);
        var out = d;
        if (d.length > 6) out = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
        else if (d.length > 3) out = '(' + d.slice(0, 3) + ') ' + d.slice(3);
        else if (d.length > 0) out = '(' + d;
        phoneInput.value = out;
      });
    }

    function show(kind, message) {
      if (!status) return;
      status.className = 'form-status' + (kind ? ' is-' + kind : '');
      status.textContent = message || '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Bots fill hidden fields. Drop the submission without feedback -
      // telling a bot why it failed only helps it retry.
      var honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value.trim()) return;

      var ok = true;
      if (steps) {
        ok = steps.validateAll();
      } else {
        var nameField = form.querySelector('[data-field="name"]');
        var phoneField = form.querySelector('[data-field="phone"]');
        if (nameField) {
          var nameVal = nameField.querySelector('input').value.trim();
          ok = setError(nameField, nameVal.length < 2 ? T.errName : '') && ok;
        }
        if (phoneField) {
          var phoneVal = phoneField.querySelector('input').value;
          ok = setError(phoneField, validPhone(phoneVal) ? '' : T.errPhone) && ok;
        }
      }

      if (!ok) {
        show('error', T.errFix);
        return;
      }

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      Object.assign(data, attribution, {
        submitted_at: new Date().toISOString(),
        page_title: document.title,
        form_id: form.id,
        language: document.documentElement.lang || 'en',
      });

      // Formspree uses _subject as the notification email's subject line.
      // Intake reads this on a phone at 9pm; it has to say who and what
      // without opening the message.
      data._subject =
        'NEW LEAD: ' + (data.name || 'no name') + ' - ' + (data.incident || 'type not given') +
        (data.crash_when ? ' (' + data.crash_when + ')' : '') +
        ' - ' + (data.phone || 'no phone') +
        (data.language === 'es' ? ' [ESPANOL]' : '');

      if (submit) { submit.setAttribute('aria-busy', 'true'); submit.textContent = T.sendingBtn; }
      show('busy', T.sending);

      // The conversion fires before the network call resolves. A lead who
      // closes the tab on the thank-you redirect still gets counted, and
      // Ads never under-reports because an endpoint was slow.
      report('lp_form_submit', 'formSubmit', {
        incident_type: data.incident || '',
        form_id: form.id,
      });

      function done() {
        var url = CFG.thankYouUrl || '/thank-you/';
        var qs = data.incident ? '?t=' + encodeURIComponent(data.incident) : '';
        location.href = url + qs;
      }

      function failed() {
        if (submit) { submit.removeAttribute('aria-busy'); submit.innerHTML = submitLabel; }
        show('error', T.errSend || '');
      }

      if (!CFG.formEndpoint) {
        // Nothing configured. Fail loudly in the console rather than
        // pretending a lead was captured.
        console.error('[LP] formEndpoint is not configured. Lead was NOT delivered:', data);
        failed();
        return;
      }

      var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = controller ? setTimeout(function () { controller.abort(); }, 12000) : null;

      fetch(CFG.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Without this Formspree answers with a 302 to its own thank-you
          // page instead of JSON, and the redirect below never runs.
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller ? controller.signal : undefined,
      })
        .then(function (res) {
          if (timer) clearTimeout(timer);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          done();
        })
        .catch(function (err) {
          if (timer) clearTimeout(timer);
          console.error('[LP] Lead delivery failed:', err, data);
          failed();
        });
    });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    Array.prototype.forEach.call(document.querySelectorAll('form[data-lp-form]'), initForm);

    // Page view with attribution attached, so GTM sees the click ID on the
    // very first event rather than inferring it later.
    report('lp_view', null, {});

    // Prefill the incident type on the thank-you page for the intake team.
    var t = new URLSearchParams(location.search).get('t');
    var slot = document.querySelector('[data-incident-slot]');
    if (t && slot) slot.textContent = t;
  });
})();

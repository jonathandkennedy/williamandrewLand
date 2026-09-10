/* William Andrews PPC landers — page runtime.
   No dependencies. Runs before GTM finishes loading, so nothing here waits
   on a tag manager that may be blocked. */
(function(){
'use strict';
var C = window.LP || {};
var dl = (window.dataLayer = window.dataLayer || []);
var T  = C.t || {};                 // active-language string table
var qs = new URLSearchParams(location.search);

/* ---- attribution -------------------------------------------------------
   Click IDs live on the landing URL only. Copy them onto the lead now or
   the CRM record can never be tied back to the keyword that paid for it. */
var ATTR = ['gclid','gbraid','wbraid','msclkid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
var attr = (function(){
  var saved = {};
  try { saved = JSON.parse(sessionStorage.getItem('lp_attr')||'{}'); } catch(e){}
  var out = {};
  ATTR.forEach(function(k){ out[k] = qs.get(k) || saved[k] || ''; });
  out.referrer = saved.referrer || document.referrer || '';
  try { sessionStorage.setItem('lp_attr', JSON.stringify(out)); } catch(e){}
  return out;
})();

function push(ev, extra){
  dl.push(Object.assign({event:ev, geo:C.geo||'', case_type:C.caseType||'', lang:C.lang||'en'}, attr, extra||{}));
}

/* ---- Spanish -----------------------------------------------------------
   ?lang=es swaps text in place from the #i18n-es op list. One file serves
   both languages, so a Spanish campaign is a deep link, not a second page. */
function applyEs(){
  var el = document.getElementById('i18n-es');
  if (!el) return;
  var m; try { m = JSON.parse(el.textContent); } catch(e){ return; }
  (m.text||[]).forEach(function(op){
    var n = document.querySelectorAll(op.s)[op.i||0];
    if (n) n.textContent = op.t;
  });
  (m.html||[]).forEach(function(op){
    var n = document.querySelectorAll(op.s)[op.i||0];
    if (n) n.innerHTML = op.t;
  });
  (m.attr||[]).forEach(function(op){
    var n = document.querySelectorAll(op.s)[op.i||0];
    if (n) n.setAttribute(op.a, op.t);
  });
  document.documentElement.lang = 'es';
  C.lang = 'es';
  if (m.strings) T = C.t = m.strings;
  if (m.title) document.title = m.title;
}

/* ---- keyword insertion -------------------------------------------------
   Whitelist only. The raw query string never reaches the DOM: an unknown
   or missing kw leaves the control headline exactly as baked. */
function applyKw(){
  if (!C.kwMap) return;
  // The whitelist is keyed on English ad keywords. On a Spanish page it would
  // overwrite the translated headline with English, so it is skipped: showing
  // the Spanish control headline beats adapting into the wrong language.
  if (C.lang === 'es') return;
  // Digits are kept — "18 wheeler" is a real keyword — but nothing outside
  // [a-z0-9 ] survives, and the result is only ever used as a MAP KEY. No
  // query text is written to the page under any input.
  var raw = (qs.get('kw')||'').toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim().slice(0,40);
  if (!raw) return;
  var near = / near me$/.test(raw);
  var key = raw.replace(/ near me$/,'').trim();
  var swap = C.kwMap[key];
  if (!swap) return;
  var pre = document.querySelector('.h1-pre'), post = document.querySelector('.h1-post');
  if (pre && swap.pre) pre.textContent = swap.pre;
  if (post && swap.post) post.textContent = swap.post + (near && swap.near ? swap.near : '');
  C.variant = 'kw-test';
  C.kw = key + (near ? ' near me' : '');
}

/* ---- call tracking ----------------------------------------------------- */
document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('a[href^="tel:"]');
  if (!a) return;
  push('call_click', {
    cta_location: a.getAttribute('data-loc')||'unknown',
    // CallRail rewrites href in place, so read it at click time, not load.
    phone_number: a.getAttribute('href').replace(/^tel:/,'')
  });
}, true);

/* ---- phone validation (NANP) -------------------------------------------
   A number that cannot be dialled is not a lead. Rejects 0/1-leading area
   codes and exchanges, N11 service codes, and repeated-digit junk. A typed
   country code is normalised away rather than failed. */
function digits(s){ return String(s||'').replace(/\D/g,''); }
function validPhone(v){
  var d = digits(v);
  if (d.length === 11 && d.charAt(0) === '1') d = d.slice(1);
  if (d.length !== 10) return false;
  var area = d.slice(0,3), exch = d.slice(3,6), line = d.slice(6);
  if (/^[01]/.test(area) || /^[01]/.test(exch)) return false;   // N must be 2-9
  if (/^\d11$/.test(area) || /^\d11$/.test(exch)) return false; // 411, 911, ...
  if (/^(\d)\1{9}$/.test(d)) return false;                      // 5555555555
  if (/^(\d)\1{6}$/.test(d.slice(3))) return false;             // 801 1111111
  if (d === '1234567890' || d === '0123456789') return false;
  if (/^(\d)\1{3}$/.test(line)) return false;                   // ...-1111
  return true;
}

function fmt(v){
  var d = digits(v); if (d.length===11 && d.charAt(0)==='1') d=d.slice(1);
  d = d.slice(0,10);
  if (d.length > 6) return '('+d.slice(0,3)+') '+d.slice(3,6)+'-'+d.slice(6);
  if (d.length > 3) return '('+d.slice(0,3)+') '+d.slice(3);
  if (d.length > 0) return '('+d;
  return '';
}

/* ---- the form ---------------------------------------------------------- */
function initForm(form){
  var steps  = [].slice.call(form.querySelectorAll('[data-step]'));
  var bar    = form.querySelector('[data-bar]');
  var lbl    = form.querySelector('[data-steplabel]');
  var prog   = form.querySelector('[data-prog]');
  var back   = form.querySelector('[data-back]');
  var say    = form.querySelector('[data-say]');
  var status = form.querySelector('.status');
  var submit = form.querySelector('button[type=submit]');
  var sLabel = submit ? submit.innerHTML : '';
  var consent = form.querySelector('[name=consent]');
  var at = 0, started = false;

  function tmpl(s, vars){
    return String(s||'').replace(/\{(\w+)\}/g, function(_,k){ return vars[k]==null?'':vars[k]; });
  }
  function say_(msg){ if (say) say.textContent = msg; }
  function setStatus(kind, msg){
    if (!status) return;
    status.className = 'status' + (kind?' '+kind:'');
    status.textContent = msg || '';
  }
  function fieldErr(step, msg){
    var e = step.querySelector('.err');
    var i = step.querySelector('input[type=text],input[type=tel]');
    if (i) { if (msg) i.setAttribute('aria-invalid','true'); else i.removeAttribute('aria-invalid'); }
    if (e) { e.textContent = msg||''; e.classList.toggle('on', !!msg); }
    return !msg;
  }
  function valid(step){
    var radios = step.querySelectorAll('input[type=radio]');
    if (radios.length) {
      return fieldErr(step, [].some.call(radios,function(r){return r.checked;}) ? '' : T.errPick);
    }
    var ok = true;
    var name = step.querySelector('input[name=name]');
    var tel  = step.querySelector('input[name=phone]');
    if (name && name.value.trim().length < 2) { fieldErr(step, T.errName); ok = false; }
    else if (tel && !validPhone(tel.value))   { fieldErr(step, T.errPhone); ok = false; }
    else fieldErr(step, '');
    // TCPA consent is required: the form will not submit without it.
    if (ok && consent && step.contains(consent) && !consent.checked) {
      consent.closest('.consent').classList.add('bad');
      setStatus('bad', T.errConsent);
      ok = false;
    } else if (consent) {
      var w = consent.closest('.consent'); if (w) w.classList.remove('bad');
    }
    return ok;
  }
  function show(i, moving){
    at = i;
    steps.forEach(function(s,n){ s.hidden = n !== i; });
    if (bar) bar.style.width = ((i+1)/steps.length)*100 + '%';
    if (lbl) lbl.textContent = tmpl(T.stepOf, {n:i+1, total:steps.length});
    if (back) back.hidden = i === 0;
    var label = steps[i].getAttribute('data-label')||'';
    say_(tmpl(T.stepSay, {n:i+1, total:steps.length, label:label}));
    if (moving) {
      var f = steps[i].querySelector('input:not([type=radio]):not([type=checkbox])') || steps[i].querySelector('input');
      if (f) { try { f.focus({preventScroll:true}); } catch(e){ f.focus(); } }
    }
  }
  function go(i){
    if (i > at && !valid(steps[at])) return;
    if (i < 0 || i >= steps.length) return;
    setStatus('','');
    push('lead_form_step', {step:i+1, step_label:steps[i].getAttribute('data-label')||''});
    show(i, true);
  }

  if (prog) prog.hidden = false;
  show(0, false);

  form.addEventListener('input', function(){
    if (started) return; started = true;
    push('lead_form_start', {});
  });

  var tel = form.querySelector('input[name=phone]');
  if (tel) tel.addEventListener('input', function(){ tel.value = fmt(tel.value); });

  // A tapped answer is an answer — advance without hunting for a button.
  form.addEventListener('change', function(e){
    if (e.target.type !== 'radio') return;
    var s = e.target.closest('[data-step]');
    if (!s || steps.indexOf(s) !== at) return;
    valid(s);
    setTimeout(function(){ go(at+1); }, 180);
  });
  form.addEventListener('click', function(e){
    if (e.target.closest('[data-next]')) { e.preventDefault(); go(at+1); }
    else if (e.target.closest('[data-back]')) { e.preventDefault(); go(at-1); }
  });
  form.addEventListener('keydown', function(e){
    if (e.key !== 'Enter') return;
    if (e.target.tagName !== 'INPUT' || e.target.type === 'radio' || e.target.type === 'checkbox') return;
    if (at < steps.length-1) { e.preventDefault(); go(at+1); }
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Bots fill hidden fields. Drop it without telling them why.
    var hp = form.querySelector('[name=_gotcha]');
    if (hp && hp.value.trim()) return;

    for (var i=0;i<steps.length;i++){
      if (!valid(steps[i])) { show(i,true); if (!status.textContent) setStatus('bad', T.errFix); return; }
    }

    var data = {};
    new FormData(form).forEach(function(v,k){ data[k]=v; });
    Object.assign(data, attr, {
      case_type: C.caseType||'', geo: C.geo||'', city: C.city||'',
      language: C.lang||'en', page: location.pathname,
      variant: C.variant||'', kw: C.kw||'',
      submitted_at: new Date().toISOString()
    });
    // The subject tag is the client's mail filter AND the bot diagnostic:
    // a lead without it did not come from this page.
    data._subject = C.subjectTag + ': ' + (data.name||'?') + ' - ' + (data.case_type||'?') +
                    ' - ' + (data.phone||'?') + ' - ' + (C.city||'?') +
                    (data.language==='es' ? ' [ESPANOL]' : '');

    if (submit) { submit.disabled = true; submit.setAttribute('aria-busy','true'); submit.textContent = T.sending; }
    setStatus('busy', T.sendingMsg);

    function fail(reason){
      // Response-aware: never pretend a lead landed. Log why, tell the
      // visitor to call, and record it so silent failures are visible.
      console.error('[LP] lead not delivered:', reason, data);
      push('lead_form_error', {reason: String(reason).slice(0,120)});
      if (submit) { submit.disabled = false; submit.removeAttribute('aria-busy'); submit.innerHTML = sLabel; }
      setStatus('bad', tmpl(T.errSend, {phone: C.phoneDisplay}));
    }

    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function(){ ctrl.abort(); }, 12000) : null;

    fetch(C.formEndpoint, {
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify(data),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function(res){
      if (timer) clearTimeout(timer);
      if (!res.ok) {
        return res.text().then(function(t){ throw new Error('HTTP '+res.status+' '+t.slice(0,200)); });
      }
      // Redirect ONLY on a confirmed 2xx. lead_form_submit fires on the
      // thank-you page, so a conversion always means a delivered lead.
      var p = new URLSearchParams({geo:C.geo||'', ct:C.caseType||'', lang:C.lang||'en'});
      if (C.variant) p.set('variant','kw');
      location.href = '/thank-you.html?' + p.toString();
    }).catch(function(err){
      if (timer) clearTimeout(timer);
      fail(err && err.name === 'AbortError' ? 'timeout after 12s' : (err && err.message) || err);
    });
  });
}

/* ---- boot -------------------------------------------------------------- */
function ready(fn){
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}
ready(function(){
  if (qs.get('lang') === 'es') applyEs();
  applyKw();

  // Language toggle keeps every other query param, so a Spanish click never
  // loses its gclid.
  var tog = document.querySelector('[data-lang-toggle]');
  if (tog) {
    var p = new URLSearchParams(location.search);
    if (C.lang === 'es') p.delete('lang'); else p.set('lang','es');
    var s = p.toString();
    tog.setAttribute('href', location.pathname + (s ? '?'+s : ''));
  }

  [].forEach.call(document.querySelectorAll('form[data-lead]'), initForm);
  push('lp_view', {variant: C.variant||''});
});
})();

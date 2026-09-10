/**
 * Shared render helpers. Every string that reaches the page passes through
 * esc() unless it is explicitly authored HTML, so a stray apostrophe in a
 * city list can never break the markup.
 */

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escapes for use inside a JSON string embedded in a <script> block. */
function jsonScript(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

const ICONS = {
  phone:
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.3 2.1z"/></svg>',
  chat:
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7V9zm0 4h7v2H7v-2z"/></svg>',
};

/**
 * Favicon, inline as a data URI.
 *
 * A landing page with no favicon shows the browser's blank default, which
 * reads as unfinished in a tab strip. Inlining it avoids a request on the
 * critical path and means there is no file to lose in a deploy. It picks up
 * the brand accent from config, so it changes with the palette.
 */
function favicon(site) {
  const c = (site.site && site.site.colors) || {};
  const bg = c.ink || '#0B1524';
  const fg = c.accent || '#F26B21';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<rect width="64" height="64" rx="12" fill="${bg}"/>` +
    `<text x="32" y="45" font-family="Helvetica,Arial,sans-serif" font-size="38" ` +
    `font-weight="bold" fill="${fg}" text-anchor="middle">A</text></svg>`;
  return `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(svg)}">`;
}

/**
 * Brand palette, emitted into the head as custom-property overrides.
 *
 * The stylesheet ships with working defaults; this block overrides them from
 * site.config, so matching williamandrewslaw.com exactly is a change in one
 * config object rather than a hunt through the CSS.
 */
function brandTokens(site) {
  const c = (site.site && site.site.colors) || {};
  const rows = [
    c.ink && `--ink:${c.ink}`,
    c.ink && `--ink-2:${c.ink}`,
    c.inkMid && `--ink-3:${c.inkMid}`,
    c.accent && `--accent:${c.accent}`,
    c.accentDark && `--accent-press:${c.accentDark}`,
  ].filter(Boolean);
  return rows.length ? `<style>:root{${rows.join(';')}}</style>` : '';
}

/** Sticky bottom Call/Text bar. Present on every paid page, always visible. */
function stickyBar(site, page) {
  const t = page.t;
  return `
    <div class="stickybar" role="region" aria-label="${esc(t.callNow)}">
      <div class="stickybar__row">
        <a class="sb-call" href="tel:${esc(site.phones.tracking.e164)}" data-loc="sticky_bar">
          ${ICONS.phone}<span>${esc(t.callNow)}</span>
        </a>
        <a class="sb-text" href="sms:${esc(site.phones.sms.e164)}" data-loc="sticky_bar">
          ${ICONS.chat}<span>${esc(t.textPerson(site.firm.attorneyFirstName))}</span>
        </a>
      </div>
      <p class="stickybar__note">${esc(t.stickyNote(page.intake.hours))}</p>
    </div>`;
}

/**
 * The intake form. Four fields, phone required, email optional and last.
 * `variant` distinguishes the hero instance from the repeat at the foot of
 * the page so the two can be told apart in reporting.
 */
function form(site, page, variant) {
  const id = `lead-${variant}`;
  const t = page.t;
  const options = page.incidentOptions
    .map((o) => `<option value="${esc(o)}">${esc(o)}</option>`)
    .join('\n            ');

  return `
    <form id="${esc(id)}" class="form-card${variant === 'repeat' ? ' form-card--inline' : ''}"
          data-lp-form novalidate>
      <h2 class="form-card__head">${esc(page.formHeading)}</h2>
      <p class="form-card__sub">${esc(page.formSub)}</p>

      <div class="field" data-field="name">
        <label for="${esc(id)}-name">${esc(t.fieldName)}</label>
        <input id="${esc(id)}-name" name="name" type="text" autocomplete="name"
               enterkeyhint="next" required>
        <p class="field__err" aria-live="polite"></p>
      </div>

      <div class="field" data-field="phone">
        <label for="${esc(id)}-phone">${esc(t.fieldPhone)}</label>
        <input id="${esc(id)}-phone" name="phone" type="tel" inputmode="tel"
               autocomplete="tel-national" placeholder="(435) 555-0134"
               enterkeyhint="next" required>
        <p class="field__err" aria-live="polite"></p>
      </div>

      <div class="field" data-field="incident">
        <label for="${esc(id)}-incident">${esc(t.fieldIncident)}</label>
        <select id="${esc(id)}-incident" name="incident" required>
          <option value="">${esc(t.choose)}</option>
            ${options}
        </select>
        <p class="field__err" aria-live="polite"></p>
      </div>

      <div class="field">
        <label for="${esc(id)}-detail">
          ${esc(t.fieldDetail)} <span class="opt">${esc(t.fieldOptional)}</span>
        </label>
        <input id="${esc(id)}-detail" name="detail" type="text"
               placeholder="${esc(page.detailPlaceholder)}" enterkeyhint="send">
      </div>

      <div class="hp" aria-hidden="true">
        <label for="${esc(id)}-gotcha">${esc(t.honeypot)}</label>
        <input id="${esc(id)}-gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
      </div>

      <button type="submit" class="btn btn--submit">
        ${esc(t.submit)}
        <span class="btn__sub">${esc(t.submitSub)}</span>
      </button>

      <p class="form-status" role="status" aria-live="polite"></p>

      <ul class="reassure">
        ${t.reassure(page.intake.callbackSla)
          .map((line) => `<li><span class="tick">&#10003;</span><span>${esc(line)}</span></li>`)
          .join('\n        ')}
      </ul>

      <p class="consent">${esc(t.consent)}</p>
    </form>`;
}

/** Primary call + text pair, used in the hero and in the closing block. */
function ctaStack(site, page, loc, opts) {
  const o = opts || {};
  const t = page.t;
  return `
    <div class="cta-stack">
      <a class="btn btn--call" href="tel:${esc(site.phones.tracking.e164)}" data-loc="${esc(loc)}">
        ${ICONS.phone}<span>${esc(t.callNumber(site.phones.tracking.display))}</span>
      </a>
      <a class="btn btn--text" href="sms:${esc(site.phones.sms.e164)}" data-loc="${esc(loc)}">
        ${ICONS.chat}<span>${esc(t.textInstead)}</span>
      </a>
    </div>
    ${o.note === false ? '' : `<p class="cta-note">${esc(page.intake.callbackSla)}</p>`}`;
}

module.exports = { esc, jsonScript, ICONS, favicon, brandTokens, stickyBar, form, ctaStack };

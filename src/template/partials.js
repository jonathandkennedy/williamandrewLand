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

/** Sticky bottom Call/Text bar. Present on every paid page, always visible. */
function stickyBar(site) {
  return `
    <div class="stickybar" role="region" aria-label="Contact ${esc(site.firm.attorneyFirstName)} now">
      <div class="stickybar__row">
        <a class="sb-call" href="tel:${esc(site.phones.tracking.e164)}" data-loc="sticky_bar">
          ${ICONS.phone}<span>Call Now</span>
        </a>
        <a class="sb-text" href="sms:${esc(site.phones.sms.e164)}" data-loc="sticky_bar">
          ${ICONS.chat}<span>Text ${esc(site.firm.attorneyFirstName)}</span>
        </a>
      </div>
      <p class="stickybar__note">Free. No fee unless we win. ${esc(site.intake.hours)}.</p>
    </div>`;
}

/**
 * The intake form. Four fields, phone required, email optional and last.
 * `variant` distinguishes the hero instance from the repeat at the foot of
 * the page so the two can be told apart in reporting.
 */
function form(site, page, variant) {
  const id = `lead-${variant}`;
  const options = page.incidentOptions
    .map((o) => `<option value="${esc(o)}">${esc(o)}</option>`)
    .join('\n            ');

  return `
    <form id="${esc(id)}" class="form-card${variant === 'repeat' ? ' form-card--inline' : ''}"
          data-lp-form novalidate>
      <h2 class="form-card__head">${esc(page.formHeading)}</h2>
      <p class="form-card__sub">${esc(page.formSub)}</p>

      <div class="field" data-field="name">
        <label for="${esc(id)}-name">Your name</label>
        <input id="${esc(id)}-name" name="name" type="text" autocomplete="name"
               enterkeyhint="next" required>
        <p class="field__err" aria-live="polite"></p>
      </div>

      <div class="field" data-field="phone">
        <label for="${esc(id)}-phone">Mobile number</label>
        <input id="${esc(id)}-phone" name="phone" type="tel" inputmode="tel"
               autocomplete="tel-national" placeholder="(435) 555-0134"
               enterkeyhint="next" required>
        <p class="field__err" aria-live="polite"></p>
      </div>

      <div class="field" data-field="incident">
        <label for="${esc(id)}-incident">What happened?</label>
        <select id="${esc(id)}-incident" name="incident" required>
          <option value="">Choose one&hellip;</option>
            ${options}
        </select>
        <p class="field__err" aria-live="polite"></p>
      </div>

      <div class="field">
        <label for="${esc(id)}-detail">
          City and date of the crash <span class="opt">(optional)</span>
        </label>
        <input id="${esc(id)}-detail" name="detail" type="text"
               placeholder="${esc(page.detailPlaceholder)}" enterkeyhint="send">
      </div>

      <div class="hp" aria-hidden="true">
        <label for="${esc(id)}-company">Company</label>
        <input id="${esc(id)}-company" name="company" type="text" tabindex="-1" autocomplete="off">
      </div>

      <button type="submit" class="btn btn--submit">
        Get a free case review
        <span class="btn__sub">We&rsquo;ll call you back</span>
      </button>

      <p class="form-status" role="status" aria-live="polite"></p>

      <ul class="reassure">
        <li><span class="tick">&#10003;</span><span>No fee unless we win. No upfront cost.</span></li>
        <li><span class="tick">&#10003;</span><span>Confidential. ${esc(site.intake.callbackSla)}</span></li>
        <li><span class="tick">&#10003;</span><span>Sending this does not hire us or create an attorney-client relationship.</span></li>
      </ul>
    </form>`;
}

/** Primary call + text pair, used in the hero and in the closing block. */
function ctaStack(site, loc, opts) {
  const o = opts || {};
  return `
    <div class="cta-stack">
      <a class="btn btn--call" href="tel:${esc(site.phones.tracking.e164)}" data-loc="${esc(loc)}">
        ${ICONS.phone}<span>Call ${esc(site.phones.tracking.display)}</span>
      </a>
      <a class="btn btn--text" href="sms:${esc(site.phones.sms.e164)}" data-loc="${esc(loc)}">
        ${ICONS.chat}<span>Text us instead</span>
      </a>
    </div>
    ${o.note === false ? '' : `<p class="cta-note">${esc(site.intake.callbackSla)}</p>`}`;
}

module.exports = { esc, jsonScript, ICONS, stickyBar, form, ctaStack };

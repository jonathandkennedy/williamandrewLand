const { esc, favicon, brandTokens } = require('./partials');

/**
 * Internal hub at /.
 *
 * This is the page a PPC admin opens to pick the final URL for an ad group.
 * It is a tool, not a landing page: density beats whitespace, and the two
 * things it has to do well are (a) hand over the right URL without a mistake
 * and (b) show, honestly, what is still unfinished.
 *
 * It is noindex and unlinked from any landing page, but it IS reachable by
 * anyone who has the URL, so nothing goes on it that is not already visible
 * in the landing pages' own source. Tag IDs and the form endpoint qualify;
 * anything genuinely private does not belong here.
 */

const PRACTICE_LABEL = {
  truck: 'Truck',
  car: 'Car',
  'wrongful-death': 'Wrongful death',
};

function statusRow(label, value, ok, note) {
  return `
    <tr>
      <th scope="row">${esc(label)}</th>
      <td><code>${esc(value || '—')}</code></td>
      <td><span class="pill ${ok ? 'pill--ok' : 'pill--no'}">${ok ? 'set' : 'missing'}</span>
        ${note ? `<span class="muted"> ${esc(note)}</span>` : ''}</td>
    </tr>`;
}

function render(site, pages, audit) {
  const origin = site.site.origin;

  // Group English pages, attaching each one's Spanish twin, so a row is an
  // ad group rather than a URL.
  const byLang = { en: [], es: [] };
  pages.forEach((p) => byLang[p.lang].push(p));
  const esBySlug = {};
  byLang.es.forEach((p) => { esBySlug[p.altSlug] = p; });

  const groups = {};
  byLang.en.forEach((p) => {
    (groups[p.geoLabel] = groups[p.geoLabel] || []).push(p);
  });

  const sections = Object.keys(groups).map((geo) => {
    const rows = groups[geo].map((p) => {
      const es = esBySlug[p.slug];
      const enUrl = `${origin}/${p.slug}/`;
      const esUrl = es ? `${origin}/${es.slug}/` : '';
      return `
        <tr>
          <td class="c-practice">
            <strong>${esc(PRACTICE_LABEL[p.practiceKey] || p.practiceKey)}</strong>
            <span class="muted">${esc(p.adGroup)}</span>
          </td>
          <td>
            <div class="urlrow">
              <a href="/${esc(p.slug)}/" target="_blank" rel="noopener">/${esc(p.slug)}/</a>
              <button type="button" class="copy" data-url="${esc(enUrl)}">Copy</button>
            </div>
            <p class="h1line">${esc(p.h1)}${esc(p.h1Line2)}</p>
          </td>
          <td>
            ${es ? `
            <div class="urlrow">
              <a href="/${esc(es.slug)}/" target="_blank" rel="noopener">/${esc(es.slug)}/</a>
              <button type="button" class="copy" data-url="${esc(esUrl)}">Copy</button>
            </div>
            <p class="h1line">${esc(es.h1)}${esc(es.h1Line2)}</p>` : '<span class="muted">—</span>'}
          </td>
        </tr>`;
    }).join('');

    return `
      <section class="geo">
        <h2>${esc(geo)}</h2>
        <div class="tablewrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Ad group</th>
                <th scope="col">English final URL</th>
                <th scope="col">Spanish final URL</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>`;
  }).join('');

  const t = site.tracking;
  const labelsSet = Object.keys(t.conversionLabels).filter((k) => t.conversionLabels[k]);
  const status = [
    statusRow('Google Tag Manager', t.gtmId, !!t.gtmId),
    statusRow('Google Ads', t.googleAdsId, !!t.googleAdsId),
    statusRow('GA4', t.ga4Id, !!t.ga4Id, 'check GTM does not also fire this'),
    statusRow('Ads conversion labels', `${labelsSet.length} of 3 set`, labelsSet.length === 3),
    statusRow('CallRail swap', t.callRailSwapScript ? 'installed' : '', !!t.callRailSwapScript),
    statusRow('Tracking number', site.phones.tracking.display, true),
    statusRow('SMS number', site.phones.sms.display, true, 'must be SMS-enabled and monitored'),
    statusRow('Form endpoint', site.formEndpoint, !!site.formEndpoint),
    statusRow('Google reviews link', site.reviews.profileUrl, !!site.reviews.profileUrl),
    statusRow('Attorney headshot', site.bio.photo, !!site.bio.photo),
  ].join('');

  const blockers = audit.blockers.length
    ? `<ul>${audit.blockers.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`
    : '<p class="allclear">No blockers. Safe to spend.</p>';

  const warnings = audit.warnings.length
    ? `<ul>${audit.warnings.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>`
    : '<p class="allclear">None.</p>';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PPC Landing Page Hub — ${esc(site.firm.shortName)}</title>
<meta name="robots" content="noindex, nofollow">
${favicon(site)}
${brandTokens(site)}
<style>
  :root {
    --ink: #000; --accent: #E02B1D; --line: #dfe4ea;
    --paper: #fff; --paper-2: #f6f8fa; --text: #16202e; --muted: #5b6878;
    --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: var(--font); font-size: 15px; color: var(--text); background: var(--paper-2); }
  .wrap { max-width: 1180px; margin-inline: auto; padding-inline: 20px; }

  header.top { background: var(--ink); color: #fff; padding-block: 20px; }
  header.top h1 { margin: 0 0 4px; font-size: 21px; letter-spacing: -.01em; }
  header.top h1::after { content: ''; display: block; width: 62px; height: 4px; margin-top: 9px; background: var(--accent); border-radius: 2px; }
  header.top p { margin: 10px 0 0; color: #b6c0cc; font-size: 13.5px; max-width: 70ch; line-height: 1.5; }

  main { padding-block: 24px 60px; }
  h2 { margin: 0 0 10px; font-size: 17px; letter-spacing: -.01em; }

  .panel { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px; margin-bottom: 20px; }
  .panel h2 { margin-bottom: 8px; }

  .cols { display: grid; gap: 20px; }
  @media (min-width: 900px) { .cols { grid-template-columns: 1fr 1fr; } }

  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { text-align: left; padding: 9px 10px; border-bottom: 1px solid var(--line); vertical-align: top; }
  thead th { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: var(--muted); border-bottom-width: 2px; }
  tbody tr:last-child td { border-bottom: 0; }
  .tablewrap { overflow-x: auto; }

  .geo { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px; margin-bottom: 18px; }
  .c-practice strong { display: block; }
  .c-practice .muted { font-size: 12.5px; }
  .muted { color: var(--muted); }

  .urlrow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .urlrow a { color: #1a5fb4; font-weight: 600; text-decoration: none; word-break: break-all; }
  .urlrow a:hover { text-decoration: underline; }
  .h1line { margin: 5px 0 0; font-size: 12.5px; color: var(--muted); line-height: 1.35; }

  button.copy {
    flex: none; font: inherit; font-size: 12px; font-weight: 700;
    padding: 5px 10px; min-height: 30px; cursor: pointer;
    background: var(--paper-2); color: var(--text);
    border: 1px solid var(--line); border-radius: 6px;
  }
  button.copy:hover { border-color: #aab4c0; }
  button.copy.done { background: #e8f5ee; border-color: #9fd3b8; color: #1f7a4d; }

  code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; word-break: break-all; }
  .pill { display: inline-block; font-size: 11.5px; font-weight: 700; padding: 2px 8px; border-radius: 999px; }
  .pill--ok { background: #e8f5ee; color: #1f7a4d; }
  .pill--no { background: #fdecea; color: #a5281b; }

  .blockers { border-left: 4px solid var(--accent); }
  .blockers ul, .warnings ul { margin: 0; padding-left: 20px; }
  .blockers li, .warnings li { margin-bottom: 7px; line-height: 1.45; font-size: 13.5px; }
  .allclear { margin: 0; color: #1f7a4d; font-weight: 600; font-size: 13.5px; }

  footer.foot { color: var(--muted); font-size: 12.5px; line-height: 1.55; padding-bottom: 40px; }
</style>
</head>
<body>

<header class="top">
  <div class="wrap">
    <h1>PPC Landing Page Hub</h1>
    <p>
      ${esc(site.firm.legalName)} &middot; ${esc(pages.length)} landing pages.
      Pick the row that matches your ad group and copy its final URL. Every page here is
      <code style="color:#d7dfe8">noindex</code> and carries the CallRail number
      ${esc(site.phones.tracking.display)}. This hub is not linked from any landing page,
      but anyone with the URL can open it &mdash; keep anything private off it.
    </p>
  </div>
</header>

<main class="wrap">

  <div class="cols">
    <div class="panel blockers">
      <h2>Launch blockers</h2>
      ${blockers}
    </div>
    <div class="panel warnings">
      <h2>Warnings</h2>
      ${warnings}
    </div>
  </div>

  <div class="panel">
    <h2>Tracking &amp; intake</h2>
    <div class="tablewrap">
      <table>
        <thead><tr><th scope="col">What</th><th scope="col">Value</th><th scope="col">Status</th></tr></thead>
        <tbody>${status}</tbody>
      </table>
    </div>
  </div>

  ${sections}

  <div class="panel">
    <h2>Rules that make these work</h2>
    <ul style="margin:0;padding-left:20px;line-height:1.55;font-size:13.5px">
      <li><strong>One URL per ad group.</strong> Sending a "Cache County truck" click to a
          general injury page pays a premium for a worse conversion rate.</li>
      <li><strong>Keep the trailing slash</strong> on every final URL.</li>
      <li><strong>Run Spanish as separate campaigns</strong>, not extra keywords in the English
          ones &mdash; own ad copy, own bids, <code>/es/</code> final URL, Spanish language
          targeting.</li>
      <li><strong>Auto-tagging on</strong>, so <code>gclid</code> reaches the lead record. Every
          lead also carries a <code>language</code> field for splitting Spanish reporting.</li>
      <li><strong>Call extensions use ${esc(site.phones.tracking.display)}</strong>, not the main
          office line.</li>
      <li><strong>Do not link these from the main site.</strong> They must stay out of the index
          so they never compete with organic pages for the same terms.</li>
    </ul>
  </div>

  <footer class="foot">
    Built from config &mdash; edit <code>src/config/pages/index.js</code> to add a page, then
    <code>npm run build</code>. Full detail in <code>README.md</code> and
    <code>LAUNCH-CHECKLIST.md</code>.
  </footer>
</main>

<script>
  // Copy the absolute final URL, not the relative href, so what lands in the
  // Ads final-URL box is the thing that will actually be requested.
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button.copy');
    if (!b) return;
    var url = b.getAttribute('data-url');
    var done = function () {
      var prev = b.textContent;
      b.textContent = 'Copied';
      b.classList.add('done');
      setTimeout(function () { b.textContent = prev; b.classList.remove('done'); }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { window.prompt('Copy this URL:', url); }
      document.body.removeChild(ta);
    }
  });
</script>
</body>
</html>
`;
}

module.exports = { render };

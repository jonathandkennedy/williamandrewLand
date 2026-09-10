/* Regenerates index.html — the internal review hub.
   Carries NO analytics on purpose: never send ad traffic here, and it must
   not pollute the client's numbers when the team clicks around it. */
import fs from 'node:fs';

const C = JSON.parse(fs.readFileSync('parts/config.json', 'utf8'));
const EN = JSON.parse(fs.readFileSync('parts/practices.json', 'utf8'));
const GEO = JSON.parse(fs.readFileSync('parts/markets.json', 'utf8'));
const esc = (s) => String(s ?? '').replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const practices = Object.keys(EN);
const markets = Object.keys(GEO).filter((k) => !k.startsWith('_') && k !== 'default');
const metros = {};
markets.forEach((k) => { (metros[GEO[k].metro] ||= []).push(k); });

const missing = [];
practices.forEach((p) => markets.forEach((m) => {
  if (!fs.existsSync(`${p}-${m}.html`)) missing.push(`${p}-${m}.html`);
}));

const gaps = [];
if (!C.CLARITY_ID) gaps.push('Clarity ID not set — no session recordings. Add CLARITY_ID and re-run build-masters. When you create the project: Settings → Setup → Advanced → Cookies OFF, or Clarity’s consent banner sits over the mobile call CTA.');
if (!C.REVIEW_URL) gaps.push('Google reviews deep link not set — the 4.7 shows without a clickable source.');
const SHOT = ['will-andrews.jpg','will-andrews.jpeg','will-andrews.png','will-andrews.webp','headshot.jpg','headshot.png'].find((f) => fs.existsSync(f));
if (!SHOT) gaps.push('Headshot missing — drop will-andrews.jpg (or .png/.webp) in the repo root and re-run build-masters.mjs, then re-bake. The "who you are calling" block renders without a face until then.');
if (missing.length) gaps.push(`${missing.length} baked page(s) missing — re-run generate-geo.mjs. A live ad group pointing at a missing page burns spend on a 404.`);
const noPhonePool = markets.filter((k) => GEO[k].areaNote && !GEO[k].phone);
if (noPhonePool.length) gaps.push(`These markets are outside the 801 area code and have no local tracking number yet: ${noPhonePool.map((k) => GEO[k].city).join(', ')}. An out-of-area number on a local lander drags Quality Score.`);

const rows = Object.keys(metros).map((metro) => `
  <section class="m">
    <h2>${esc(metro)}</h2>
    <div class="tw"><table>
      <thead><tr><th>City</th>${practices.map((p) => `<th>${esc(p.replace(/-/g, ' '))}</th>`).join('')}</tr></thead>
      <tbody>${metros[metro].map((k) => `
        <tr><th scope="row">${esc(GEO[k].city)}${GEO[k].office ? ' <em>office</em>' : ''}</th>
        ${practices.map((p) => {
          const f = `${p}-${k}.html`;
          const url = `https://${C.PROD_DOMAIN}/${f}`;
          return fs.existsSync(f)
            ? `<td><a href="${f}" target="_blank" rel="noopener">open</a>
                 <button class="c" data-u="${esc(url)}">copy</button>
                 <button class="c" data-u="${esc(url)}?lang=es">es</button></td>`
            : `<td class="x">missing</td>`;
        }).join('')}
        </tr>`).join('')}
      </tbody>
    </table></div>
  </section>`).join('');

fs.writeFileSync('index.html', `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>PPC Lander Hub — ${esc(C.FIRM_NAME)}</title>
<meta name="robots" content="noindex,nofollow">
<style>
:root{--ink:#000;--red:#e02b1d;--line:#dfe4ea;--muted:#5b6878;
--f:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif}
*{box-sizing:border-box}body{margin:0;font-family:var(--f);font-size:15px;color:#16202e;background:#f6f8fa}
.wrap{max-width:1240px;margin-inline:auto;padding-inline:20px}
header.t{background:var(--ink);color:#fff;padding-block:20px}
header.t h1{margin:0;font-size:21px}
header.t h1::after{content:'';display:block;width:62px;height:4px;margin-top:9px;background:var(--red);border-radius:2px}
header.t p{margin:10px 0 0;color:#b6c0cc;font-size:13.5px;max-width:74ch;line-height:1.5}
main{padding-block:24px 60px}
h2{margin:0 0 10px;font-size:17px}
.p,.m{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:18px}
table{width:100%;border-collapse:collapse;font-size:14px}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}
thead th{font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}
tbody tr:last-child td,tbody tr:last-child th{border-bottom:0}
tbody th{font-weight:700;white-space:nowrap}
tbody th em{font-style:normal;font-size:11px;color:var(--red);font-weight:700}
.tw{overflow-x:auto}
td a{color:#1a5fb4;font-weight:600;text-decoration:none;margin-right:6px}
td a:hover{text-decoration:underline}
td.x{color:#a5281b;font-weight:700}
button.c{font:inherit;font-size:11.5px;font-weight:700;padding:3px 7px;min-height:28px;cursor:pointer;
background:#f6f8fa;border:1px solid var(--line);border-radius:5px;margin-right:4px}
button.c:hover{border-color:#aab4c0}button.c.ok{background:#e8f5ee;border-color:#9fd3b8;color:#1f7a4d}
.gaps{border-left:4px solid var(--red)}
.gaps ul{margin:0;padding-left:20px}.gaps li{margin-bottom:7px;line-height:1.45;font-size:13.5px}
.ok{color:#1f7a4d;font-weight:600;margin:0;font-size:13.5px}
dl{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;margin:0;font-size:13.5px}
dt{font-weight:700}dd{margin:0;font-family:ui-monospace,Menlo,monospace;font-size:12.5px;word-break:break-all}
ul.rules{margin:0;padding-left:20px;font-size:13.5px;line-height:1.55}
</style></head>
<body>
<header class="t"><div class="wrap">
<h1>PPC Lander Hub</h1>
<p>${esc(C.FIRM_NAME)} &middot; ${practices.length} case types &times; ${markets.length} markets =
${practices.length * markets.length} landers. Pick the row for your ad group and copy its final URL.
<b>es</b> copies the Spanish deep link. Every lander is noindex and carries the CallRail number
${esc(C.INTAKE_DISPLAY)}. This hub has no analytics on it &mdash; never point ad traffic here.</p>
</div></header>

<main class="wrap">
  <div class="p gaps">
    <h2>Before you spend</h2>
    ${gaps.length ? `<ul>${gaps.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>` : '<p class="ok">Nothing outstanding.</p>'}
  </div>

  <div class="p">
    <h2>Wiring</h2>
    <dl>
      <dt>Domain</dt><dd>${esc(C.PROD_DOMAIN)}</dd>
      <dt>GTM</dt><dd>${esc(C.GTM_ID)}</dd>
      <dt>Google Ads</dt><dd>${esc(C.ADS_ID)}</dd>
      <dt>GA4</dt><dd>${esc(C.GA4_ID)}</dd>
      <dt>Clarity</dt><dd>${esc(C.CLARITY_ID || '— not set —')}</dd>
      <dt>CallRail</dt><dd>${esc(C.CALLRAIL_SWAP || '— not set —')}</dd>
      <dt>Tracking no.</dt><dd>${esc(C.INTAKE_DISPLAY)}</dd>
      <dt>Form</dt><dd>${esc(C.FORM_ENDPOINT)}</dd>
      <dt>Subject tag</dt><dd>${esc(C.EMAIL_SUBJECT_TAG)}</dd>
      <dt>Intake inbox</dt><dd>${esc(C.INTAKE_EMAIL)}</dd>
    </dl>
  </div>
  ${rows}
  <div class="p">
    <h2>Rules that make these work</h2>
    <ul class="rules">
      <li><b>One URL per ad group.</b> Every ad group's final URL is its city lander, never the main site.</li>
      <li><b>Spanish runs as its own campaign</b> with the <code>?lang=es</code> final URL and Spanish language targeting — not as extra keywords in the English ones.</li>
      <li><b>Consolidate campaigns to metro cores.</b> One campaign per city fragments learning; the landers stay per-city, the campaigns do not.</li>
      <li><b>Max-Clicks needs a CPC cap.</b> Without one, single clicks can run into the hundreds.</li>
      <li><b>Every displayed number must be in the CallRail swap pool</b> — miss one and that page silently stops swapping.</li>
      <li><b>Keep exactly one swap system.</b> Never run Google's website-call-tracking snippet alongside CallRail.</li>
      <li><b>Conversions fire once.</b> Use the <code>lead_form_submit</code> event OR a thank-you page trigger, not both.</li>
    </ul>
  </div>
</main>
<script>
document.addEventListener('click',function(e){
  var b=e.target.closest('button.c'); if(!b) return;
  var u=b.getAttribute('data-u');
  function done(){var t=b.textContent;b.textContent='copied';b.classList.add('ok');
    setTimeout(function(){b.textContent=t;b.classList.remove('ok')},1300);}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(done,fb);}else fb();
  function fb(){var a=document.createElement('textarea');a.value=u;a.style.position='fixed';a.style.opacity=0;
    document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(x){prompt('Copy:',u)}
    document.body.removeChild(a);}
});
</script>
</body></html>
`);
console.log(`  index.html: ${practices.length} x ${markets.length} = ${practices.length * markets.length} landers, ${gaps.length} gap(s)`);

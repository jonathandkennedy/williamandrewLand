/* Bakes per-city landers from a master.
     node generate-geo.mjs truck-accident.html --all
     node generate-geo.mjs truck-accident.html logan-ut provo-ut

   Baked, not client-side: the city is already in the HTML when the page
   paints, so there is no flash of the wrong city and no dependency on JS
   for the thing the ad promised. Everything per-city comes from the
   #geo-data block inside the master — that block is the only source. */
import fs from 'node:fs';

const [, , master, ...args] = process.argv;
if (!master) {
  console.error('usage: node generate-geo.mjs <master>.html [--all | <market> ...]');
  process.exit(1);
}
const src = fs.readFileSync(master, 'utf8');
const slug = master.replace(/\.html$/, '');

const grab = (id) => {
  const m = src.match(new RegExp(`<script type="application/json" id="${id}">([\\s\\S]*?)</script>`));
  if (!m) throw new Error(`${master}: missing #${id} block`);
  return JSON.parse(m[1]);
};
const GEO = grab('geo-data');
const D = GEO.default;

const markets = args.includes('--all')
  ? Object.keys(GEO).filter((k) => !k.startsWith('_') && k !== 'default')
  : args;
if (!markets.length) { console.error('no markets given'); process.exit(1); }

const esc = (s) => String(s).replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Replace the FIRST match only, and fail loudly if the anchor is gone.
   A silent no-op here means a page ships naming the wrong city. */
function sub(html, re, next, what) {
  if (!re.test(html)) throw new Error(`${master}: anchor not found for ${what}`);
  return html.replace(re, next);
}

let made = 0;
for (const key of markets) {
  const g = GEO[key];
  if (!g) { console.error(`  ! unknown market: ${key}`); continue; }

  const city = g.city;
  const phone = g.phone || null;            // metro-local CallRail number
  const disp  = g.phoneDisplay || null;
  let out = src;

  // Headline city — the span the ad's promise lands in.
  out = sub(out, /<span class="h1-city">[^<]*<\/span>/,
    `<span class="h1-city">${esc(g.h1city)}</span>`, 'h1-city');

  // Title and description carry the city for the ad preview and the tab.
  out = sub(out, /<title>[\s\S]*?<\/title>/,
    `<title>${esc(String(src.match(/<title>([\s\S]*?)<\/title>/)[1]).replace(D.city, city))}</title>`, 'title');
  out = sub(out, /<meta name="description" content="([^"]*)"/,
    (_m, d) => `<meta name="description" content="${esc(d.replace(new RegExp(D.city, 'g'), city))}"`, 'description');

  // Service line — only claim an office where one exists.
  const serve = g.office
    ? `<strong>Our office is in ${esc(city)}</strong> &mdash; 299 S Main St, Suite 1310. Walk in, or we come to you.`
    : `<strong>Serving ${esc(city)} and ${esc(g.metro)}</strong> &mdash; we come to you at the hospital or at home.`;
  out = sub(out, /<p class="serve" data-serve>[\s\S]*?<\/p>/,
    `<p class="serve" data-serve>${serve}</p>`, 'serve line');

  // Per-market tracking number, if one has been provisioned. Every number
  // baked here must also sit in the CallRail swap pool, or these pages
  // silently stop swapping and the calls lose their keyword.
  if (phone && disp) {
    out = out.replace(/tel:\+1\d{10}/g, `tel:${phone}`);
    out = out.replace(/\(\d{3}\) \d{3}-\d{4}/g, disp);
  }

  // Per-market GTM container, if one is set for this city.
  if (g.gtm) out = out.replace(/'dataLayer','GTM-[A-Z0-9]+'/, `'dataLayer','${g.gtm}'`)
                      .replace(/ns\.html\?id=GTM-[A-Z0-9]+/, `ns.html?id=${g.gtm}`);

  // Runtime config: geo + city ride along on every event and every lead.
  out = sub(out, /window\.LP=\{[\s\S]*?\};/, () => {
    const cfg = JSON.parse(src.match(/window\.LP=(\{[\s\S]*?\});/)[1]);
    cfg.geo = key; cfg.city = city;
    if (disp) cfg.phoneDisplay = disp;
    return `window.LP=${JSON.stringify(cfg).replace(/</g, '\\u003c')};`;
  }, 'window.LP');

  // Spanish needs the city too, or ?lang=es shows an English city name in a
  // Spanish headline. Injected at bake time so the master stays city-free.
  out = sub(out, /<script type="application\/json" id="i18n-es">([\s\S]*?)<\/script>/, () => {
    const es = JSON.parse(src.match(/<script type="application\/json" id="i18n-es">([\s\S]*?)<\/script>/)[1]);
    es.text = es.text.concat([{ s: '.h1-city', t: g.h1city_es || g.h1city }]);
    es.html = es.html.concat([{
      s: '[data-serve]',
      t: g.office
        ? `<strong>Nuestra oficina está en ${esc(city)}</strong> &mdash; 299 S Main St, Suite 1310. Puede llegar sin cita, o vamos a donde usted esté.`
        : `<strong>Atendemos ${esc(city)} y ${esc(g.metro)}</strong> &mdash; vamos a donde usted esté, al hospital o a su casa.`,
    }]);
    if (es.title) es.title = es.title.replace(D.city, city);
    return `<script type="application/json" id="i18n-es">${JSON.stringify(es).replace(/</g, '\\u003c')}</script>`;
  }, 'i18n-es');

  const file = `${slug}-${key}.html`;
  fs.writeFileSync(file, out);
  made++;
}
console.log(`  ${slug}: baked ${made} city page(s)`);

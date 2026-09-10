/* Keyword-adaptive test landers.
     node generate-kw-test.mjs

   Copies the named baked pages to -kw.html. The headline adapts to the ad
   keyword via ?kw={keyword}, but only from the whitelist baked into each
   master's kwMap: raw query text never reaches the DOM, and an unrecognised
   or missing kw leaves the control headline untouched. That is what makes
   pointing live traffic at these safe.

   Ad group final URL:  https://<domain>/<page>-kw.html?kw={keyword} */
import fs from 'node:fs';

// Edit this list to the markets under test.
const PAGES = [
  'truck-accident-salt-lake-city-ut',
  'truck-accident-logan-ut',
  'car-accident-salt-lake-city-ut',
  'car-accident-provo-ut',
  'motorcycle-accident-salt-lake-city-ut',
];

let n = 0;
for (const base of PAGES) {
  const src = `${base}.html`;
  if (!fs.existsSync(src)) { console.error(`  ! ${src} not baked yet — run generate-geo.mjs first`); continue; }
  let html = fs.readFileSync(src, 'utf8');

  // Tag the variant so leads and thank-you traffic can be split out in GA4.
  html = html.replace(/window\.LP=(\{[\s\S]*?\});/, (_m, j) => {
    const cfg = JSON.parse(j);
    cfg.kwTest = true;
    return `window.LP=${JSON.stringify(cfg).replace(/</g, '\\u003c')};`;
  });

  fs.writeFileSync(`${base}-kw.html`, html);
  n++;
}
console.log(`  ${n} keyword-test lander(s) written`);
console.log('  final URL pattern: /<page>-kw.html?kw={keyword}');

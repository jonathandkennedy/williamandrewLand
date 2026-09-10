/* Writes CAMPAIGN-URLS-UT.md — the final-URL reference handed to whoever
   builds the campaigns. Regenerate after adding a market or a case type. */
import fs from 'node:fs';
const C = JSON.parse(fs.readFileSync('parts/config.json', 'utf8'));
const EN = JSON.parse(fs.readFileSync('parts/practices.json', 'utf8'));
const GEO = JSON.parse(fs.readFileSync('parts/markets.json', 'utf8'));
const practices = Object.keys(EN);
const markets = Object.keys(GEO).filter((k) => !k.startsWith('_') && k !== 'default');
const metros = {};
markets.forEach((k) => { (metros[GEO[k].metro] ||= []).push(k); });
const D = `https://${C.PROD_DOMAIN}`;

let out = `# Campaign final URLs — Utah

${practices.length} case types × ${markets.length} markets = **${practices.length * markets.length} landers**.
Regenerate with \`node gen-campaign-urls.mjs\` after adding a market or case type.

- **Every ad group's final URL is its city lander.** Never the main site, never the hub at \`/\`.
- **Keep the \`.html\`.** These are static files; there is no extensionless rewrite.
- **Spanish** is the same URL with \`?lang=es\`, run as its own campaign with Spanish language targeting — not as extra keywords in the English ones.
- **Consolidate campaigns to metro cores.** The landers are per-city; the campaigns should not be, or the learning phase never finishes.
- Make the lander **before** the ad group goes live. A live ad group pointing at a page that was never baked spends real money on a 404.

`;
for (const metro of Object.keys(metros)) {
  out += `## ${metro}\n\n| City | ${practices.map((p) => p.replace(/-/g, ' ')).join(' | ')} |\n|---|${practices.map(() => '---').join('|')}|\n`;
  for (const k of metros[metro]) {
    const cells = practices.map((p) => {
      const f = `${p}-${k}.html`;
      return fs.existsSync(f) ? `\`/${f}\`` : '**MISSING**';
    });
    out += `| ${GEO[k].city}${GEO[k].office ? ' *(office)*' : ''} | ${cells.join(' | ')} |\n`;
  }
  out += '\n';
}

out += `## Keyword-insertion test landers

Final URL: \`${D}/<page>-kw.html?kw={keyword}\`

Whitelist only — an unrecognised keyword renders the control headline unchanged, so any
traffic is safe. Leads arrive tagged \`variant: "kw-test"\` with the sanitised keyword.
Evaluate on landing-page-experience Quality Score and conversion rate after 2–3 weeks.

${fs.readdirSync('.').filter((f) => f.endsWith('-kw.html')).map((f) => `- \`/${f}\``).join('\n')}

## Base URLs

| Purpose | URL |
|---|---|
| Production | \`${D}/\` |
| Review hub (**no ad traffic**) | \`${D}/index.html\` |
| Thank-you | \`${D}/thank-you.html\` |
| 404 | \`${D}/404.html\` |
`;
fs.writeFileSync('CAMPAIGN-URLS-UT.md', out);
console.log(`  CAMPAIGN-URLS-UT.md: ${practices.length * markets.length} landers`);

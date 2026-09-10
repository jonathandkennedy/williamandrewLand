/* Keyword-insertion landers.
   The whole point of the whitelist is that live traffic is safe no matter
   what lands in ?kw, so most of this suite is hostile input. */
import { serve, browser, page, ok, summary } from './lib.mjs';

const KW = '/truck-accident-logan-ut-kw.html';
const CTRL = '/truck-accident-logan-ut.html';
const srv = await serve();
const b = await browser();
const U = (p, q = '') => srv.url + p + q;

const h1 = (p) => p.$eval('h1', (e) => e.textContent.replace(/\s+/g, ' ').trim());

console.log('\nkw-e2e');

let control;
{
  const { p } = await page(b);
  await p.goto(U(CTRL), { waitUntil: 'load' });
  control = await h1(p);
  ok('control headline is the baked one', /Injured in a Logan truck crash\?/.test(control), control);
  await p.close();
}

/* --- whitelist hits --------------------------------------------------- */
for (const [kw, expect] of [
  ['truck accident lawyer', 'Injured in a Logan truck crash?'],
  ['semi truck accident lawyer', 'Injured in a Logan semi truck crash?'],
  ['18 wheeler accident lawyer', 'Injured in an Logan 18-wheeler crash?'],
  ['big rig accident lawyer', 'Injured in a Logan big rig crash?'],
  ['Truck Accident Attorney', 'Injured in a Logan truck crash?'],
]) {
  const { p } = await page(b);
  await p.goto(U(KW, '?kw=' + encodeURIComponent(kw)), { waitUntil: 'load' });
  ok(`"${kw}" adapts the headline`, (await h1(p)) === expect, await h1(p));
  await p.close();
}

/* --- anything not on the list falls back to the control --------------- */
for (const [label, kw] of [
  ['missing kw', ''],
  ['unknown keyword', 'divorce lawyer'],
  ['empty string', '   '],
  ['script tag', '<script>alert(1)</script>'],
  ['html injection', '<img src=x onerror=alert(1)>'],
  ['quote break-out', '"><b>pwned</b>'],
  ['very long string', 'a'.repeat(400)],
  ['unicode junk', '𝕥𝕣𝕦𝕔𝕜 ☠️ lawyer'],
  ['sql-ish', "' OR 1=1--"],
]) {
  const { p, state } = await page(b);
  await p.goto(U(KW, kw ? '?kw=' + encodeURIComponent(kw) : ''), { waitUntil: 'load' });
  const got = await h1(p);
  ok(`${label} falls back to control`, got === control, got.slice(0, 60));
  ok(`${label} injects nothing`, !(await p.$('h1 script, h1 img, h1 b')) && state.errors.length === 0);
  await p.close();
}

/* --- "near me" ---------------------------------------------------------- */
{
  const { p } = await page(b);
  await p.goto(U(KW, '?kw=' + encodeURIComponent('truck accident lawyer near me')), { waitUntil: 'load' });
  ok('"near me" still resolves to a whitelisted headline', /Logan/.test(await h1(p)), await h1(p));
  await p.close();
}

/* --- leads from a kw lander are tagged --------------------------------- */
{
  const { p, state } = await page(b);
  await p.goto(U(KW, '?kw=' + encodeURIComponent('semi truck accident lawyer') + '&gclid=KW1'), { waitUntil: 'load' });
  await p.click('#f-a label.pick >> nth=0'); await p.waitForTimeout(300);
  await p.click('#f-a [data-step]:not([hidden]) label.pick >> nth=0'); await p.waitForTimeout(300);
  await p.fill('#f-a-n', 'Dana'); await p.fill('#f-a-p', '8015550134');
  await p.check('#f-a input[name=consent]');
  await Promise.all([p.waitForURL(/thank-you/, { timeout: 9000 }), p.click('#f-a button[type=submit]')]);
  ok('lead is tagged kw-test', state.posted.variant === 'kw-test', state.posted.variant);
  ok('sanitized keyword rides along', state.posted.kw === 'semi truck accident lawyer', state.posted.kw);
  ok('thank-you carries variant=kw', /variant=kw/.test(p.url()), p.url());
  await p.close();
}

/* --- Spanish still works on a kw lander -------------------------------- */
{
  const { p } = await page(b);
  await p.goto(U(KW, '?lang=es&kw=' + encodeURIComponent('truck accident lawyer')), { waitUntil: 'load' });
  // Deliberate: keyword insertion is skipped on Spanish, so the visitor gets
  // the Spanish control headline rather than an English adapted one.
  ok('kw lander stays Spanish, does not adapt into English',
    /Lesionado|accidente/.test(await h1(p)) && !/Injured/.test(await h1(p)), await h1(p));
  await p.close();
}

await b.close(); srv.close();
summary('kw-e2e');

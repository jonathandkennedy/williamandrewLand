/* Form, validation, submit paths, Spanish, honeypot, compliance, 404. */
import { serve, browser, page, ok, summary } from './lib.mjs';

const LANDER = '/truck-accident-logan-ut.html';
const srv = await serve();
const b = await browser();
const U = (p, q = '') => srv.url + p + q;

async function fill(p, { name = 'Marisol', phone = '8015550134', consent = true } = {}) {
  await p.click('#f-a [data-step]:not([hidden]) label.pick >> nth=0');
  await p.waitForTimeout(300);
  await p.click('#f-a [data-step]:not([hidden]) label.pick >> nth=0');
  await p.waitForTimeout(300);
  await p.fill('#f-a-n', name);
  await p.fill('#f-a-p', phone);
  if (consent) await p.check('#f-a input[name=consent]');
}

console.log('\nform-e2e');

/* --- steps ------------------------------------------------------------ */
{
  const { p, state } = await page(b);
  await p.goto(U(LANDER, '?gclid=TEST1&utm_term=truck+lawyer'), { waitUntil: 'load' });
  const vis = () => p.$$eval('#f-a [data-step]', (e) => e.map((x) => !x.hidden));
  ok('only step 1 visible on load', JSON.stringify(await vis()) === '[true,false,false]');
  ok('progress reads step 1 of 3', (await p.$eval('#f-a [data-steplabel]', (e) => e.textContent)) === 'Step 1 of 3');
  ok('back hidden on step 1', await p.$eval('#f-a [data-back]', (e) => e.hidden));

  await p.click('#f-a label.pick >> nth=0');
  await p.waitForTimeout(350);
  ok('tapping a choice advances', JSON.stringify(await vis()) === '[false,true,false]');
  ok('progress bar tracks', (await p.$eval('#f-a [data-bar]', (e) => e.style.width)) === '66.6667%'
    || (await p.$eval('#f-a [data-bar]', (e) => e.style.width)).startsWith('66.'));

  await p.click('#f-a [data-back]');
  await p.waitForTimeout(250);
  ok('back returns to step 1', JSON.stringify(await vis()) === '[true,false,false]');
  ok('answer survives going back', await p.$eval('#f-a input[name=case_detail]', (e) => e.checked));
  await p.close();
}

/* --- phone validation (NANP) ----------------------------------------- */
{
  const { p } = await page(b);
  await p.goto(U(LANDER), { waitUntil: 'load' });
  const check = (v) => p.evaluate((val) => {
    const i = document.querySelector('#f-a-p');
    i.value = val;
    const f = document.querySelector('#f-a');
    f.querySelector('button[type=submit]').click();
    return document.querySelector('#f-a [data-step]:not([hidden]) .err')?.textContent || '';
  }, v);

  await fill(p, { phone: '' });
  for (const bad of ['123', '1111111111', '0125550134', '1015550134', '4115550134', '8014115555', '1234567890', '801555']) {
    await p.fill('#f-a-p', bad);
    await p.click('#f-a button[type=submit]');
    await p.waitForTimeout(120);
    const shown = await p.$eval('#f-a [data-step]:not([hidden]) .err', (e) => e.classList.contains('on'));
    ok(`rejects ${bad}`, shown);
  }
  await p.fill('#f-a-p', '18015550134');
  ok('a typed +1 is normalised away', (await p.inputValue('#f-a-p')) === '(801) 555-0134');
  await p.close();
}

/* --- TCPA consent blocks --------------------------------------------- */
{
  const { p, state } = await page(b);
  await p.goto(U(LANDER), { waitUntil: 'load' });
  await fill(p, { consent: false });
  await p.click('#f-a button[type=submit]');
  await p.waitForTimeout(400);
  ok('no consent = no POST', state.posted === null);
  ok('consent error is shown', (await p.$eval('#f-a .status', (e) => e.textContent)).length > 0);
  ok('consent box is flagged', await p.$eval('#f-a .consent', (e) => e.classList.contains('bad')));
  await p.close();
}

/* --- honeypot --------------------------------------------------------- */
{
  const { p, state } = await page(b);
  await p.goto(U(LANDER), { waitUntil: 'load' });
  await fill(p);
  await p.evaluate(() => { document.querySelector('#f-a-g').value = 'spam'; });
  await p.click('#f-a button[type=submit]');
  await p.waitForTimeout(500);
  ok('honeypot swallows the bot', state.posted === null);
  await p.close();
}

/* --- successful submit ------------------------------------------------ */
{
  const { p, state } = await page(b);
  await p.goto(U(LANDER, '?gclid=GC123&utm_campaign=slc-truck'), { waitUntil: 'load' });
  await fill(p);
  await Promise.all([p.waitForURL(/thank-you/, { timeout: 9000 }), p.click('#f-a button[type=submit]')]);
  const d = state.posted;
  ok('POST reached the endpoint', !!d);
  ok('subject carries the client tag', (d._subject || '').startsWith('WilliamAndrewsPPC:'), d._subject);
  ok('gclid rides along', d.gclid === 'GC123');
  ok('case_type baked in', d.case_type === 'truck', d.case_type);
  ok('geo baked in', d.geo === 'logan-ut', d.geo);
  ok('consent recorded', d.consent === 'yes');
  ok('redirect carries geo + ct', /geo=logan-ut/.test(p.url()) && /ct=truck/.test(p.url()), p.url());
  const ev = await p.evaluate(() => (window.dataLayer || []).filter((x) => x && x.event === 'lead_form_submit'));
  ok('lead_form_submit fires on thank-you, once', ev.length === 1);
  await p.close();
}

/* --- failure path: no redirect, no silent loss ------------------------ */
for (const [label, status] of [['500 from the endpoint', 500], ['network failure', 0]]) {
  const { p, state } = await page(b, { formStatus: status });
  await p.goto(U(LANDER), { waitUntil: 'load' });
  await fill(p);
  await p.click('#f-a button[type=submit]');
  await p.waitForTimeout(1200);
  ok(`${label}: stays on the lander`, !/thank-you/.test(p.url()));
  ok(`${label}: shows the call CTA`, /683-4993/.test(await p.$eval('#f-a .status', (e) => e.textContent)));
  ok(`${label}: fires lead_form_error`,
    (await p.evaluate(() => (window.dataLayer || []).filter((x) => x && x.event === 'lead_form_error'))).length === 1);
  ok(`${label}: submit re-enabled`, !(await p.$eval('#f-a button[type=submit]', (e) => e.disabled)));
  await p.close();
}

/* --- Spanish end to end ----------------------------------------------- */
{
  const { p, state } = await page(b);
  await p.goto(U(LANDER, '?lang=es&gclid=ES9'), { waitUntil: 'load' });
  ok('html lang flips to es', (await p.getAttribute('html', 'lang')) === 'es');
  ok('headline is Spanish', /Lesionado/.test(await p.$eval('h1', (e) => e.textContent)));
  ok('city stays correct in Spanish', /Logan/.test(await p.$eval('h1', (e) => e.textContent)));
  ok('title is Spanish', /Abogado/.test(await p.title()));
  ok('consent text is Spanish', /Acepto/.test(await p.$eval('#f-a .consent span', (e) => e.textContent)));

  await p.click('#f-a label.pick >> nth=0'); await p.waitForTimeout(300);
  await p.click('#f-a [data-step]:not([hidden]) label.pick >> nth=0'); await p.waitForTimeout(300);
  await p.fill('#f-a-n', 'José'); await p.fill('#f-a-p', '123');
  await p.check('#f-a input[name=consent]');
  await p.click('#f-a button[type=submit]'); await p.waitForTimeout(200);
  ok('validation error is Spanish', /dígitos/.test(await p.$eval('#f-a [data-step]:not([hidden]) .err', (e) => e.textContent)));

  await p.fill('#f-a-p', '8015550134');
  await Promise.all([p.waitForURL(/thank-you/, { timeout: 9000 }), p.click('#f-a button[type=submit]')]);
  ok('Spanish lead is tagged', /\[ESPANOL\]/.test(state.posted._subject));
  ok('thank-you renders Spanish', /Recibido/.test(await p.$eval('h1', (e) => e.textContent)));
  await p.close();
}

/* --- Spanish failure copy --------------------------------------------- */
{
  const { p } = await page(b, { formStatus: 500 });
  await p.goto(U(LANDER, '?lang=es'), { waitUntil: 'load' });
  await fill(p, { name: 'José' });
  await p.click('#f-a button[type=submit]');
  await p.waitForTimeout(900);
  ok('Spanish error copy on failure', /No se pudo enviar/.test(await p.$eval('#f-a .status', (e) => e.textContent)));
  await p.close();
}

/* --- compliance & page hygiene ---------------------------------------- */
{
  const { p, state } = await page(b);
  await p.goto(U(LANDER), { waitUntil: 'load' });
  const foot = await p.$eval('.foot', (e) => e.textContent);
  ok('names the responsible attorney', /William Enoch Andrews/.test(foot));
  ok('states the bar number', /10032/.test(foot));
  ok('attorney advertising disclosure', /Attorney advertising/i.test(foot));
  ok('no attorney-client relationship', /attorney-client relationship/i.test(foot));
  ok('prior results disclaimer', /Prior results/i.test(foot));
  ok('contingency fee explained', /contingency fee/i.test(foot));
  ok('CCPA link present', await p.$('a[href*="do-not-sell"]') !== null);
  ok('privacy link present', await p.$(`a[href*="privacy"]`) !== null);
  ok('"cases handled", not "cases won"', !/cases won/i.test(await p.content()));
  ok('a real person answers', /real person answers/i.test(await p.content()));
  ok('noindex', (await p.getAttribute('meta[name=robots]', 'content')).includes('noindex'));
  ok('no horizontal overflow', await p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth));
  ok('no JS errors', state.errors.length === 0, state.errors[0]);
  await p.close();
}

/* --- no JavaScript ---------------------------------------------------- */
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 900 }, isMobile: true, javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(U(LANDER), { waitUntil: 'domcontentloaded' });
  ok('no-JS: all steps visible', (await p.locator('#f-a [data-step]:visible').count()) === 3);
  ok('no-JS: name and phone usable', await p.locator('#f-a-n').isVisible() && await p.locator('#f-a-p').isVisible());
  ok('no-JS: consent box visible', await p.locator('#f-a input[name=consent]').isVisible());
  ok('no-JS: back button stays hidden', !(await p.locator('#f-a [data-back]').isVisible()));
  ok('no-JS: call link works', (await p.getAttribute('.sticky a', 'href')) === 'tel:+18016834993');
  await ctx.close();
}

/* --- branded 404 ------------------------------------------------------ */
{
  const { p } = await page(b);
  const r = await p.goto(U('/no-such-page.html'), { waitUntil: 'load' });
  ok('404 status', r.status() === 404);
  ok('404 is branded with a call button', (await p.getAttribute('.btn--call', 'href')) === 'tel:+18016834993');
  await p.close();
}

await b.close(); srv.close();
summary('form-e2e');

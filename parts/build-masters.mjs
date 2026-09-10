/* Generates the four self-contained masters from parts/.
   Run once per content change:  node parts/build-masters.mjs
   Everything a page needs — CSS, JS, geo data, Spanish — ends up inline in
   the master, so a deployed page is a single file with no dependencies. */
import fs from 'node:fs';
import path from 'node:path';

const P = 'parts';
const rd = (f) => fs.readFileSync(path.join(P, f), 'utf8');
const J  = (f) => JSON.parse(rd(f));

/* Headshot: any of these names, first match wins. Detected at build time so
   dropping the file in and re-running is the whole job — no config edit, and
   no page ever references an image that is not there. */
const HEADSHOT = ['will-andrews.webp','will-andrews.jpg','will-andrews.jpeg','will-andrews.png',
                  'headshot.webp','headshot.jpg','headshot.png']
  .find((f) => fs.existsSync(f)) || '';

const CSS = rd('styles.css');
const APP = rd('app.js');
const C   = J('config.json');
const EN  = J('practices.json');
const ES  = J('practices.es.json');
const MK  = J('markets.json');

const esc = (s) => String(s ?? '')
  .replace(/&(?!(?:amp|lt|gt|quot|#\d+|#x[0-9a-f]+);)/gi, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const js = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

const ICON = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.3 2.1z"/></svg>';

/* Spanish ops are keyed on data-i, not document position: a reordered
   section can never silently mistranslate the page. */
const ops = { text: [], html: [], attr: [] };
const T  = (k, t) => ops.text.push({ s: `[data-i="${k}"]`, t });
const H  = (k, t) => ops.html.push({ s: `[data-i="${k}"]`, t });

function stats(list) {
  return `<ul class="stats">${list.map((s, i) =>
    `<li><b data-i="stat${i}b">${s[0]}</b><span data-i="stat${i}s">${esc(s[1])}</span></li>`).join('')}</ul>`;
}

function picks(name, opts, keyPrefix) {
  return opts.map((o, i) =>
    `<label class="pick"><input type="radio" name="${name}" value="${esc(o)}" required>` +
    `<span data-i="${keyPrefix}${i}">${esc(o)}</span></label>`).join('\n            ');
}

function form(p, variant) {
  const id = `f-${variant}`;
  return `
      <form id="${id}" class="fcard${variant === 'b' ? ' fcard--flat' : ''}" data-lead novalidate>
        <h2 data-i="formH">Tell us what happened</h2>
        <p class="fcard__sub" data-i="formS">Three quick questions. About thirty seconds.</p>

        <div class="prog" data-prog hidden>
          <div class="prog__t"><div class="prog__b" data-bar></div></div>
          <p class="prog__l" data-steplabel></p>
        </div>
        <p class="sr" role="status" aria-live="polite" data-say></p>

        <fieldset class="step" data-step data-label="${esc(p.q1)}">
          <legend class="step__q" data-i="q1">${esc(p.q1)}</legend>
          <div class="picks">
            ${picks('case_detail', p.o1, 'o1_')}
          </div>
          <p class="err" aria-live="polite"></p>
        </fieldset>

        <fieldset class="step" data-step data-label="${esc(C.Q2)}">
          <legend class="step__q" data-i="q2">${esc(C.Q2)}</legend>
          <div class="picks">
            ${picks('crash_when', C.O2, 'o2_')}
          </div>
          <p class="err" aria-live="polite"></p>
        </fieldset>

        <fieldset class="step" data-step data-label="${esc(C.Q3)}">
          <legend class="step__q" data-i="q3">${esc(C.Q3)}</legend>
          <p class="step__h" data-i="q3h">${esc(C.Q3_HINT)}</p>
          <div class="f">
            <label for="${id}-n" data-i="lname">Your name</label>
            <input id="${id}-n" name="name" type="text" autocomplete="given-name" enterkeyhint="next" required>
          </div>
          <div class="f">
            <label for="${id}-p" data-i="lphone">Mobile number</label>
            <input id="${id}-p" name="phone" type="tel" inputmode="tel" autocomplete="tel-national"
                   placeholder="(801) 555-0134" enterkeyhint="send" required>
          </div>
          <p class="err" aria-live="polite"></p>

          <label class="consent">
            <input type="checkbox" name="consent" value="yes" required>
            <span data-i="consent">${esc(C.CONSENT.replace('{firm}', C.FIRM_LEGAL))}</span>
          </label>

          <button type="submit" class="btn btn--go" style="margin-top:14px">
            <span data-i="submitMain">Get a free case review</span>
          </button>
        </fieldset>

        <div class="hp" aria-hidden="true">
          <label for="${id}-g">Company</label>
          <input id="${id}-g" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
        </div>

        <button type="button" class="back" data-back hidden>&larr; <span data-i="back">Back</span></button>
        <p class="status" role="status" aria-live="polite"></p>

        <ul class="rsr">
          <li><b>&#10003;</b><span data-i="r1">No fee unless we win. No upfront cost.</span></li>
          <li><b>&#10003;</b><span data-i="r2">Confidential. A real person answers, 24/7.</span></li>
          <li><b>&#10003;</b><span data-i="r3">Sending this does not hire us or create an attorney-client relationship.</span></li>
        </ul>
      </form>`;
}

function buildMaster(slug) {
  const p = EN[slug], e = ES[slug];
  const solKey = slug === 'wrongful-death' ? 'death' : 'injury';

  // Reset per master — each file carries only its own ops.
  ops.text.length = 0; ops.html.length = 0; ops.attr.length = 0;

  T('h1pre', e.h1pre); T('h1post', e.h1post);
  T('sub', e.sub);
  C.STATS_ES.forEach((s, i) => { H(`stat${i}b`, s[0]); T(`stat${i}s`, s[1]); });
  T('q1', e.q1);  e.o1.forEach((o, i) => T(`o1_${i}`, o));
  T('q2', C.Q2_ES); C.O2_ES.forEach((o, i) => T(`o2_${i}`, o));
  T('q3', C.Q3_ES); T('q3h', C.Q3_HINT_ES);
  T('lname', 'Su nombre'); T('lphone', 'Número de celular');
  T('consent', C.CONSENT_ES.replace('{firm}', C.FIRM_LEGAL));
  T('submitMain', 'Consulta gratis');
  T('back', 'Atrás');
  T('formH', 'Cuéntenos qué pasó');
  T('formS', 'Tres preguntas rápidas. Unos treinta segundos.');
  T('r1', 'Si no ganamos, usted no paga nada. Sin costo por adelantado.');
  T('r2', 'Confidencial. Contesta una persona real, las 24 horas.');
  T('r3', 'Enviar esto no nos contrata ni crea una relación abogado-cliente.');
  T('diffH', e.diffH); T('diffL', e.diffL);
  e.diff.forEach((d, i) => { T(`dh${i}`, d[0]); T(`dp${i}`, d[1]); });
  T('hrsH', e.hrsH); T('hrsL', e.hrsL);
  e.hrs.forEach((h, i) => { T(`sh${i}`, h[0]); T(`sp${i}`, h[1]); });
  T('proofH', 'Razones para creernos');
  T('proofL', 'Todo lo de abajo se puede verificar: la calificación abre Google y el registro del colegio de abogados es público.');
  T('whoH', 'Con quién va a hablar');
  T('whoP', `William Andrews lleva casos de lesiones graves y muerte por negligencia en Utah desde 2004. Él es el abogado de su caso, no un gestor al que lo pasan después de firmar.`);
  T('faqH', 'Respuestas claras');
  T('faqL', 'Las preguntas que la gente hace de verdad en la primera llamada.');
  e.faq.forEach((f, i) => { T(`fq${i}`, f[0]); T(`fa${i}`, f[1]); });
  H('sol', C.SOL[`${solKey}_es`]);
  T('closeH', '¿Todavía lo está pensando?');
  T('closeL', 'Llamar no le cuesta nada y no lo compromete a nada. Lo peor que puede pasar es que le digamos que no hay caso.');
  T('callBtn0', `Llame al ${C.INTAKE_DISPLAY}`);
  T('callBtn1', `Llame al ${C.INTAKE_DISPLAY}`);
  T('callNote0', 'Contesta una persona real. Le devolvemos la llamada en unos 15 minutos.');
  T('callNote1', 'Contesta una persona real. Le devolvemos la llamada en unos 15 minutos.');
  T('stickyNote', 'Gratis. Si no ganamos, usted no paga. Contestamos las 24 horas.');
  T('tagline', 'Abogado de Lesiones');

  const esBlock = {
    // Substitute the default city here so the baker's city swap works on the
    // Spanish title the same way it does on the English one.
    title: e.title.replace('{City}', MK.default.city), strings: C.T_ES,
    text: ops.text.slice(), html: ops.html.slice(), attr: ops.attr.slice(),
  };

  const cards = p.diff.map((d, i) =>
    `<div class="card"><h3 data-i="dh${i}">${esc(d[0])}</h3><p data-i="dp${i}">${esc(d[1])}</p></div>`).join('\n        ');
  const hrs = p.hrs.map((h, i) =>
    `<li><h3 data-i="sh${i}">${esc(h[0])}</h3><p data-i="sp${i}">${esc(h[1])}</p></li>`).join('\n        ');
  const faqs = p.faq.map((f, i) =>
    `<details><summary data-i="fq${i}">${esc(f[0])}</summary><div><p data-i="fa${i}">${esc(f[1])}</p></div></details>`).join('\n        ');
  const quotes = C.REVIEWS.map(([q, n]) =>
    `<blockquote><p>&ldquo;${esc(q)}&rdquo;</p><footer>&mdash; ${esc(n)}, Google</footer></blockquote>`).join('\n        ');

  const rateLink = C.REVIEW_URL
    ? `<a href="${esc(C.REVIEW_URL)}" target="_blank" rel="noopener">Read all ${C.REVIEW_COUNT} on Google</a>`
    : `${C.REVIEW_COUNT} reviews on Google`;

  const clarity = C.CLARITY_ID
    ? `\n<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${C.CLARITY_ID}");</script>`
    : `\n<!-- Clarity not configured. Add CLARITY_ID in parts/config.json and re-run build-masters.
     When you do: Settings > Setup > Advanced > Cookies OFF, or Clarity's consent
     banner sits over the bottom of the page, exactly where the mobile call CTA is. -->`;

  const callRail = C.CALLRAIL_SWAP
    ? `\n<script type="text/javascript" src="${C.CALLRAIL_SWAP}"></script>`
    : `\n<!-- CallRail swap script missing: calls cannot be attributed to a keyword. -->`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(p.titlePat.replace('{City}', MK.default.city))}</title>
<meta name="description" content="${esc(p.descPat.replace('{City}', MK.default.city))}">
<!-- Paid-only. Never indexed: these must not compete with the main site's organic pages. -->
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#000000">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23000'/%3E%3Ctext x='32' y='45' font-family='Helvetica,Arial' font-size='38' font-weight='bold' fill='%23e02b1d' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://www.googletagmanager.com">

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})
(window,document,'script','dataLayer','${C.GTM_ID}');</script>
<!-- End Google Tag Manager -->

<script async src="https://www.googletagmanager.com/gtag/js?id=${C.ADS_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());gtag('config','${C.ADS_ID}');gtag('config','${C.GA4_ID}');</script>${clarity}${callRail}

<style>
${CSS}</style>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${C.GTM_ID}" height="0" width="0"
style="display:none;visibility:hidden"></iframe></noscript>

<a class="sr skip" href="#main">Skip to content</a>

<header class="mast">
  <div class="wrap">
    <div class="mast__n">${esc(C.FIRM_NAME)}<span data-i="tagline">${esc(C.FIRM_TAGLINE)}</span></div>
    <div class="mast__r">
      <a class="mast__lang" data-lang-toggle href="?lang=es" rel="nofollow">Español</a>
      <a class="mast__call" href="tel:${C.INTAKE_PHONE}" data-loc="header">${ICON}<span>${esc(C.INTAKE_DISPLAY)}</span></a>
    </div>
  </div>
</header>

<main id="main">
<section class="hero">
  <div class="wrap hgrid">
    <div>
      <h1><span class="h1-pre" data-i="h1pre">${esc(p.h1pre)}</span>
        <span class="h1-city">${esc(MK.default.h1city)}</span>
        <span class="h1-post" data-i="h1post">${esc(p.h1post)}</span></h1>
      <p class="hero__sub" data-i="sub">${esc(p.sub)}</p>
      ${stats(C.STATS)}
      <div class="cta-wrap">
        <a class="btn btn--call" href="tel:${C.INTAKE_PHONE}" data-loc="hero">${ICON}<span data-i="callBtn0">Call ${esc(C.INTAKE_DISPLAY)}</span></a>
        <p class="cta-note" data-i="callNote0">A real person answers. Callbacks usually within 15 minutes.</p>
      </div>
      <p class="serve" data-serve><strong>Serving ${esc(MK.default.metro)}</strong> &mdash; we come to you at the hospital or at home.</p>
    </div>
    ${form(p, 'a')}
  </div>
</section>

<section>
  <div class="wrap">
    <h2 data-i="diffH">${esc(p.diffH)}</h2>
    <p class="lede" data-i="diffL">${esc(p.diffL)}</p>
    <div class="cards">
        ${cards}
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <h2 data-i="hrsH">${esc(p.hrsH)}</h2>
    <p class="lede" data-i="hrsL">${esc(p.hrsL)}</p>
    <ol class="steps">
        ${hrs}
    </ol>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 data-i="proofH">Reasons to believe any of this</h2>
    <p class="lede" data-i="proofL">Everything below is checkable — the rating opens Google, and the bar record is public.</p>
    <div class="rate"><b>${C.REVIEW_RATING}</b><span class="s" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>${rateLink}</span></div>
    <div class="quotes">
        ${quotes}
    </div>
    <div class="who${HEADSHOT ? ' who--p' : ''}" data-who style="margin-top:18px">
      ${HEADSHOT ? `<img src="/${HEADSHOT}" width="128" height="128" loading="lazy"
        alt="${esc(C.RESPONSIBLE_ATTORNEY)}, Utah injury attorney">` : ''}
      <div>
        <h3 data-i="whoH">Who you are calling</h3>
        <p data-i="whoP">William Andrews has handled serious injury and wrongful death cases in Utah since 2004. He is the attorney on your case, not a case manager you get handed to after signing.</p>
        <ul>
          <li>${esc(C.BAR_STATE)} State Bar no. ${esc(C.BAR_NUMBER)} &middot; admitted ${esc(C.ADMITTED)}</li>
          <li>${esc(C.OFFICE_ADDR)}</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <h2 data-i="faqH">Straight answers</h2>
    <p class="lede" data-i="faqL">The questions people actually ask on the first call.</p>
    <div class="faq">
        ${faqs}
    </div>
    <p class="sol" data-i="sol">${C.SOL[solKey]}</p>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 data-i="closeH">Still deciding?</h2>
    <p class="lede" data-i="closeL">Calling costs you nothing and commits you to nothing. The worst outcome is that we tell you there is no case and you get on with your week.</p>
    <div class="cta-wrap">
      <a class="btn btn--call" href="tel:${C.INTAKE_PHONE}" data-loc="closing">${ICON}<span data-i="callBtn1">Call ${esc(C.INTAKE_DISPLAY)}</span></a>
      <p class="cta-note" data-i="callNote1">A real person answers. Callbacks usually within 15 minutes.</p>
    </div>
    <div style="height:18px"></div>
    ${form(p, 'b')}
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap">
    <p><strong>${esc(C.FIRM_LEGAL)}</strong><br>${esc(C.OFFICE_ADDR)}<br>
      <a href="tel:${C.INTAKE_PHONE}" data-loc="footer">${esc(C.INTAKE_DISPLAY)}</a> &middot;
      <a href="mailto:${esc(C.INTAKE_EMAIL)}">${esc(C.INTAKE_EMAIL)}</a></p>
    <p class="fine">
      <strong>Attorney advertising.</strong> This page is general information about Utah injury law
      and is not legal advice. Reading it, calling us, or sending this form does not create an
      attorney-client relationship &mdash; that begins only when we both sign a written agreement.
      Do not send confidential information before then. Prior results do not guarantee or predict a
      similar outcome; every case turns on its own facts. Cases are handled on a contingency fee:
      no fee is charged unless there is a recovery, and case costs are deducted from the recovery.
      Responsible attorney: ${esc(C.RESPONSIBLE_ATTORNEY)}, ${esc(C.BAR_STATE)} State Bar no.
      ${esc(C.BAR_NUMBER)}. Licensed in ${esc(C.BAR_STATE)}. Office: ${esc(C.OFFICE_ADDR)}.
    </p>
    <nav class="fine">
      <a href="${esc(C.PRIVACY_URL)}">Privacy policy</a>
      <a href="${esc(C.TERMS_URL)}">Terms of use</a>
      <a href="${esc(C.DNS_URL)}">Do Not Sell or Share My Personal Information</a>
    </nav>
  </div>
</footer>

<div class="sticky" role="region" aria-label="Call now">
  <div class="sticky__r"><a href="tel:${C.INTAKE_PHONE}" data-loc="sticky">${ICON}<span>${esc(C.INTAKE_DISPLAY)}</span></a></div>
  <p data-i="stickyNote">Free. No fee unless we win. A real person answers, 24/7.</p>
</div>

<script type="application/json" id="geo-data">${js(MK)}</script>
<script type="application/json" id="i18n-es">${js(esBlock)}</script>
<script>window.LP=${js({
  caseType: p.caseType, geo: 'default', city: MK.default.city, lang: 'en',
  formEndpoint: C.FORM_ENDPOINT, subjectTag: C.EMAIL_SUBJECT_TAG,
  phoneDisplay: C.INTAKE_DISPLAY, t: C.T_EN, kwMap: p.kw,
})};</script>
<script>
${APP}</script>
</body>
</html>
`;
}

let n = 0;
for (const slug of Object.keys(EN)) {
  fs.writeFileSync(`${slug}.html`, buildMaster(slug));
  const kb = (fs.statSync(`${slug}.html`).size / 1024).toFixed(1);
  console.log(`  ${slug}.html  ${kb} KB${HEADSHOT ? '' : '   (no headshot)'}`);
  n++;
}
console.log(`\n  ${n} masters written. Now: node generate-geo.mjs <master>.html --all`);

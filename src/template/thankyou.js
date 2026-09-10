const { esc, jsonScript, ICONS, brandTokens } = require('./partials');
const STRINGS = require('../config/shared/strings');

/**
 * Thank-you page.
 *
 * Two jobs, in order:
 *   1. Tell them what happens next, with a time attached, so they stop
 *      shopping and stop filling in the next firm's form.
 *   2. Give them a backup way to reach us right now, because the callback
 *      has not happened yet and this is the moment they are most willing
 *      to talk.
 *
 * It is also the natural place to hang a Google Ads conversion in GTM if the
 * firm prefers a page-load trigger over the JS event.
 */
function render(site, lang) {
  const t = site.tracking;
  const S = STRINGS[lang];
  const intake = lang === 'es' && site.intake.es
    ? Object.assign({}, site.intake, site.intake.es)
    : site.intake;
  const lpConfig = {
    googleAdsId: t.googleAdsId,
    conversionLabels: t.conversionLabels,
    formEndpoint: '',
    thankYouUrl: lang === 'es' ? '/es/gracias/' : '/thank-you/',
    phoneDisplay: site.phones.tracking.display,
  };

  const callRail = t.callRailSwapScript
    ? `\n  <script type="text/javascript" src="${esc(t.callRailSwapScript)}"></script>`
    : '';

  return `<!doctype html>
<html lang="${esc(S.htmlLang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(S.tyTitle)} | ${esc(site.firm.shortName)}</title>
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="${esc(site.site.brandColor)}">
  <link rel="stylesheet" href="/assets/styles.css">
  ${brandTokens(site)}
  <script>window.LP_CONFIG = ${jsonScript(lpConfig)};</script>

  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${esc(t.gtmId)}');</script>
  <!-- End Google Tag Manager -->

  <script async src="https://www.googletagmanager.com/gtag/js?id=${esc(t.googleAdsId)}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${esc(t.googleAdsId)}');
    // Page-load signal for anyone triggering the Ads conversion in GTM on
    // the thank-you view rather than on the form event.
    dataLayer.push({ event: 'lp_lead_thankyou' });
  </script>${callRail}
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${esc(t.gtmId)}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<header class="masthead">
  <div class="wrap">
    <div class="masthead__name">
      ${esc(site.firm.shortName)}
      <span>${esc(S.tagline)}</span>
    </div>
    <a class="masthead__call" href="tel:${esc(site.phones.tracking.e164)}" data-loc="header_ty">
      ${ICONS.phone}<span>${esc(site.phones.tracking.display)}</span>
    </a>
  </div>
</header>

<main id="main">
<section class="hero">
  <div class="wrap">
    <h1>${esc(S.tyH1)}<span class="hero__line2">${esc(S.tyH1Line2(site.phones.tracking.display.slice(1, 4)))}</span></h1>
    <p class="hero__sub">${esc(S.tySub(intake.callbackSla))}</p>

    <div class="cta-stack">
      <a class="btn btn--call" href="tel:${esc(site.phones.tracking.e164)}" data-loc="thankyou">
        ${ICONS.phone}<span>${esc(S.callNumber(site.phones.tracking.display))}</span>
      </a>
      <a class="btn btn--text" href="sms:${esc(site.phones.sms.e164)}" data-loc="thankyou">
        ${ICONS.chat}<span>${esc(S.textInstead)}</span>
      </a>
    </div>
    <p class="cta-note" data-incident-hint hidden>
      ${esc(S.tyToldUs)} <strong data-incident-slot></strong>
    </p>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>${esc(S.tyWaitHeading)}</h2>
    <p class="sec__lede">${esc(S.tyWaitLede)}</p>
    <ol class="steps">
      ${S.tySteps.map((x) => `
      <li>
        <h3>${esc(x.h)}</h3>
        <p>${esc(x.p)}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap">
    <p>
      <strong>${esc(site.firm.legalName)}</strong><br>
      ${esc(site.firm.address.street)}, ${esc(site.firm.address.city)},
      ${esc(site.firm.address.state)} ${esc(site.firm.address.zip)}<br>
      <a href="tel:${esc(site.phones.tracking.e164)}" data-loc="footer_ty">${esc(site.phones.tracking.display)}</a>
    </p>
    <p class="foot__legal">${esc(S.advertising)} ${esc(lang === 'es' ? site.legal.disclaimerEs : site.legal.disclaimer)}</p>
  </div>
</footer>

<div class="stickybar" role="region" aria-label="Contact us now">
  <div class="stickybar__row">
    <a class="sb-call" href="tel:${esc(site.phones.tracking.e164)}" data-loc="sticky_ty">
      ${ICONS.phone}<span>${esc(S.callNow)}</span>
    </a>
    <a class="sb-text" href="sms:${esc(site.phones.sms.e164)}" data-loc="sticky_ty">
      ${ICONS.chat}<span>${esc(S.textPerson(site.firm.attorneyFirstName))}</span>
    </a>
  </div>
  <p class="stickybar__note">${esc(S.stickyNote(intake.hours))}</p>
</div>

<script src="/assets/lp.js" defer></script>
<script>
  // Reveal the "you told us" line only when the form actually passed a type.
  (function () {
    var t = new URLSearchParams(location.search).get('t');
    if (!t) return;
    var hint = document.querySelector('[data-incident-hint]');
    if (hint) hint.hidden = false;
  })();
</script>
</body>
</html>
`;
}

module.exports = { render };

const { esc, jsonScript, ICONS, brandTokens, stickyBar, form, ctaStack } = require('./partials');

/**
 * Renders one PPC landing page.
 *
 * Structure is fixed at five blocks, in this order:
 *   1. Offer + call + form      (the only thing most visitors will see)
 *   2. Why this case is different
 *   3. What we do in the first 72 hours
 *   4. Proof - rating, reviews, results, who is answering
 *   5. FAQ + repeat form + closing CTA
 *
 * Anything that does not serve a decision within ~12 seconds belongs on the
 * main site, not on a URL we are paying for.
 */

/* -------------------------------------------------------------------------
   Head: tracking first, because a page that renders without firing GTM is a
   page whose spend cannot be measured.
   ------------------------------------------------------------------------- */
function head(site, page) {
  const t = site.tracking;
  const canonical = `${site.site.origin}/${page.slug}/`;

  const callRail = t.callRailSwapScript
    ? `\n  <script type="text/javascript" src="${esc(t.callRailSwapScript)}"></script>`
    : `\n  <!-- CallRail swap script not configured. Dynamic number insertion is OFF,
       so calls cannot be attributed to a keyword. See LAUNCH-CHECKLIST.md. -->`;

  const S = page.t;
  const lpConfig = {
    googleAdsId: t.googleAdsId,
    conversionLabels: t.conversionLabels,
    formEndpoint: site.formEndpoint,
    // Each language keeps its own thank-you page, so a Spanish lead is never
    // dropped onto an English confirmation.
    thankYouUrl: page.lang === 'es' ? '/es/gracias/' : '/thank-you/',
    phoneDisplay: site.phones.tracking.display,
    // Validation and status copy, so lp.js carries no hardcoded English.
    i18n: {
      errName: S.errName,
      errPhone: S.errPhone,
      errIncident: S.errIncident,
      errFix: S.errFix,
      sending: S.sending,
      sendingBtn: S.sendingBtn,
      errSend: S.errSend(site.phones.tracking.display),
    },
  };

  const altUrl = `${site.site.origin}/${page.altSlug}/`;

  return `<!doctype html>
<html lang="${esc(S.htmlLang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.metaDescription)}">
  <link rel="canonical" href="${esc(canonical)}">
  <link rel="alternate" hreflang="${esc(page.lang === 'es' ? 'en' : 'es')}" href="${esc(altUrl)}">
  <link rel="alternate" hreflang="${esc(S.htmlLang)}" href="${esc(canonical)}">
  <!-- Paid-only URL. Keeping it out of the index stops it competing with the
       main site's organic pages for the same terms. -->
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="${esc(site.site.brandColor)}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.metaDescription)}">
  <meta property="og:type" content="website">

  <link rel="preconnect" href="https://www.googletagmanager.com">
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

  <!-- Google Ads. Loaded directly as well as through GTM so a container
       misconfiguration cannot silently stop conversion reporting. -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${esc(t.googleAdsId)}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${esc(t.googleAdsId)}');
  </script>${callRail}

  <script type="application/ld+json">${jsonScript(legalServiceSchema(site, page))}</script>
  <script type="application/ld+json">${jsonScript(faqSchema(page))}</script>
</head>`;
}

function legalServiceSchema(site, page) {
  const a = site.firm.address;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: site.firm.legalName,
    description: page.metaDescription,
    telephone: site.phones.tracking.display,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    areaServed: page.serviceArea.map((n) => ({ '@type': 'City', name: n })),
    priceRange: 'No fee unless we win',
  };
  // Only publish a rating when we have a count to publish with it.
  if (site.reviews.count && site.reviews.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(site.reviews.rating),
      reviewCount: String(site.reviews.count),
    };
  }
  return schema;
}

function faqSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') },
    })),
  };
}

/* -------------------------------------------------------------------------
   Block 1 - the first screen
   ------------------------------------------------------------------------- */
function hero(site, page) {
  const r = site.reviews;
  const t = page.t;

  // The rating chip only claims what we can show. Without a verified count
  // it is dropped entirely rather than shown as a bare star rating.
  const ratingChip =
    r.count && r.profileUrl
      ? `<li><span class="star">&#9733;</span>
           <a href="${esc(r.profileUrl)}" target="_blank" rel="noopener">${esc(t.chipReviewsLinked(r.rating, r.count))}</a></li>`
      : r.count
        ? `<li><span class="star">&#9733;</span> ${esc(t.chipReviews(r.rating, r.count))}</li>`
        : '';

  const years = new Date().getFullYear() - site.firm.admittedYear;

  return `
  <header class="masthead">
    <div class="wrap">
      <div class="masthead__name">
        ${esc(site.firm.shortName)}
        <span>${esc(t.tagline)}</span>
      </div>
      <div class="masthead__right">
        <a class="masthead__lang" href="/${esc(page.altSlug)}/" hreflang="${esc(page.lang === 'es' ? 'en' : 'es')}"
           aria-label="${esc(t.langToggleAria)}" data-loc="lang_toggle">${esc(t.langToggle)}</a>
        <a class="masthead__call" href="tel:${esc(site.phones.tracking.e164)}" data-loc="header">
          ${ICONS.phone}<span>${esc(site.phones.tracking.display)}</span>
        </a>
      </div>
    </div>
  </header>

  <main id="main">
  <section class="hero">
    <div class="wrap hero__grid">
      <div>
        <h1>${esc(page.h1)}<span class="hero__line2">${esc(page.h1Line2)}</span></h1>
        <p class="hero__sub">${esc(page.subhead)}</p>

        <ul class="chips">
          <li>${esc(t.chipYears(years))}</li>
          ${ratingChip}
          <li>${esc(t.chipNoFee)}</li>
        </ul>

        ${ctaStack(site, page, 'hero')}

        <div class="locality">${page.localityHtml}</div>
      </div>

      ${form(site, page, 'hero')}
    </div>
  </section>`;
}

/* -------------------------------------------------------------------------
   Block 2 - why this case is different
   ------------------------------------------------------------------------- */
function differenceBlock(page) {
  const items = page.difference.items
    .map(
      (i) => `
        <div class="contrast__item">
          <h3>${esc(i.h)}</h3>
          <p>${esc(i.p)}</p>
        </div>`
    )
    .join('');

  return `
  <section>
    <div class="wrap">
      <h2>${esc(page.difference.heading)}</h2>
      <p class="sec__lede">${esc(page.difference.lede)}</p>
      <div class="contrast">${items}</div>
    </div>
  </section>`;
}

/* -------------------------------------------------------------------------
   Block 3 - the first 72 hours
   ------------------------------------------------------------------------- */
function firstHoursBlock(site, page) {
  const steps = page.firstHours.steps
    .map((s) => `
        <li>
          <h3>${esc(s.h)}</h3>
          <p>${esc(s.p)}</p>
        </li>`)
    .join('');

  return `
  <section class="sec--alt">
    <div class="wrap">
      <h2>${esc(page.firstHours.heading)}</h2>
      <p class="sec__lede">${esc(page.firstHours.lede)}</p>
      <ol class="steps">${steps}</ol>
    </div>
  </section>`;
}

/* -------------------------------------------------------------------------
   Block 4 - proof
   Each sub-block renders only if there is real data behind it.
   ------------------------------------------------------------------------- */
function proofBlock(site, page) {
  const r = site.reviews;
  const t = page.t;
  const parts = [];

  if (r.count) {
    const link = r.profileUrl
      ? `<a href="${esc(r.profileUrl)}" target="_blank" rel="noopener">${esc(page.t.reviewsAll(r.count))}</a>`
      : esc(page.t.reviewsPlain(r.count));
    parts.push(`
      <div class="rating-bar">
        <span class="rating-bar__score">${esc(r.rating)}</span>
        <span class="rating-bar__stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <span class="rating-bar__meta">${link}</span>
      </div>`);
  }

  if (r.quotes.length) {
    const quotes = r.quotes
      .map(
        (q) => `
        <blockquote class="quote">
          <p>&ldquo;${esc(q.quote)}&rdquo;</p>
          <footer>&mdash; ${esc(q.name)}, ${esc(q.source)}${q.matter ? ` &middot; ${esc(q.matter)}` : ''}</footer>
        </blockquote>`
      )
      .join('');
    parts.push(`<div class="quotes">${quotes}</div>`);
  }

  if (site.results.length) {
    const rows = site.results
      .map(
        (x) => `
        <div class="result">
          <span class="result__amt">${esc(x.amount)}</span>
          <span class="result__desc">${esc(x.injury)}${x.vehicle ? ` &middot; ${esc(x.vehicle)}` : ''}${x.year ? ` &middot; ${esc(x.year)}` : ''}</span>
        </div>`
      )
      .join('');
    parts.push(`<div class="results">${rows}</div>`);
  }

  // Who is actually on the other end of the phone.
  const photo = site.bio.photo
    ? `<img class="who__photo" src="${esc(site.bio.photo)}" width="128" height="128"
            alt="${esc(site.firm.attorney)}, ${esc(site.firm.city || site.firm.address.city)} injury attorney" loading="lazy">`
    : '';

  parts.push(`
      <div class="who">
        ${photo}
        <div>
          <h3>${esc(page.t.whoHeading)}</h3>
          <p>${esc(page.who)}</p>
          <ul>
            <li>${esc(page.t.whoPractising(site.firm.admittedYear, site.bio.education))}</li>
            ${site.bio.memberships.map((m) => `<li>${esc(m)}</li>`).join('\n            ')}
            <li>${esc(page.intake.whoAnswers)} ${esc(page.intake.hours)}.</li>
          </ul>
        </div>
      </div>`);

  return `
  <section>
    <div class="wrap">
      <h2>${esc(page.proofHeading)}</h2>
      <p class="sec__lede">${esc(page.proofLede)}</p>
      ${parts.join('\n')}
    </div>
  </section>`;
}

/* -------------------------------------------------------------------------
   Block 5 - FAQ, service area, repeat form, close
   ------------------------------------------------------------------------- */
function closingBlock(site, page) {
  const faqs = page.faqs
    .map(
      (f) => `
        <details>
          <summary>${esc(f.q)}</summary>
          <div class="faq__body">${f.a.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        </details>`
    )
    .join('');

  const areas = page.serviceArea.map((c) => `<li>${esc(c)}</li>`).join('');

  return `
  <section class="sec--alt">
    <div class="wrap">
      <h2>${esc(page.t.faqHeading)}</h2>
      <p class="sec__lede">${esc(page.t.faqLede)}</p>
      <div class="faq">${faqs}</div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2>${esc(page.closingHeading)}</h2>
      <p class="sec__lede">${esc(page.closingLede)}</p>
      ${ctaStack(site, page, 'closing')}
      <div style="height:20px"></div>
      ${form(site, page, 'repeat')}
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2>${esc(page.t.areaHeading)}</h2>
      <p class="sec__lede">${esc(page.serviceAreaNote)}</p>
      <ul class="area-list">${areas}</ul>
    </div>
  </section>
  </main>`;
}

function footer(site, page) {
  const a = site.firm.address;
  const t = page.t;
  const bar = site.firm.barNumber
    ? `${esc(t.barLine(site.firm.barNumber))}<a href="${esc(site.firm.barProfileUrl)}"
        target="_blank" rel="noopener">${esc(t.verify)}</a>.`
    : '';

  return `
  <footer class="foot">
    <div class="wrap">
      <p>
        <strong>${esc(site.firm.legalName)}</strong><br>
        ${esc(a.street)}, ${esc(a.city)}, ${esc(a.state)} ${esc(a.zip)}<br>
        <a href="tel:${esc(site.phones.tracking.e164)}" data-loc="footer">${esc(site.phones.tracking.display)}</a>
      </p>
      <p class="foot__legal">
        ${esc(t.advertising)}${bar}
        ${esc(page.lang === 'es' ? site.legal.disclaimerEs : site.legal.disclaimer)}
      </p>
      <p class="foot__legal">
        <a href="${esc(site.legal.privacyUrl)}">${esc(t.privacy)}</a> &middot;
        <a href="${esc(site.legal.termsUrl)}">${esc(t.terms)}</a>
      </p>
    </div>
  </footer>`;
}

function render(site, page) {
  return `${head(site, page)}
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${esc(site.tracking.gtmId)}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<a class="sr-only skip" href="#main">${esc(page.t.skip)}</a>
${hero(site, page)}
${differenceBlock(page)}
${firstHoursBlock(site, page)}
${proofBlock(site, page)}
${closingBlock(site, page)}
${footer(site, page)}
${stickyBar(site, page)}
<script src="/assets/lp.js" defer></script>
</body>
</html>
`;
}

module.exports = { render };

#!/usr/bin/env node
'use strict';

/**
 * Build: config -> dist/ static HTML.
 *
 * `node build.js`         builds into dist/
 * `node build.js --check` builds, then reports what still blocks launch
 *                         and exits non-zero if anything does.
 *
 * The check exists because the failure mode for this project is not a
 * broken build. It is a page that looks finished, goes live, and quietly
 * drops leads because nobody wired the form endpoint.
 */

const fs = require('fs');
const path = require('path');

const site = require('./src/config/site');
const buildPages = require('./src/config/pages');
const pageTpl = require('./src/template/page');
const thankYouTpl = require('./src/template/thankyou');

const DIST = path.join(__dirname, 'dist');
const ASSETS = path.join(__dirname, 'src', 'assets');

function write(relPath, contents) {
  const full = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
  return full;
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) return 0;
  fs.mkdirSync(to, { recursive: true });
  let n = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) n += copyDir(src, dst);
    else { fs.copyFileSync(src, dst); n++; }
  }
  return n;
}

/**
 * Launch blockers vs warnings.
 *
 * BLOCKER  - running paid traffic in this state loses money or misleads.
 * WARNING  - the page works, but is weaker than it should be.
 */
function audit(pages) {
  const blockers = [];
  const warnings = [];

  if (!site.formEndpoint) {
    blockers.push(
      'site.formEndpoint is empty. Form submissions will FAIL and the visitor is told to call ' +
      'instead. No lead is silently lost, but no form lead is captured either.'
    );
  }
  if (site.tracking.ga4Id) {
    warnings.push(
      `GA4 (${site.tracking.ga4Id}) is loaded directly on every page. If the GTM container also ` +
      'fires a GA4 tag with this same ID, pageviews will be double-counted. Keep GA4 in one ' +
      'place — here or in GTM, not both.'
    );
  }

  if (!site.tracking.callRailSwapScript) {
    blockers.push(
      'site.tracking.callRailSwapScript is empty. Calls cannot be attributed to a campaign or ' +
      'keyword, so cost-per-call is unknowable and bidding is blind.'
    );
  }

  const labels = site.tracking.conversionLabels;
  const missingLabels = Object.keys(labels).filter((k) => !labels[k]);
  if (missingLabels.length) {
    blockers.push(
      `Google Ads conversion labels missing: ${missingLabels.join(', ')}. ` +
      'The dataLayer events still fire for GTM, but Ads will not record these conversions ' +
      'directly and smart bidding has nothing to optimise toward.'
    );
  }

  // Google Ads requires a reachable privacy policy, and a dead footer link on
  // a page taking personal details is a bad look regardless. These URLs were
  // inferred from the main site's structure, not verified.
  if (!site.legal.linksVerifiedOn) {
    warnings.push(
      `Privacy (${site.legal.privacyUrl}) and terms (${site.legal.termsUrl}) URLs have not been ` +
      'confirmed to resolve. Open both, then set legal.linksVerifiedOn.'
    );
  }

  // The call button is white text on the accent. If the firm's real orange is
  // lighter than the placeholder, that drops below the 3:1 needed for a UI
  // component and the button text has to go dark instead.
  if (!site.site.colorsVerifiedOn) {
    warnings.push(
      'site.site.colors are an approximation, not sampled from williamandrewslaw.com. Replace ' +
      'with the real hex values and set colorsVerifiedOn. Note the call button is white on ' +
      `${site.site.colors.accent} at 3.04:1 — barely over the 3:1 minimum — so a lighter brand ` +
      'orange needs dark button text instead.'
    );
  }

  if (!site.reviews.quotes.length) {
    warnings.push(
      'site.reviews.quotes is empty, so the review section is omitted rather than filled with ' +
      'invented quotes. Add 3 real Google reviews that mention the injury, the communication ' +
      'and the outcome.'
    );
  }
  if (!site.reviews.profileUrl) {
    warnings.push(
      'site.reviews.profileUrl is empty. The rating shows without a clickable source, which is ' +
      'exactly the "4.7 with no denominator" problem. Add the Google reviews deep link.'
    );
  }
  if (!site.reviews.countVerifiedOn) {
    warnings.push(
      `Review count (${site.reviews.count}) has no verification date. Confirm it against the live ` +
      'Google profile and set reviews.countVerifiedOn — a stale count is a credibility leak.'
    );
  }
  if (!site.results.length) {
    warnings.push(
      'site.results is empty, so the results section is omitted. "Millions won" persuades nobody; ' +
      '2-4 specific recoveries with injury type and year do.'
    );
  }
  if (!site.bio.photo) {
    warnings.push('site.bio.photo is empty. The "who you are calling" block renders without a face.');
  }
  if (!site.firm.barNumber) {
    warnings.push('site.firm.barNumber is empty. The footer loses a cheap verifiability signal.');
  }
  if (site.phones.sms.e164 === site.phones.tracking.e164) {
    warnings.push(
      'SMS and call numbers are identical. Confirm the CallRail number is SMS-enabled and that ' +
      'inbound texts reach a monitored device — a text link into a dead inbox is worse than none.'
    );
  }

  // Message match: the H1 has to contain the geography the ad group targets,
  // otherwise the visitor's first read is "wrong page".
  pages.forEach((p) => {
    const h1 = `${p.h1} ${p.h1Line2}`.toLowerCase();
    const hasGeo = p.serviceArea.some((c) => h1.includes(c.toLowerCase())) ||
      h1.includes(p.geoKey.split('-')[0]) ||
      h1.includes('cache') || h1.includes('i-15') || h1.includes('weber') || h1.includes('davis');
    if (!hasGeo) {
      warnings.push(`/${p.slug}/ H1 names no geography. Check it matches the ad group's promise.`);
    }
  });

  if (site.intake.spanishStaffed) {
    const es = pages.filter((p) => p.lang === 'es');

    // A Spanish page routing to an English-only line is worse than no Spanish
    // page, so the promise printed on it has to be one intake can actually keep.
    if (!site.intake.es) {
      blockers.push(
        'spanishStaffed is true but intake.es is missing, so the Spanish pages promise the ' +
        'English coverage hours. Set intake.es to what Spanish intake actually covers.'
      );
    } else if (!site.intake.esCoverageConfirmedOn) {
      // The two strings are translations of each other, so they can never be
      // compared directly - this asks until someone confirms it, by dating
      // intake.esCoverageConfirmedOn.
      warnings.push(
        `Spanish pages promise: "${site.intake.es.hours}" / "${site.intake.es.callbackSla}". ` +
        'Confirm a Spanish speaker really is reachable at 9pm on a Saturday, then set ' +
        'intake.esCoverageConfirmedOn. If Spanish coverage is narrower than English, narrow ' +
        'intake.es first — this string is printed next to every CTA on the /es/ pages.'
      );
    }

    // Every English page needs its counterpart to exist, or the toggle and the
    // hreflang tags both point at a 404.
    const slugs = new Set(pages.map((p) => p.slug));
    pages.forEach((p) => {
      if (!slugs.has(p.altSlug)) {
        blockers.push(`/${p.slug}/ links to /${p.altSlug}/ as its language pair, which does not exist.`);
      }
    });

    // Catches a page that was added in English and never translated: the
    // generated Spanish falls back to English strings and nobody notices.
    es.forEach((p) => {
      if (/\b(Injured|Hurt in|Talk to a Utah attorney)\b/.test(`${p.h1} ${p.h1Line2}`)) {
        blockers.push(`/${p.slug}/ has an untranslated English H1.`);
      }
    });

    if (!site.legal.disclaimerEs) {
      blockers.push('legal.disclaimerEs is empty, so Spanish pages would carry an English disclaimer.');
    }
  }

  return { blockers, warnings };
}

function main() {
  const checkOnly = process.argv.includes('--check');

  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const pages = buildPages(site);
  const slugs = new Set();

  pages.forEach((page) => {
    if (slugs.has(page.slug)) throw new Error(`Duplicate slug: ${page.slug}`);
    slugs.add(page.slug);
    // Directory-per-page so the live URL is /slug/ with no extension.
    write(path.join(page.slug, 'index.html'), pageTpl.render(site, page));
  });

  write(path.join('thank-you', 'index.html'), thankYouTpl.render(site, 'en'));
  if (site.intake.spanishStaffed) {
    write(path.join('es', 'gracias', 'index.html'), thankYouTpl.render(site, 'es'));
  }

  // Paid-only subdomain: keep the whole thing out of the index so it never
  // competes with the main site's organic pages.
  write('robots.txt', 'User-agent: *\nDisallow: /\n');

  // Root redirects to the flagship so a stray direct visit still lands
  // somewhere useful.
  write(
    'index.html',
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0; url=/${pages[0].slug}/">
<title>Redirecting</title>
</head>
<body><p><a href="/${pages[0].slug}/">Continue</a></p></body>
</html>
`
  );

  const assetCount = copyDir(ASSETS, path.join(DIST, 'assets'));

  console.log(`\n  Built ${pages.length} landing pages + thank-you page`);
  pages.forEach((p) => console.log(`    /${p.slug}/`));
  console.log(`  Copied ${assetCount} asset file(s)\n`);

  const { blockers, warnings } = audit(pages);

  if (warnings.length) {
    console.log('  WARNINGS (page works, but weaker than it should be):');
    warnings.forEach((w) => console.log(`    - ${w}`));
    console.log('');
  }
  if (blockers.length) {
    console.log('  LAUNCH BLOCKERS (do not run paid traffic until fixed):');
    blockers.forEach((b) => console.log(`    - ${b}`));
    console.log('');
  }
  if (!blockers.length && !warnings.length) {
    console.log('  Ready to launch: no blockers, no warnings.\n');
  }

  if (checkOnly && blockers.length) process.exit(1);
}

main();

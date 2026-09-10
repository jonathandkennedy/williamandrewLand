# William Andrews — PPC landing pages

Mobile-first paid-search landing pages for **William Enoch Andrews Injury Lawyer, PC**,
built to be deployed on a separate subdomain (`results.williamandrewslaw.com`) and
pointed at from Google Ads.

These are **not** SEO pages. They are `noindex`, they carry no site navigation, and
they are built around one decision: *would a hurt person, on a phone, at 9:40pm,
trust this enough to tap?*

---

## Why these exist

The existing geo pages (e.g. `/cache-county-truck-accident-lawyer/`) are templated
SEO pages that ads were later pointed at. On a phone, the first screen spent itself
on a hero portrait and a slogan, the primary form had **no phone field** and a
required "Subject" line, the 4.7 rating carried no review count, and one testimonial
was from someone who had only watched a YouTube ad.

Every structural decision in this repo is a response to a specific one of those
problems. Where a fix depends on a fact only the firm has — a real review, a real
settlement figure — the page **omits the block rather than inventing content**, and
`npm run check` tells you what is missing.

## What is different

| Problem | What this does instead |
|---|---|
| Form had no phone field; "Subject" was required | Four fields: name, **mobile (required)**, what happened, optional city+date. Email is not asked for at all. |
| Form buried ~10,000px down | Call button at ~360px, form card crests the fold on every phone tested. |
| No sticky call/text bar | Persistent bottom bar: **Call Now / Text Will**, plus "Free. No fee unless we win. Answered 24/7." |
| Full-bleed portrait behind headline | Flat dark header, high-contrast type. The photo moves to "Who you are calling", after the first CTA. |
| 4.7 stars with no denominator | Rating renders only with a count, and links to the live Google profile. No count, no rating. |
| A YouTube-viewer "review" | `site.reviews.quotes` starts **empty**. Real reviews only; the section is omitted otherwise. |
| SLC office, 801 number, silence about Logan | An honesty block above the fold: *"Our office is in Salt Lake City, not Logan."* Then why that is survivable. |
| Karate branding as the H1 | Replaced by "What we do in the first 72 hours" — spoliation letter, ECM/ELD data, defendants, recorded statements. Karate is one line in the bio. |
| 10,000px page, generic process blobs | Five blocks. Roughly 6,300px on a phone. |
| One shared URL for every keyword | One URL per ad group — truck vs car vs wrongful death, per county. |
| No call attribution | CallRail tracking number `(801) 683-4993` throughout, `gclid`/`utm_*` captured and attached to every lead. |

## Pages

| URL | Ad group |
|---|---|
| `/cache-county-truck-accident/` | Cache County / Logan — truck **(flagship)** |
| `/cache-county-car-accident/` | Cache County / Logan — car |
| `/cache-county-wrongful-death/` | Cache County — wrongful death |
| `/salt-lake-truck-accident/` | Salt Lake County — truck |
| `/salt-lake-car-accident/` | Salt Lake County — car |
| `/ogden-truck-accident/` | Weber & Davis — truck |
| `/ogden-car-accident/` | Weber & Davis — car |
| `/thank-you/` | Post-submit, with backup click-to-call |

## Getting started

```bash
npm run build     # config -> dist/
npm run serve     # build, then preview at http://localhost:8080
npm run check     # build + report launch blockers (non-zero exit if any)
```

No dependencies, no build toolchain. Node 18+.

## Layout

```
src/config/site.js              Firm-wide truth: phones, tracking IDs, proof, bio
src/config/shared/geo.js        Counties: roads, hospitals, cities, locality honesty
src/config/shared/practice-*.js Truck / car / wrongful-death content
src/config/shared/make-page.js  Composes geo x practice into a page
src/config/pages/index.js       The page manifest — add pages here
src/template/                   HTML rendering
src/assets/                     styles.css, lp.js (copied verbatim to dist/)
build.js                        Generator + launch audit
```

### Adding a page

One entry in `src/config/pages/index.js`:

```js
makePage({
  site, geo: 'cache-valley', practice: 'car',
  slug: 'logan-car-accident',
  label: 'Logan Car Accident Lawyer',
  noun: 'car crash',
  overrides: { h1: 'Hurt in a car crash in Logan?' },
})
```

Adding a new county is one entry in `src/config/shared/geo.js` — real roads,
hospitals and towns — plus its pages here. **Do not add a county with placeholder
geography.** A wrong road name is worse than a generic page, because locals notice.

## Tracking

Already wired:

- **GTM** `GTM-KQXMJJPM` — head script + `noscript` iframe on every page
- **Google Ads** `AW-18340419166` — loaded directly as well as via GTM, so a
  container misconfiguration cannot silently stop conversion reporting
- **CallRail number** `(801) 683-4993` on every `tel:` and `sms:` link

`dataLayer` events pushed by `lp.js`, each carrying `gclid`, `gbraid`, `wbraid`,
`msclkid` and all `utm_*` values:

| Event | When |
|---|---|
| `lp_view` | Page load, with attribution attached to the first event |
| `lp_call_click` | Any `tel:` tap, with `cta_location` (`sticky_bar`, `hero`, `header`, `footer`) |
| `lp_text_click` | Any `sms:` tap |
| `lp_form_start` | First keystroke in a form — a soft signal while lead volume is thin |
| `lp_form_submit` | Validated submit, fired **before** the network call resolves |
| `lp_lead_thankyou` | Thank-you page load, for anyone preferring a page-load trigger |

Set the three conversion labels in `site.tracking.conversionLabels` and the pages
also fire `gtag('event', 'conversion')` directly. Leave them empty and only the
`dataLayer` events fire — GTM can still route them, but Ads records nothing on its
own and smart bidding has nothing to optimise toward.

### Lead payload

Every form POST is JSON containing the four fields plus `gclid`, `utm_*`,
`landing_page`, `referrer`, `page_title`, `form_id` and `submitted_at`. That is
what makes cost-per-signed-case knowable rather than guessed.

## Speed to lead

The single highest-leverage number in this whole project is **how fast someone
calls back**, and it is not a code change.

`site.intake.callbackSla` currently promises *"Most calls answered live. Callbacks
usually within 15 minutes."* That string is printed next to every CTA, on the
thank-you page, and inside the FAQ. **If intake cannot hold it, change the string
before launch** — a broken promise on the first screen costs more than a slow one
honestly stated.

`site.formEndpoint` must reach something that texts and calls the lead within five
minutes. A form that lands in an unmonitored inbox will outperform nothing.

## Before you spend money

See **[LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md)**. `npm run check` enforces the
blocking half of it.

## A note on the legal copy

Every statement about Utah or federal law in `src/config/shared/practice-*.js` is a
general statement, written to be accurate, and none of it is legal advice. It has
**not** been reviewed by the attorney. Attorney sign-off and a Utah Rules of
Professional Conduct 7.1–7.3 advertising-compliance pass are both listed as
blockers in the checklist.

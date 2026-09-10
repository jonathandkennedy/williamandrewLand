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
| No Spanish, in a valley with a large Spanish-speaking workforce | Full `/es/` set, written rather than translated, leading on the immigration-status question. |

## Pages

Fourteen landing pages — every ad group in both languages — plus a thank-you
page per language.

| English URL | Spanish URL | Ad group |
|---|---|---|
| `/cache-county-truck-accident/` | `/es/accidente-de-trailer-cache-county/` | Cache County — truck **(flagship)** |
| `/cache-county-car-accident/` | `/es/accidente-de-carro-cache-county/` | Cache County — car |
| `/cache-county-wrongful-death/` | `/es/muerte-por-negligencia-cache-county/` | Cache County — wrongful death |
| `/salt-lake-truck-accident/` | `/es/accidente-de-trailer-salt-lake/` | Salt Lake — truck |
| `/salt-lake-car-accident/` | `/es/accidente-de-carro-salt-lake/` | Salt Lake — car |
| `/ogden-truck-accident/` | `/es/accidente-de-trailer-ogden/` | Weber & Davis — truck |
| `/ogden-car-accident/` | `/es/accidente-de-carro-ogden/` | Weber & Davis — car |
| `/thank-you/` | `/es/gracias/` | Post-submit, with backup click-to-call |

## Spanish

The `/es/` pages are written, not translated. Two things on them have no
English counterpart, because they are what actually stops a Spanish-speaking
crash victim in Utah from calling a lawyer:

- **Immigration status.** The first FAQ on every Spanish page answers it
  plainly: a claim does not depend on status, no SSN or licence is needed, and
  the conversation is confidential. Believing otherwise is the single most
  common reason a real case never gets made.
- **The uninsured passenger.** Extremely common among Cache Valley dairy and
  agricultural crews — no licence, no policy of their own, and the assumption
  that this means no claim.

Wording notes that matter more than they look:

- **"camión" means *bus* in Mexican Spanish.** Utah's Spanish-speaking
  population is largely of Mexican origin, so every reference to a semi says
  *tráiler* or *camión de carga*. The ad group can still bid on "accidente de
  camión"; the page just does not leave it ambiguous.
- **"muerte por negligencia"**, not the calque *muerte injusta*.
- **usted throughout.** A firm that tutea a stranger in crisis sounds junior.

Each page carries `hreflang` for its counterpart and a quiet **Español /
English** toggle in the masthead. Spanish leads reach intake tagged
`[ESPANOL]` in the Formspree subject line, so whoever picks up knows before
they answer. Spanish pages get their own thank-you page, so a Spanish lead is
never dropped onto an English confirmation.

The whole set is gated on `site.intake.spanishStaffed`. Set it to `false` and
the `/es/` pages stop being generated — a Spanish page routing to an
English-only line is worse than no Spanish page.

## Getting started

```bash
npm run build     # config -> dist/
npm run serve     # build, then preview at http://localhost:8080
npm run check     # build + report launch blockers (non-zero exit if any)
```

No dependencies, no build toolchain. Node 18+.

## Layout

```
src/config/site.js              Firm-wide truth: phones, tracking IDs, colours, proof, bio
src/config/shared/geo.js        Counties: roads, hospitals, cities, locality honesty (en + es)
src/config/shared/practice-*.js Truck / car / wrongful-death content, each exporting { en, es }
src/config/shared/strings.js    UI chrome in both languages
src/config/shared/make-page.js  Composes geo x practice x lang; makePair() emits both
src/config/pages/index.js       The page manifest — add pages here
src/template/                   HTML rendering
src/assets/                     styles.css, lp.js (copied verbatim to dist/)
build.js                        Generator + launch audit
```

### Brand colours

All four brand colours live in `site.site.colors` and are emitted into every
page head as CSS custom properties, overriding the stylesheet defaults. Matching
williamandrewslaw.com is a change to that one object and nowhere else.

**The current values are an approximation of the site's navy-and-orange
treatment and have not been sampled from the live site** — the build
environment cannot reach williamandrewslaw.com. Replace them with the real hex
values before launch.

### Adding a page

One entry in `src/config/pages/index.js`:

```js
...makePair({
  site, geo: 'cache-valley', practice: 'car',
  slug: 'logan-car-accident',
  esSlug: 'accidente-de-carro-logan',
  label: 'Logan Car Accident Lawyer',
  esLabel: 'Abogado de Accidentes de Carro en Logan',
  noun: 'car crash',
  esNoun: 'accidente de carro',
  overrides: { h1: 'Hurt in a car crash in Logan?' },
  esOverrides: { h1: '¿Lesionado en un accidente de carro en Logan?' },
})
```

`makePair` emits the English page and its Spanish counterpart, wires the
`hreflang` pair and the language toggle between them, and the build fails if
one half is missing.

Adding a new county is one entry in `src/config/shared/geo.js` — real roads,
hospitals and towns — plus its pages here. **Do not add a county with placeholder
geography.** A wrong road name is worse than a generic page, because locals notice.

## Tracking

Already wired:

- **GTM** `GTM-KQXMJJPM` — head script + `noscript` iframe on every page
- **Google Ads** `AW-18340419166` — loaded directly as well as via GTM, so a
  container misconfiguration cannot silently stop conversion reporting
- **GA4** `G-101ETBCVGH` — loaded through the same `gtag.js`. If GTM also fires
  a GA4 tag with this ID, pageviews double-count; keep it in one place.
- **CallRail** swap script on every page, with `(801) 683-4993` as the fallback
  number on every `tel:` and `sms:` link
- **Formspree** `https://formspree.io/f/mrpgjqan`

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

Every lead also carries `language` (`en` / `es`), so Spanish campaigns can be
measured separately rather than being averaged into the English numbers.

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

`site.formEndpoint` takes the Formspree endpoint (`https://formspree.io/f/xxxxxxxx`).
The client posts JSON with an `Accept: application/json` header — that header is
what makes Formspree answer with JSON instead of redirecting to its own
thank-you page — and sets `_subject` so the alert email reads
`NEW LEAD: José Ramírez - Tráiler o camión de carga - (435) 555-0134 [ESPANOL]`
rather than "New submission".

**Formspree is a notification, not an intake system.** Whatever receives these
has to text and call the lead inside five minutes — a Formspree webhook, or its
Zapier/Make integration into Twilio. A form that lands in an unmonitored inbox
will outperform nothing.

## Before you spend money

See **[LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md)**. `npm run check` enforces the
blocking half of it.

## A note on the legal copy

Every statement about Utah or federal law in `src/config/shared/practice-*.js` is a
general statement, written to be accurate, and none of it is legal advice. It has
**not** been reviewed by the attorney. That applies to both languages, including
the statements about immigration status and claims by uninsured passengers. Attorney sign-off and a Utah Rules of
Professional Conduct 7.1–7.3 advertising-compliance pass are both listed as
blockers in the checklist.

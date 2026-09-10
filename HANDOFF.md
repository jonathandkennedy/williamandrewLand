# William Andrews — PPC landers: deploy & operate

Built on the Goldberg & Loren lander system (see `TEMPLATE.md` in that repo).
Static, dependency-free HTML on Vercel. **96 landers** — 4 case types × 24 Utah
markets — plus a thank-you page, a branded 404, and an internal hub.

```
node parts/build-masters.mjs                     # masters   (after any content/CSS/JS change)
node generate-geo.mjs <master>.html --all        # bake city pages (run for each master)
node generate-kw-test.mjs                        # keyword-test variants
node parts/build-pages.mjs                       # thank-you + 404
node build-hub.mjs && node gen-campaign-urls.mjs # hub + final-URL doc
cd tests && npm i && node form-e2e.mjs && node kw-e2e.mjs   # 94 checks, before every deploy
```

`CHROME_PATH` points the suites at a preinstalled Chromium if you have one.

## What's here

| File | Role |
|---|---|
| `truck-accident.html`, `car-accident.html`, `motorcycle-accident.html`, `wrongful-death.html` | Masters. Generated from `parts/`. |
| `parts/practices.json` / `.es.json` | All practice copy, EN and ES. **Edit here, then re-run build-masters.** |
| `parts/config.json` | Every client token: phones, tags, IDs, stats, reviews, SOL, UI strings. |
| `parts/markets.json` | One entry per market. The only per-city data source. |
| `parts/styles.css`, `parts/app.js` | Inlined into every master. |
| `<practice>-<market>.html` | 96 baked landers. Generated — never hand-edit. |
| `*-kw.html` | Keyword-adaptive test variants. |
| `index.html` | Internal hub. **No analytics on it. Never send ad traffic here.** |
| `thank-you.html` | Fires `lead_form_submit`. Reads `?geo=&ct=&lang=&variant=`. |
| `404.html` | Branded, with a call CTA. Vercel serves it automatically. |
| `CAMPAIGN-URLS-UT.md` | Final-URL reference for whoever builds the campaigns. |

**One deviation from the template**: the masters are generated from `parts/`
rather than hand-edited, because four masters × 13KB of identical CSS is four
places to fix the same bug. The bake step, the file inventory and the runtime
are unchanged. Edit `parts/`, re-run `build-masters.mjs`, re-bake.

## How the form works

Three steps: **case detail → when → name/phone**. Both tap-only questions come
first, so the visitor has answered twice before typing, and the phone number —
the field that decides whether this is a lead at all — comes last.

- **Progressive enhancement.** With JS off, all three steps are visible and the
  form submits normally. Covered by tests.
- **Strict NANP validation.** Rejects 0/1-leading area codes and exchanges, N11
  service codes, and repeated-digit junk. A typed `+1` is normalised away.
- **TCPA consent checkbox blocks submit.** Names the legal entity, covers calls
  and texts by automated means, and states consent is not required to hire.
- **Response-aware submit.** Redirects to thank-you **only on a confirmed 2xx**.
  A failure or a 12-second timeout keeps the visitor on the page, shows the call
  CTA in their language, logs the server's reason to the console, and fires
  `lead_form_error`. The submit button disables while sending.
- Honeypot (`_gotcha`) drops bots silently — Formspree filters it server-side too.

## Spanish

`?lang=es` on any lander swaps text in place from the `#i18n-es` block. One file
serves both languages, so a Spanish campaign is a deep link, not a second page.
The toggle preserves every other query param, so a Spanish click never loses its
`gclid`.

Two things on the Spanish pages have no English counterpart, because they are
what actually stops a Spanish-speaking crash victim in Utah from calling:
**immigration status** (a claim does not depend on it; no SSN or licence needed;
the conversation is confidential) and **the uninsured passenger**.

Wording that matters: **"camión" reads as *bus*** to Mexican Spanish speakers, so
every reference to a semi says *tráiler* or *camión de carga*. Wrongful death is
*muerte por negligencia*, not the calque. Usted throughout.

Keyword insertion is deliberately **skipped** on Spanish pages — the whitelist is
English, and showing the Spanish control headline beats adapting into the wrong
language.

## Tracking

| Event | Where |
|---|---|
| `call_click` | Any `tel:` tap, with `cta_location` and `geo` |
| `lead_form_start` / `lead_form_step` | Form engagement and per-step drop-off |
| `lead_form_submit` | **thank-you.html only** — so a conversion always means a delivered lead |
| `lead_form_error` | Delivery failed; the lead did NOT arrive |
| `lp_404` | Bad final URL |

Every event and every lead carries `gclid`/`gbraid`/`wbraid`/`msclkid`, all
`utm_*`, plus `geo`, `case_type` and `lang`.

**Conversions fire once.** Use the `lead_form_submit` event **or** a
`/thank-you.html` page trigger in GTM — both double-counts.

## Wiring

| Service | State |
|---|---|
| GTM `GTM-KQXMJJPM` | Live on every lander, thank-you and 404. Not on the hub. |
| Google Ads `AW-18340419166` | Live. **Conversion labels not yet created.** |
| GA4 `G-101ETBCVGH` | Loaded via gtag. **Check GTM does not also fire it** or pageviews double-count. |
| CallRail | Swap script live. Needs a Google Ads keyword pool on the production domain. |
| Formspree `mrpgjqan` | Live. Subject tag `WilliamAndrewsPPC`. |
| Clarity | **Not configured.** |

### CallRail
The number on the pages **is** a CallRail number, so calls log even with nothing
else set up. For keyword attribution you need a Google Ads keyword pool on
`results.williamandrewslaw.com` whose "numbers to swap" list contains **every**
number the pages display. Miss one and those pages silently stop swapping.

Verify with `?gclid=test` in incognito: the displayed number **and** the
`tel:` href must both change.

**Four markets are outside the 801 area code** — Logan, St. George, Tooele and
Park City. An out-of-area number on a local lander drags Quality Score. Provision
435 tracking numbers, put them in `parts/markets.json` as `phone` /
`phoneDisplay`, add them to the swap pool, and re-bake.

Keep exactly one swap system. Never run Google's website-call-tracking snippet
alongside CallRail.

### Formspree
Free tier is 50 submissions/month — testing only. For production, pay or point
`FORM_ENDPOINT` at a Zapier/Make webhook into the CRM with instant SMS.
Turn **Formshield ON**; it is the only bot defence on the free tier.

Diagnostics: real leads always carry `WilliamAndrewsPPC` in the subject. Junk
**without** it is bots POSTing the public endpoint directly, not a page problem.
A sub-10-digit phone cannot come from the page at all. If a test "succeeds" but
never appears, check the Spam tab and confirm which Formspree account owns the form.

### Clarity
Not set up. When you create the project, put the ID in `parts/config.json` and
re-run the build. Then: **Settings → Setup → Advanced → Cookies OFF.** Otherwise
Clarity's consent banner sits over the bottom of the page — exactly where the
mobile call CTA lives. On the reference client that banner measurably killed
conversions for a week.

Leave `index.html` untagged.

## Google Ads hygiene

- Max-Clicks needs a CPC cap (~$100–125), or single clicks can hit $650.
- One campaign per city fragments learning — consolidate to metro cores.
- Account-level negative list: competitor brands, jobs, DIY intent.
- Every ad group's final URL is its city lander, never the main site.
- DKI in RSAs only **after** keyword lists are typo- and competitor-clean.
- Target state: three clean primaries — Phone Call (CallRail), Form Capture
  (CallRail), Calls-from-ads >60s. Everything else secondary or deleted.

## Speed to lead

`config.json` promises callbacks "usually within 15 minutes" and "a real person
answers, 24/7", printed next to every CTA. The Google Business Profile shows
24-hour availability, which supports it. **If intake cannot hold it, change the
string before launch** — a broken promise on the first screen costs more than a
smaller one honestly stated.

A five-minute response is roughly 21× more likely to qualify a lead. The page
converts; answering makes cases.

## Before you spend

**Blocking**

- [ ] **Attorney review of the legal copy, both languages.** Every statement about
      Utah or federal law was written to be accurate but has **not** been reviewed.
      That includes the SOL block, the FMCSA/ELD material, Utah comparative fault
      and the no-fault threshold, the immigration-status answer, and the TCPA
      consent wording. Confirm compliance with Utah RPC 7.1–7.3.
- [ ] **Two Google Ads conversion labels** (call, form). Goals → Conversions →
      the action → Tag setup → Use Google Tag Manager. Count: **One**, not Every.
- [ ] **Confirm Formspree's first submission** (a new form holds it pending email
      verification) and add `results.williamandrewslaw.com` to allowed domains.
- [ ] **Wire Formspree onward** to something that calls and texts inside 5 minutes.
- [ ] **Headshot** — drop `will-andrews.jpg` (or `.jpeg`/`.png`/`.webp`, or
      `headshot.jpg`) in the repo root, then re-run `build-masters.mjs` and
      re-bake. Detection is automatic; no config edit. Square crop, 256px+ on
      the short edge, under ~150KB. It renders in "Who you are calling",
      **never** behind the headline — spending the mobile fold on a portrait
      is what made the old geo pages fail.

**Then**

- [ ] Clarity project + cookies OFF.
- [ ] Google reviews deep link → `REVIEW_URL` in `parts/config.json`.
- [ ] 435 tracking numbers for Logan, St. George, Tooele, Park City.
- [ ] Confirm the privacy, terms and Do-Not-Sell URLs resolve.
- [ ] Confirm GTM does not already fire GA4 `G-101ETBCVGH`.

## Launch QA — every deploy

- [ ] `tests/` green: `node form-e2e.mjs && node kw-e2e.mjs`
- [ ] On a real phone: junk phone rejected; real submit reaches thank-you **and**
      appears in Formspree; failure path shows the call CTA
- [ ] `?gclid=test` swaps the displayed number **and** the `tel:` href
- [ ] `?lang=es` renders Spanish end to end, including error messages
- [ ] GTM preview shows `call_click` and `lead_form_submit` with `case_type`/`geo`
- [ ] Clarity recording appears, with **no** consent banner
- [ ] A bad URL shows the branded 404 with a working call button
- [ ] Every campaign final URL returns 200 — no ad group pointing at a missing page
- [ ] Formspree notification lands in the 24/7 intake inbox

## Deploy

```bash
npx vercel --prod
```

Then attach `results.williamandrewslaw.com` (CNAME → `cname.vercel-dns.com`).

**Never run ads to a `*.vercel.app` URL.** It is not the client's domain, it
splits CallRail's swap pool, and it looks like what it is.

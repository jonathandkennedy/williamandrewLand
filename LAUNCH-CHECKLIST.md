# Launch checklist

Work top to bottom. Everything in **Blockers** must be done before a single
click is bought. `npm run check` enforces the machine-checkable ones and exits
non-zero while any remain.

---

## Blockers — do not run paid traffic until these are done

### 1. Attorney review of the legal copy — both languages
Every statement about Utah or federal law in `src/config/shared/practice-truck.js`,
`practice-car.js` and `practice-wrongful-death.js` was written to be accurate but
has **not** been reviewed by the attorney. It covers: FMCSA hours-of-service and
driver-qualification files, ECM/ELD retention, federal carrier insurance minimums,
Utah comparative fault and its 50% bar, Utah no-fault/PIP and the tort threshold,
and wrongful-death filing deadlines and standing.

**The Spanish pages need their own pass, not a spot-check.** They make two
claims the English pages do not:

- that immigration status does not affect the right to bring an injury or
  wrongful death claim in Utah, that no SSN or driver's licence is required,
  and that the conversation is confidential;
- that an uninsured, unlicensed passenger can still recover, typically under
  the host vehicle's or the at-fault party's coverage.

Both are stated as general information and both are load-bearing — they are the
reason those pages will convert. Confirm the phrasing is one the firm will
stand behind, and that `legal.disclaimerEs` is adequate as a Spanish
disclaimer rather than a courtesy translation of the English one.

Separately confirm the pages comply with Utah Rules of Professional Conduct
7.1–7.3 on lawyer advertising — including whether the "no fee unless we win" /
"si no ganamos, usted no paga" phrasing needs a costs disclaimer in Utah, in
both languages.

### 2. Form endpoint — `site.formEndpoint`
Empty today. Submissions fail closed: the visitor is shown *"That did not go
through. Please call…"* rather than a false success, so no lead is silently
swallowed — but no form lead is captured either.

Point it at something that **texts and calls the lead within five minutes**:
a CallRail Form endpoint, a Zapier/Make hook into Twilio, or the firm's CRM intake
webhook. It receives JSON; see the lead payload section in the README.

### 3. CallRail swap script — `site.tracking.callRailSwapScript`
Empty today. The number `(801) 683-4993` is hardcoded and calls will connect, but
without the swap script no call can be attributed to a campaign or keyword — so
cost-per-call is unknowable and bidding is blind.

CallRail → Settings → Integrations → JavaScript Snippet.

### 4. Google Ads conversion labels — `site.tracking.conversionLabels`
All three empty (`call`, `text`, `formSubmit`). Ads → Goals → Conversions; each
label is the part after the slash in `AW-18340419166/XXXXXXXX`.

Create three conversion actions:
- **Phone call from LP** — primary
- **Text from LP** — primary
- **Form submit from LP** — primary

Until these exist, smart bidding has nothing to optimise toward.

### 5. Confirm the SMS number is real and monitored
`site.phones.sms` currently mirrors the CallRail number. Confirm it is
SMS-enabled and that inbound texts reach a device someone actually watches at
9pm. **A text link into a dead inbox is worse than no text link** — it converts
an interested person into an ignored one.

### 6. Brand colours — `site.site.colors`
The four hex values currently in config are an **approximation** of the site's
navy-and-orange treatment. They were not sampled from williamandrewslaw.com,
because the build environment cannot reach it.

Take the real values off the live site (ink / mid navy / accent orange /
pressed orange) and put them in `site.site.colors`. They are emitted as CSS
custom properties into every page head, so this one object is the only place
that needs changing.

### 7. Confirm Spanish intake coverage — `site.intake.es`
`spanishStaffed` is **true**, so the seven `/es/` pages are live.

`intake.es` currently promises *"Contestamos las 24 horas"* and a callback in
about 15 minutes — the same coverage the English pages promise. That string is
printed next to every CTA on the Spanish pages.

If Spanish coverage is narrower than English — business hours only, or one
bilingual person rather than the whole desk — **narrow `intake.es` before
launch**. A Spanish page that promises 24-hour Spanish and delivers voicemail
in English is worse than no Spanish page, and the people it fails are the ones
least likely to call a second firm.

Also confirm: Spanish-tagged Formspree alerts reach a Spanish speaker, and
inbound Spanish SMS does too.

### 8. Verify the review count — `site.reviews.count`
Shows `4.7 / 46 reviews` from public sources. Confirm against the live Google
Business Profile, then set `reviews.countVerifiedOn`. Re-check quarterly; a stale
count is a credibility leak on a page whose whole argument is verifiability.

### 9. Delete the YouTube "review" from the existing site
> *"not my lawyer but i just saw the most incredible advertisement on youtube…"*

It is not in this repo and never will be. It is still on the live site next to
real-sounding reviews, which tells a skeptical visitor the social proof is staged.
Remove it today — it costs money on every page it appears on.

---

## Strongly recommended before scaling spend

### Google review deep link — `site.reviews.profileUrl`
Without it the rating shows as text with no clickable source. With it, the count
becomes checkable, which is the entire point.

### Three real reviews — `site.reviews.quotes`
Empty, so the section is omitted rather than filled with invented quotes. Pick
three that mention **the injury, the communication, and the outcome**. Shape:

```js
{ quote: '…', name: 'First L.', source: 'Google', matter: 'Truck crash, Logan' }
```

### Two to four specific results — `site.results`
Empty, so the section is omitted. "Millions won" persuades nobody who is already
skeptical; `$1.05M — wrongful death, semi, 2021` does. Shape:

```js
{ amount: '$1.05M', injury: 'Wrongful death', vehicle: 'Semi', year: '2021' }
```
Confirm each is disclosable and that the disclaimer in `site.legal.disclaimer` is
adequate for Utah.

### Attorney photo — `site.bio.photo`
Drop a clean headshot in `src/assets/img/` and set the path. It renders in
"Who you are calling" — **never** behind the headline.

### Utah Bar number — `site.firm.barNumber`
Prints in the footer next to a link to the Bar directory. Cheap verifiability.

---

## Campaign wiring

- [ ] Point each ad group at its **own** URL from the table in the README. Sending
      a "Cache County truck" click to a general injury page pays a premium for a
      worse conversion rate.
- [ ] Run Spanish as **separate campaigns**, not as extra keywords in the English
      ones. Different ad copy, different bids, and the `/es/` final URL. Set
      language targeting to Spanish, and remember Google targets by browser and
      account language, so keep the geo layer the same as the English campaigns.
- [ ] Segment reporting by the `language` field on every lead so Spanish
      cost-per-case is visible rather than averaged into the English numbers.
- [ ] Final URLs need the trailing slash: `…/cache-county-truck-accident/`
- [ ] Enable auto-tagging in Google Ads so `gclid` reaches the lead record.
- [ ] Turn on call extensions using the CallRail number, not the 801-322 line.
- [ ] Confirm `results.williamandrewslaw.com` DNS points at the host, HTTPS is on,
      and `robots.txt` disallows everything (the build writes it).
- [ ] Check the main site does **not** link to these URLs — they must stay out of
      the index so they never compete with organic pages for the same terms.

## Verification pass before enabling campaigns

- [ ] Load each page on a real phone over cellular, not desktop devtools.
- [ ] Tap Call from the sticky bar. Confirm it rings a human, and confirm the call
      appears in CallRail against the right campaign.
- [ ] Tap Text. Send one. Confirm it arrives and someone replies.
- [ ] Submit the form. Confirm the lead lands in Formspree **with `gclid`
      attached**, and time how long the callback actually takes.
- [ ] Submit one from a `/es/` page. Confirm the alert carries `[ESPANOL]`, that
      it routes to a Spanish speaker, and that the callback is in Spanish.
- [ ] Tap the language toggle both ways on a phone and confirm neither direction
      404s.
- [ ] Confirm GTM Preview shows `lp_view`, `lp_call_click`, `lp_form_submit`.
- [ ] Confirm Ads shows the three conversions within 24 hours of a test.

---

## What to test first, once traffic is running

In this order. Do not test button colours while anything above is unfinished.

1. **Hero form vs call-only hero** — does the form help or distract on mobile?
2. **Sticky bar copy** — "Call Now" vs "Talk to a lawyer now".
3. **Honest-locality line vs keyword H1** — the biggest open question on the Cache
   County pages, and the one worth the most.
4. **Callback SLA on the button** — "usually within 15 minutes" vs no promise.
5. **"First 72 hours" block placement** — above vs below the proof block.
6. **Incident dropdown options** — whether "Not sure" absorbs volume or leaks it.
7. **The immigration FAQ's position on the Spanish pages** — currently first in
   the FAQ block. Worth testing as a visible line in the hero, since it is the
   objection doing the most work.

## Deliberately not built

- **Live chat.** Only worth adding if it is staffed, not botted — and if it is
  staffed in both languages.
- **A map embed.** Would need a real Google Maps key and adds third-party weight
  to the fold. The locality block carries the same information in text.

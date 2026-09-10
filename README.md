# William Andrews — PPC landers

Static, dependency-free HTML landers for **William Enoch Andrews Injury Lawyer, PC**,
deployed on Vercel at `results.williamandrewslaw.com`.

**96 landers** — 4 case types × 24 Utah markets — each a single self-contained
file with its CSS, JS, geo data and Spanish translations inline. No framework,
no runtime dependency, nothing to break.

> **Operating doc: [HANDOFF.md](HANDOFF.md)** — wiring, service settings, the
> pre-spend checklist and launch QA.
> **Final URLs: [CAMPAIGN-URLS-UT.md](CAMPAIGN-URLS-UT.md)** — hand this to
> whoever builds the campaigns.

## Build

```bash
node parts/build-masters.mjs                     # masters from parts/
node generate-geo.mjs truck-accident.html --all  # bake city pages (per master)
node generate-kw-test.mjs                        # keyword-test variants
node parts/build-pages.mjs                       # thank-you + 404
node build-hub.mjs && node gen-campaign-urls.mjs # hub + URL doc
```

## Test

```bash
cd tests && npm i && node form-e2e.mjs && node kw-e2e.mjs
```

94 checks: step flow, NANP phone validation, TCPA consent blocking, honeypot,
submit success **and** failure paths, Spanish end to end including error copy,
the compliance block, no-JS fallback, the branded 404, and keyword-insertion
against hostile input. Run before every deploy.

## Adding a market

One entry in `parts/markets.json`, then re-bake and regenerate the hub and URL
doc. Only claim an office that exists — a far-away street address on a city
lander drags Quality Score, so every market except Salt Lake City uses the
"Serving X" pattern.

## Adding a case type

One entry in `parts/practices.json` **and** `parts/practices.es.json` — the
build fails loudly if the two drift — then re-run the build. Geo data carries
over unchanged.

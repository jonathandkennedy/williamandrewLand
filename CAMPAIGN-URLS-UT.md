# Campaign final URLs — Utah

4 case types × 24 markets = **96 landers**.
Regenerate with `node gen-campaign-urls.mjs` after adding a market or case type.

- **Every ad group's final URL is its city lander.** Never the main site, never the hub at `/`.
- **Keep the `.html`.** These are static files; there is no extensionless rewrite.
- **Spanish** is the same URL with `?lang=es`, run as its own campaign with Spanish language targeting — not as extra keywords in the English ones.
- **Consolidate campaigns to metro cores.** The landers are per-city; the campaigns should not be, or the learning phase never finishes.
- Make the lander **before** the ad group goes live. A live ad group pointing at a page that was never baked spends real money on a 404.

## Salt Lake County

| City | truck accident | car accident | motorcycle accident | wrongful death |
|---|---|---|---|---|
| Salt Lake City *(office)* | `/truck-accident-salt-lake-city-ut.html` | `/car-accident-salt-lake-city-ut.html` | `/motorcycle-accident-salt-lake-city-ut.html` | `/wrongful-death-salt-lake-city-ut.html` |
| West Valley City | `/truck-accident-west-valley-city-ut.html` | `/car-accident-west-valley-city-ut.html` | `/motorcycle-accident-west-valley-city-ut.html` | `/wrongful-death-west-valley-city-ut.html` |
| West Jordan | `/truck-accident-west-jordan-ut.html` | `/car-accident-west-jordan-ut.html` | `/motorcycle-accident-west-jordan-ut.html` | `/wrongful-death-west-jordan-ut.html` |
| South Jordan | `/truck-accident-south-jordan-ut.html` | `/car-accident-south-jordan-ut.html` | `/motorcycle-accident-south-jordan-ut.html` | `/wrongful-death-south-jordan-ut.html` |
| Sandy | `/truck-accident-sandy-ut.html` | `/car-accident-sandy-ut.html` | `/motorcycle-accident-sandy-ut.html` | `/wrongful-death-sandy-ut.html` |
| Murray | `/truck-accident-murray-ut.html` | `/car-accident-murray-ut.html` | `/motorcycle-accident-murray-ut.html` | `/wrongful-death-murray-ut.html` |
| Taylorsville | `/truck-accident-taylorsville-ut.html` | `/car-accident-taylorsville-ut.html` | `/motorcycle-accident-taylorsville-ut.html` | `/wrongful-death-taylorsville-ut.html` |
| Millcreek | `/truck-accident-millcreek-ut.html` | `/car-accident-millcreek-ut.html` | `/motorcycle-accident-millcreek-ut.html` | `/wrongful-death-millcreek-ut.html` |
| Draper | `/truck-accident-draper-ut.html` | `/car-accident-draper-ut.html` | `/motorcycle-accident-draper-ut.html` | `/wrongful-death-draper-ut.html` |
| Riverton | `/truck-accident-riverton-ut.html` | `/car-accident-riverton-ut.html` | `/motorcycle-accident-riverton-ut.html` | `/wrongful-death-riverton-ut.html` |
| Herriman | `/truck-accident-herriman-ut.html` | `/car-accident-herriman-ut.html` | `/motorcycle-accident-herriman-ut.html` | `/wrongful-death-herriman-ut.html` |

## Davis County

| City | truck accident | car accident | motorcycle accident | wrongful death |
|---|---|---|---|---|
| Bountiful | `/truck-accident-bountiful-ut.html` | `/car-accident-bountiful-ut.html` | `/motorcycle-accident-bountiful-ut.html` | `/wrongful-death-bountiful-ut.html` |
| Layton | `/truck-accident-layton-ut.html` | `/car-accident-layton-ut.html` | `/motorcycle-accident-layton-ut.html` | `/wrongful-death-layton-ut.html` |
| Clearfield | `/truck-accident-clearfield-ut.html` | `/car-accident-clearfield-ut.html` | `/motorcycle-accident-clearfield-ut.html` | `/wrongful-death-clearfield-ut.html` |

## Weber County

| City | truck accident | car accident | motorcycle accident | wrongful death |
|---|---|---|---|---|
| Ogden | `/truck-accident-ogden-ut.html` | `/car-accident-ogden-ut.html` | `/motorcycle-accident-ogden-ut.html` | `/wrongful-death-ogden-ut.html` |
| Roy | `/truck-accident-roy-ut.html` | `/car-accident-roy-ut.html` | `/motorcycle-accident-roy-ut.html` | `/wrongful-death-roy-ut.html` |

## Utah County

| City | truck accident | car accident | motorcycle accident | wrongful death |
|---|---|---|---|---|
| Provo | `/truck-accident-provo-ut.html` | `/car-accident-provo-ut.html` | `/motorcycle-accident-provo-ut.html` | `/wrongful-death-provo-ut.html` |
| Orem | `/truck-accident-orem-ut.html` | `/car-accident-orem-ut.html` | `/motorcycle-accident-orem-ut.html` | `/wrongful-death-orem-ut.html` |
| Lehi | `/truck-accident-lehi-ut.html` | `/car-accident-lehi-ut.html` | `/motorcycle-accident-lehi-ut.html` | `/wrongful-death-lehi-ut.html` |
| Spanish Fork | `/truck-accident-spanish-fork-ut.html` | `/car-accident-spanish-fork-ut.html` | `/motorcycle-accident-spanish-fork-ut.html` | `/wrongful-death-spanish-fork-ut.html` |

## Cache County

| City | truck accident | car accident | motorcycle accident | wrongful death |
|---|---|---|---|---|
| Logan | `/truck-accident-logan-ut.html` | `/car-accident-logan-ut.html` | `/motorcycle-accident-logan-ut.html` | `/wrongful-death-logan-ut.html` |

## Washington County

| City | truck accident | car accident | motorcycle accident | wrongful death |
|---|---|---|---|---|
| St. George | `/truck-accident-st-george-ut.html` | `/car-accident-st-george-ut.html` | `/motorcycle-accident-st-george-ut.html` | `/wrongful-death-st-george-ut.html` |

## Tooele County

| City | truck accident | car accident | motorcycle accident | wrongful death |
|---|---|---|---|---|
| Tooele | `/truck-accident-tooele-ut.html` | `/car-accident-tooele-ut.html` | `/motorcycle-accident-tooele-ut.html` | `/wrongful-death-tooele-ut.html` |

## Summit County

| City | truck accident | car accident | motorcycle accident | wrongful death |
|---|---|---|---|---|
| Park City | `/truck-accident-park-city-ut.html` | `/car-accident-park-city-ut.html` | `/motorcycle-accident-park-city-ut.html` | `/wrongful-death-park-city-ut.html` |

## Keyword-insertion test landers

Final URL: `https://results.williamandrewslaw.com/<page>-kw.html?kw={keyword}`

Whitelist only — an unrecognised keyword renders the control headline unchanged, so any
traffic is safe. Leads arrive tagged `variant: "kw-test"` with the sanitised keyword.
Evaluate on landing-page-experience Quality Score and conversion rate after 2–3 weeks.

- `/car-accident-provo-ut-kw.html`
- `/car-accident-salt-lake-city-ut-kw.html`
- `/motorcycle-accident-salt-lake-city-ut-kw.html`
- `/truck-accident-logan-ut-kw.html`
- `/truck-accident-salt-lake-city-ut-kw.html`

## Base URLs

| Purpose | URL |
|---|---|
| Production | `https://results.williamandrewslaw.com/` |
| Review hub (**no ad traffic**) | `https://results.williamandrewslaw.com/index.html` |
| Thank-you | `https://results.williamandrewslaw.com/thank-you.html` |
| 404 | `https://results.williamandrewslaw.com/404.html` |

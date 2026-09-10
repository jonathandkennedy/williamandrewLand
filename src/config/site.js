/**
 * Firm-wide configuration.
 *
 * Two kinds of values live here:
 *   VERIFIED  - checked against public sources. Safe to ship.
 *   SUPPLY    - the firm must confirm or provide before paid traffic runs.
 *               Anything left empty is omitted from the page rather than
 *               guessed at. `npm run check` lists what is still missing.
 *
 * Rule of the file: we never invent proof. A missing testimonial costs less
 * than a fabricated one.
 */

module.exports = {
  firm: {
    // VERIFIED
    legalName: 'William Enoch Andrews Injury Lawyer, PC',
    shortName: 'William Andrews Injury Lawyer',
    attorney: 'William Andrews',
    attorneyFirstName: 'Will',
    admittedYear: 2004,
    address: {
      street: '299 S Main St, Suite 1310',
      city: 'Salt Lake City',
      state: 'UT',
      zip: '84111',
    },
    // SUPPLY - Utah State Bar number. Printed in the footer as a
    // verifiability signal. Leave empty to omit.
    barNumber: '',
    barProfileUrl: 'https://services.utahbar.org/Member-Directory',
  },

  phones: {
    /**
     * PPC tracking number (CallRail). This is what every paid page shows.
     * Keeping paid traffic on its own number is what makes cost-per-call
     * attributable at the campaign level.
     */
    tracking: { display: '(801) 683-4993', e164: '+18016834993' },

    /**
     * Main office line. Not shown on paid pages - it is here so the
     * thank-you page and any organic fallback can use it.
     */
    main: { display: '(801) 322-4878', e164: '+18013224878' },

    /**
     * SMS destination. MUST be a monitored mobile or a CallRail SMS-enabled
     * number. A texting link into a dead inbox is worse than no link.
     * Defaults to the tracking number; override once CallRail SMS is on.
     */
    sms: { display: '(801) 683-4993', e164: '+18016834993' },
  },

  /**
   * Intake promise. These strings appear next to the CTAs, so they are a
   * commitment, not marketing. Change them to match what intake can
   * actually do at 9:40pm on a Saturday.
   */
  intake: {
    callbackSla: 'Most calls answered live. Callbacks usually within 15 minutes.',
    hours: 'Answered 24/7',
    whoAnswers: 'A person, not a robot menu.',

    /**
     * Spanish intake is staffed, so the /es/ pages are live.
     *
     * The promises below are printed next to every CTA on the Spanish pages.
     * CONFIRMED 2026-09-10: Spanish coverage matches English - 24/7, with the
     * same callback target - so these mirror the English strings.
     *
     * If that ever stops being true, narrow these first. A broken promise on
     * the first screen costs more than a smaller one honestly stated, and the
     * people it fails are the least likely to call a second firm.
     */
    esCoverageConfirmedOn: '2026-09-10',
    spanishStaffed: true,
    es: {
      callbackSla: 'Casi todas las llamadas se contestan en persona. Le devolvemos la llamada en unos 15 minutos.',
      hours: 'Contestamos las 24 horas',
      whoAnswers: 'Le contesta una persona, no una grabadora.',
    },
  },

  tracking: {
    gtmId: 'GTM-KQXMJJPM',
    googleAdsId: 'AW-18340419166',
    /**
     * SUPPLY - conversion labels from Google Ads > Goals > Conversions.
     * Each is the part after the slash in "AW-18340419166/XXXXXXXX".
     * Empty labels degrade gracefully: the dataLayer event still fires for
     * GTM, only the direct gtag conversion is skipped.
     */
    conversionLabels: {
      call: '',
      text: '',
      formSubmit: '',
    },
    /**
     * GA4. Loaded through the same gtag.js as Google Ads.
     *
     * If the GTM container ALSO fires a GA4 tag with this same Measurement
     * ID, every page will be counted twice. Check the container before
     * launch and keep GA4 in exactly one place - here, or in GTM, not both.
     */
    ga4Id: 'G-101ETBCVGH',

    /**
     * CallRail swap script (Settings > Integrations > JavaScript Snippet).
     * This is what performs dynamic number insertion, so calls can be
     * attributed to a campaign and a keyword rather than just counted.
     */
    callRailSwapScript: '//cdn.calltrk.com/companies/256973679/8a1f48423ee6fe69df6b/12/swap.js',
  },

  /**
   * SUPPLY - the live Google Business Profile review link and the real
   * review count. A star rating without a denominator reads as a dodge.
   * Public sources showed 4.7 from ~46 reviews; confirm before launch
   * because the count moves and a stale number is a credibility leak.
   */
  reviews: {
    rating: 4.7,
    count: 46,
    countVerifiedOn: '', // e.g. '2026-09-10'
    profileUrl: '', // deep link to the Google reviews tab
    /**
     * Real client reviews only. Each needs: injury context, something about
     * communication, and an outcome. Reviews that only praise the ads are
     * removed on sight - they signal staged proof.
     * Shape: { quote, name, source: 'Google', matter }
     */
    quotes: [],
  },

  /**
   * SUPPLY - past results. Each needs a disclaimer-safe shape:
   * { amount, injury, vehicle, venue, year }
   * "Millions won" with no numbers persuades nobody who is already skeptical.
   */
  results: [],

  /**
   * VERIFIED biography facts. The karate background is real and distinctive,
   * but it is a supporting colour note here, never the headline.
   */
  bio: {
    education: 'Weber State University (B.S.), University of Iowa College of Law (J.D.)',
    memberships: ['The National Trial Lawyers, Top 100'],
    colour:
      'Two black belts - Korean Tae Kwon-Do, earned in Seoul, and Japanese Shotokan.',
    // SUPPLY - path to a clean headshot, placed in src/assets/img/.
    // Used in the "who you are calling" block, never behind the headline.
    photo: '',
  },

  legal: {
    /**
     * The Spanish disclaimer is a parallel legal statement, not a courtesy
     * translation - it carries the same weight on the /es/ pages that the
     * English one carries here, and needs the same attorney review.
     */
    disclaimerEs:
      'Los resultados anteriores no garantizan un resultado similar. Cada caso depende de sus ' +
      'propios hechos. Enviar este formulario no crea una relación abogado-cliente y no nos ' +
      'convierte en sus abogados. No envíe información confidencial hasta que hayamos aceptado ' +
      'por escrito representarlo.',
    disclaimer:
      'Past results do not guarantee a similar outcome. Every case turns on its own facts. ' +
      'Submitting this form does not create an attorney-client relationship and does not ' +
      'make us your lawyers. Do not send confidential information until we have agreed in ' +
      'writing to represent you.',
    /**
     * SUPPLY - these paths were inferred from the main site's structure and
     * have NOT been confirmed to resolve; this environment cannot reach that
     * host. Google Ads wants a working privacy policy, and a dead footer link
     * on a page collecting personal details is a bad look either way.
     * Open both, correct if needed, then date linksVerifiedOn.
     */
    privacyUrl: 'https://www.williamandrewslaw.com/privacy-policy/',
    termsUrl: 'https://www.williamandrewslaw.com/terms-of-use/',
    linksVerifiedOn: '',
  },

  /**
   * SUPPLY - Formspree endpoint, e.g. 'https://formspree.io/f/xxxxxxxx'.
   *
   * The client sends JSON with an `Accept: application/json` header, which is
   * what makes Formspree answer with JSON instead of a 302 to its own
   * thank-you page. It also sends `_subject`, so the notification email is
   * scannable at a glance rather than every lead reading "New submission".
   *
   * Formspree alone is a notification, not an intake system. Whatever
   * receives these has to text and call the lead inside five minutes - a
   * Formspree webhook or its Zapier/Make integration into Twilio. Speed to
   * lead beats every copy change on this page.
   *
   * Left empty, the form fails closed: the visitor is told to call rather
   * than shown a false success, and the lead is logged to the console.
   */
  formEndpoint: 'https://formspree.io/f/mrpgjqan',

  site: {
    // Canonical origin for the landing-page subdomain.
    origin: 'https://results.williamandrewslaw.com',

    /**
     * SUPPLY - brand palette, to match williamandrewslaw.com exactly.
     *
     * These are emitted as CSS custom properties into every page head and
     * override the stylesheet defaults, so matching the main site is a change
     * here and nowhere else. The values below are an approximation taken from
     * the site's dark-navy-and-orange treatment; they have NOT been sampled
     * from the live site. Replace with the real hex values.
     *
     *   ink       darkest brand navy - hero, footer, headings
     *   inkMid    one step lighter, used in the hero gradient
     *   accent    the orange on the call buttons
     *   accentDark  pressed/shadow state of the accent
     */
    // Date this once the hex values below are the real ones.
    colorsVerifiedOn: '',
    colors: {
      ink: '#0B1524',
      inkMid: '#23344F',
      accent: '#F26B21',
      accentDark: '#CF560F',
    },
  },
};

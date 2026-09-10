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
    // Utah State Bar ID. Printed in the footer as a verifiability signal.
    barNumber: '10032',
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
   * Rating and count read off the live Google Business Profile on
   * 2026-09-10. Re-check quarterly: the count moves, and a stale number on a
   * page whose whole argument is verifiability is a credibility leak.
   */
  reviews: {
    rating: 4.7,
    count: 48,
    countVerifiedOn: '2026-09-10',
    /**
     * SUPPLY - deep link to the reviews tab of the Google Business Profile.
     * Without it the count renders as plain text rather than something the
     * visitor can click and check, which is the entire point of showing it.
     */
    profileUrl: '',
    /**
     * Real reviews, transcribed verbatim from the Google profile. Nothing here
     * is paraphrased or trimmed for punchiness - editing a review is the same
     * class of mistake as inventing one.
     *
     * Chosen for what each one carries: the first speaks to results, the
     * second to how he treats a family in crisis, the third names being in an
     * accident. Between them they cover the three things a skeptical reader
     * checks for.
     */
    quotes: [
      {
        quote:
          'Will Andrews is extremely knowledgeable and helpful. He is detail oriented and will ' +
          'take care of you and your loved ones if you have been in an accident. Can\'t ' +
          'recommend him enough!',
        name: 'Bryton Wells',
        source: 'Google',
        matter: '',
      },
      {
        quote:
          'Will is incredible! He deeply cares to take care of you and your family when some of ' +
          'the worst things happen to you. I can\'t recommend him enough!',
        name: 'Bryce Burnham',
        source: 'Google',
        matter: '',
      },
      {
        quote:
          'I\'ve found Will Andrews to be a good and honorable attorney. He\'s intelligent, ' +
          'thoughtful, and works hard for the best interests of his clients. He will get great ' +
          'results! I highly recommend him in all personal injury matters!',
        name: 'Lane Clark',
        source: 'Google',
        matter: '',
      },
    ],
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
    /**
     * Leave empty. The build looks for src/assets/img/will-andrews.{jpg,jpeg,png,webp}
     * and wires it automatically, so adding the headshot is a matter of
     * dropping the file in - no config edit. Set a path here only to override
     * that. Used in the "who you are calling" block, never behind the headline.
     */
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
     * Brand palette: black, red and white, read off the homepage.
     *
     * These are emitted as CSS custom properties into every page head and
     * override the stylesheet defaults, so the whole palette is this one
     * object.
     *
     *   ink        the black of the site's nav bar - hero, masthead, footer
     *   inkMid     one step lifted, so the hero is not a flat black slab
     *   accent     the brand red - call buttons, rules, step numbers
     *   accentDark pressed state, and the shadow under the call button
     *   accentTint light warm tint for the second headline line on black
     *
     * The red was eyedropped from a screenshot of the homepage rather than
     * sampled from the stylesheet, because this environment cannot reach the
     * host. It is close, not exact - if the firm has the real value, drop it
     * in. Worth knowing: white on this red is 4.63:1, comfortably over the
     * 3:1 a UI component needs, so the call button keeps white text.
     */
    colorsVerifiedOn: '2026-09-10',
    colors: {
      ink: '#000000',
      inkMid: '#1C1C1C',
      accent: '#E02B1D',
      accentDark: '#A81C12',
      accentTint: '#FFCFC9',
    },
  },
};

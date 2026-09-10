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
    // Set true only when a Spanish speaker actually staffs the line.
    spanishStaffed: false,
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
     * SUPPLY - CallRail swap script. Found in CallRail under
     * Settings > Integrations > JavaScript Snippet. Without it, dynamic
     * number insertion cannot attribute calls to keyword/campaign.
     * Example: '//cdn.callrail.com/companies/123456789/abcdef0123456789/12/swap.js'
     */
    callRailSwapScript: '',
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
    disclaimer:
      'Past results do not guarantee a similar outcome. Every case turns on its own facts. ' +
      'Submitting this form does not create an attorney-client relationship and does not ' +
      'make us your lawyers. Do not send confidential information until we have agreed in ' +
      'writing to represent you.',
    privacyUrl: 'https://www.williamandrewslaw.com/privacy-policy/',
    termsUrl: 'https://www.williamandrewslaw.com/terms-of-use/',
  },

  /**
   * SUPPLY - where the form POSTs. Must reach a system that can text and
   * call the lead inside five minutes. Options that work: a CallRail Form
   * endpoint, a Zapier/Make catch hook wired to Twilio, or the firm's CRM
   * intake webhook.
   * Leave empty and the form falls back to a mailto-style warning in the
   * console plus a hard nudge to call - it will not silently swallow leads.
   */
  formEndpoint: '',

  site: {
    // Canonical origin for the landing-page subdomain.
    origin: 'https://results.williamandrewslaw.com',
    brandColor: '#0B1524',
    accentColor: '#F26B21',
  },
};

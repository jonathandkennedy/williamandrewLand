const { makePair, geos } = require('../shared/make-page');

/**
 * The page manifest.
 *
 * One URL per ad group. The rule: if the ad says a word, the H1 says the
 * same word. Sending a "Cache County truck" click to a general Utah injury
 * page is how you pay a premium for a worse conversion rate.
 *
 * Adding a page is a single entry here. Adding a county is one entry in
 * shared/geo.js plus its pages here.
 *
 * Each entry produces an English page and, while site.intake.spanishStaffed
 * is true, a Spanish counterpart under /es/. The two cross-link and declare
 * hreflang for each other.
 */
module.exports = (site) => {
  const cache = geos['cache-valley'];

  return [
    /* ------------------------------------------------------------------
       FLAGSHIP. This is the page the current /cache-county-truck-accident-
       lawyer/ URL should be replaced with for paid traffic. Copy is written
       by hand rather than generated, because it carries the most spend.
       ------------------------------------------------------------------ */
    ...makePair({
      site,
      geo: 'cache-valley',
      practice: 'truck',
      slug: 'cache-county-truck-accident',
      esSlug: 'accidente-de-trailer-cache-county',
      label: 'Cache County Truck Accident Lawyer',
      noun: 'truck crash',
      esLabel: 'Abogado de Accidentes de Tráiler en Cache County',
      esNoun: 'accidente de tráiler',
      overrides: {
        title: 'Cache County Truck Accident Lawyer | Free Case Review',
        metaDescription:
          'Hurt in a truck crash in Logan or Cache Valley? Talk to a Utah truck accident ' +
          'attorney tonight. Free, no fee unless we win. We come to you in the valley.',
        h1: 'Injured in a Cache County truck crash?',
        h1Line2: ' Talk to a Utah truck accident lawyer tonight.',
        subhead:
          'Free. No fee unless we win. The trucking company started building its file the day ' +
          'of the crash. You should have someone building yours.',
        localityHtml:
          `<strong>Our office is in Salt Lake City, not Logan.</strong> We would rather say so ` +
          `than have you find out. We drive up to Cache Valley — Logan Regional, or your ` +
          `kitchen table in Hyrum or Smithfield.`,
        formSub: 'Four questions, about thirty seconds. Or just call — it is faster.',
        detailPlaceholder: 'e.g. US-91 near Wellsville, last Tuesday',
        proofLede:
          'Everything below is checkable. The rating links to Google, the bar record links to ' +
          'the Utah State Bar, and the address is a real office you can walk into.',
        closingHeading: 'One call, and you will know where you stand',
        closingLede:
          'You are not committing to anything by calling. If the honest answer is that you do ' +
          'not need a lawyer, that is what you will hear.',
        serviceAreaNote:
          `Salt Lake City office, ${cache.driveFromOffice}. ${cache.honesty.meeting}`,
      },
    }),

    /* ------------------------------------------------------------------
       Cache Valley - car. Same geography, different evidence problem, so
       it gets its own URL rather than sharing the truck page.
       ------------------------------------------------------------------ */
    ...makePair({
      site,
      geo: 'cache-valley',
      practice: 'car',
      slug: 'cache-county-car-accident',
      esSlug: 'accidente-de-carro-cache-county',
      label: 'Cache County Car Accident Lawyer',
      noun: 'car crash',
      esLabel: 'Abogado de Accidentes de Carro en Cache County',
      esNoun: 'accidente de carro',
      overrides: {
        title: 'Cache County Car Accident Lawyer | Free Case Review',
        h1: 'Hurt in a car crash in Cache Valley?',
        h1Line2: ' Find out tonight if you have a claim.',
        detailPlaceholder: 'e.g. Main Street in Logan, last Friday',
        localityHtml:
          `<strong>Our office is in Salt Lake City, not Logan.</strong> We take Cache Valley ` +
          `cases and come to you — Logan, North Logan, Smithfield, Hyrum, Providence and the ` +
          `rest of the county. You will not drive to Salt Lake to hire us.`,
      },
    }),

    /* Cache Valley - wrongful death. Low volume, high value, and the worst
       possible page to send to a generic injury URL. */
    ...makePair({
      site,
      geo: 'cache-valley',
      practice: 'wrongful-death',
      slug: 'cache-county-wrongful-death',
      esSlug: 'muerte-por-negligencia-cache-county',
      label: 'Cache County Wrongful Death Lawyer',
      noun: 'fatal crash',
      esLabel: 'Abogado de Muerte por Negligencia en Cache County',
      esNoun: 'accidente fatal',
      overrides: {
        title: 'Cache County Wrongful Death Lawyer | Utah',
        metaDescription:
          'Lost a family member in a crash in Cache Valley? Speak to a Utah wrongful death ' +
          'attorney. Free and confidential. We come to you.',
        h1: 'Did your family lose someone in a crash?',
        h1Line2: ' We can take the next part off you.',
        subhead:
          'We are sorry. When you are ready, one call will tell you what the deadlines are and ' +
          'what your family does not have to deal with. Free and confidential.',
        formHeading: 'Ask us anything',
        formSub: 'No pressure, and no obligation to do anything afterwards.',
        closingHeading: 'When you are ready',
        closingLede:
          'There is no rush from our side and no script. Call when it suits your family.',
      },
    }),

    /* ------------------------------------------------------------------
       Salt Lake County. Home turf, so the locality block flips from
       apology to advantage.
       ------------------------------------------------------------------ */
    ...makePair({
      site,
      geo: 'salt-lake',
      practice: 'truck',
      slug: 'salt-lake-truck-accident',
      esSlug: 'accidente-de-trailer-salt-lake',
      label: 'Salt Lake Truck Accident Lawyer',
      noun: 'truck crash',
      esLabel: 'Abogado de Accidentes de Tráiler en Salt Lake',
      esNoun: 'accidente de tráiler',
      overrides: {
        title: 'Salt Lake Truck Accident Lawyer | Free Case Review',
        h1: 'Injured in a Salt Lake truck crash?',
        h1Line2: ' Talk to a downtown truck accident lawyer today.',
        localityHtml:
          `<strong>Our office is at 299 South Main Street, downtown.</strong> You can walk in and ` +
          `sit across a desk from the attorney who will handle your case — or we come to the ` +
          `hospital, whichever is easier.`,
        detailPlaceholder: 'e.g. I-15 near 600 South, last Tuesday',
      },
    }),

    ...makePair({
      site,
      geo: 'salt-lake',
      practice: 'car',
      slug: 'salt-lake-car-accident',
      esSlug: 'accidente-de-carro-salt-lake',
      label: 'Salt Lake Car Accident Lawyer',
      noun: 'car crash',
      esLabel: 'Abogado de Accidentes de Carro en Salt Lake',
      esNoun: 'accidente de carro',
      overrides: {
        title: 'Salt Lake Car Accident Lawyer | Free Case Review',
        h1: 'Hurt in a car crash in Salt Lake?',
        h1Line2: ' Find out today if you have a claim.',
        localityHtml:
          `<strong>Our office is at 299 South Main Street, downtown.</strong> Walk in, or we come ` +
          `to you anywhere in the valley. Same-day video consult if that is easier.`,
        detailPlaceholder: 'e.g. Redwood Road and 3500 South, last week',
      },
    }),

    /* ------------------------------------------------------------------
       Weber / Davis corridor.
       ------------------------------------------------------------------ */
    ...makePair({
      site,
      geo: 'weber-davis',
      practice: 'truck',
      slug: 'ogden-truck-accident',
      esSlug: 'accidente-de-trailer-ogden',
      label: 'Ogden & Layton Truck Accident Lawyer',
      noun: 'truck crash',
      esLabel: 'Abogado de Accidentes de Tráiler en Ogden',
      esNoun: 'accidente de tráiler',
      overrides: {
        title: 'Ogden Truck Accident Lawyer | Free Case Review',
        h1: 'Injured in a truck crash on I-15?',
        h1Line2: ' Talk to a Utah truck accident lawyer tonight.',
        detailPlaceholder: 'e.g. I-15 near Layton, last Thursday',
      },
    }),

    ...makePair({
      site,
      geo: 'weber-davis',
      practice: 'car',
      slug: 'ogden-car-accident',
      esSlug: 'accidente-de-carro-ogden',
      label: 'Ogden & Layton Car Accident Lawyer',
      noun: 'car crash',
      esLabel: 'Abogado de Accidentes de Carro en Ogden',
      esNoun: 'accidente de carro',
      overrides: {
        title: 'Ogden & Layton Car Accident Lawyer | Free Review',
        h1: 'Hurt in a car crash in Weber or Davis County?',
        h1Line2: ' Find out today if you have a claim.',
        detailPlaceholder: 'e.g. Riverdale Road, last Saturday',
      },
    }),
  ];
};

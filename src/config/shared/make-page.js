const geos = require('./geo');
const truck = require('./practice-truck');
const car = require('./practice-car');
const wrongfulDeath = require('./practice-wrongful-death');

const PRACTICES = { truck, car, 'wrongful-death': wrongfulDeath };

/**
 * Builds one landing page from a geography and a practice area.
 *
 * Keeping pages as (geo x practice) is what makes a separate URL per ad
 * group affordable. Message match is the cheapest quality-score win
 * available, and it only works if adding a page is a five-line change.
 *
 * `overrides` exists for the cases where the generated headline is not the
 * one the ad promises. The ad's promise wins, always.
 */
function makePage(opts) {
  const geo = geos[opts.geo];
  if (!geo) throw new Error(`Unknown geo: ${opts.geo}`);

  const practiceFactory = PRACTICES[opts.practice];
  if (!practiceFactory) throw new Error(`Unknown practice: ${opts.practice}`);

  const p = practiceFactory(geo);
  const o = opts.overrides || {};

  const base = {
    slug: opts.slug,
    geoKey: geo.key,
    practiceKey: opts.practice,

    // Title stays under ~60 chars so it is not truncated in the ad preview
    // tools the team will paste it into.
    title: o.title || `${opts.label} | Free Case Review | William Andrews`,
    metaDescription:
      o.metaDescription ||
      `Hurt in a ${opts.noun} in ${geo.label}? Talk to a Utah injury attorney today. ` +
        `Free, confidential, no fee unless we win. We come to you.`,

    // The H1 answers the ad, then speaks to the person, not the keyword.
    h1: o.h1 || `Injured in a ${geo.labelShort} ${opts.noun}?`,
    h1Line2: o.h1Line2 || ` Talk to a Utah attorney tonight.`,
    subhead:
      o.subhead ||
      `Free. Confidential. No fee unless we win. Tell us what happened and we will tell you ` +
        `straight whether you have a case.`,

    localityHtml:
      o.localityHtml ||
      `<strong>${geo.honesty.short}</strong> We take ${geo.labelShort} cases and come to you &mdash; ` +
        `${geo.cities.slice(0, 5).join(', ')} and the rest of the county.`,

    formHeading: o.formHeading || 'Tell us what happened',
    formSub: o.formSub || 'Four questions. Takes about thirty seconds.',
    detailPlaceholder: o.detailPlaceholder || `e.g. ${geo.hub}, last Tuesday`,

    incidentOptions: o.incidentOptions || p.incidentOptions,
    difference: o.difference || p.difference,
    firstHours: o.firstHours || p.firstHours,

    proofHeading: o.proofHeading || 'Reasons to believe any of this',
    proofLede:
      o.proofLede ||
      'Ratings you can click through and check, and a name you can look up on the Utah Bar roll.',

    who:
      o.who ||
      `William Andrews has handled serious injury and wrongful death cases in Utah since 2004. ` +
        `He is the attorney on your case, not a case manager you get handed to after signing.`,

    faqs: o.faqs || p.faqs(geo, opts.site),

    closingHeading: o.closingHeading || 'Still deciding?',
    closingLede:
      o.closingLede ||
      `Calling costs you nothing and commits you to nothing. The worst outcome is that we tell ` +
        `you there is no case and you get on with your week.`,

    serviceArea: o.serviceArea || geo.cities,
    serviceAreaNote:
      o.serviceAreaNote ||
      `${geo.honesty.short} ${geo.honesty.meeting}`,
  };

  return base;
}

module.exports = { makePage, geos };

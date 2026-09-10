const geos = require('./geo');
const truck = require('./practice-truck');
const car = require('./practice-car');
const wrongfulDeath = require('./practice-wrongful-death');
const STRINGS = require('./strings');

const PRACTICES = { truck, car, 'wrongful-death': wrongfulDeath };

/**
 * Builds one landing page from a geography, a practice area and a language.
 *
 * Keeping pages as (geo x practice x lang) is what makes a separate URL per
 * ad group affordable. Message match is the cheapest quality-score win
 * available, and it only works if adding a page is a five-line change.
 *
 * Spanish pages live under /es/ with their own Spanish slug, and each page
 * knows its counterpart so the two can cross-link and declare hreflang.
 */
function makePage(opts) {
  const lang = opts.lang || 'en';
  const t = STRINGS[lang];
  const geo = geos[opts.geo];
  if (!geo) throw new Error(`Unknown geo: ${opts.geo}`);

  const practice = PRACTICES[opts.practice];
  if (!practice) throw new Error(`Unknown practice: ${opts.practice}`);
  if (!practice[lang]) throw new Error(`${opts.practice} has no ${lang} content`);

  const p = practice[lang](geo);
  const o = (lang === 'es' ? opts.esOverrides : opts.overrides) || {};
  const site = opts.site;

  // Spanish intake may promise something narrower than English intake.
  const intake = lang === 'es' && site.intake.es
    ? Object.assign({}, site.intake, site.intake.es)
    : site.intake;

  const label = lang === 'es' ? geo.esLabel : geo.label;
  const labelShort = lang === 'es' ? geo.esLabelShort : geo.labelShort;
  const honestyShort = lang === 'es' ? geo.es.honestyShort : geo.honesty.short;
  const meeting = lang === 'es' ? geo.es.meeting : geo.honesty.meeting;

  const slug = lang === 'es' ? `es/${opts.esSlug}` : opts.slug;
  const altSlug = lang === 'es' ? opts.slug : `es/${opts.esSlug}`;

  const D = {
    en: {
      title: `${opts.label} | Free Case Review | William Andrews`,
      meta: `Hurt in a ${opts.noun} in ${label}? Talk to a Utah injury attorney today. ` +
        `Free, confidential, no fee unless we win. We come to you.`,
      h1: `Injured in a ${labelShort} ${opts.noun}?`,
      h1Line2: ' Talk to a Utah attorney tonight.',
      subhead: 'Free. Confidential. No fee unless we win. Tell us what happened and we will ' +
        'tell you straight whether you have a case.',
      locality: `<strong>${honestyShort}</strong> We take ${labelShort} cases and come to you — ` +
        `${geo.cities.slice(0, 5).join(', ')} and the rest of the county.`,
      formHeading: 'Tell us what happened',
      formSub: 'Four questions. Takes about thirty seconds.',
      detail: `e.g. ${geo.hub}, last Tuesday`,
      proofHeading: 'Reasons to believe any of this',
      proofLede: 'Ratings you can click through and check, and a name you can look up on the ' +
        'Utah Bar roll.',
      who: 'William Andrews has handled serious injury and wrongful death cases in Utah since ' +
        '2004. He is the attorney on your case, not a case manager you get handed to after ' +
        'signing.',
      closingHeading: 'Still deciding?',
      closingLede: 'Calling costs you nothing and commits you to nothing. The worst outcome is ' +
        'that we tell you there is no case and you get on with your week.',
    },
    es: {
      title: `${opts.esLabel} | Consulta Gratis | William Andrews`,
      meta: `¿Lesionado en un ${opts.esNoun} en ${label}? Hable hoy con un abogado de Utah. ` +
        `Gratis, confidencial, y si no ganamos usted no paga. Vamos a donde usted esté.`,
      h1: `¿Lesionado en un ${opts.esNoun} en ${labelShort}?`,
      h1Line2: ' Hable con un abogado de Utah esta noche.',
      subhead: 'Gratis y confidencial. Si no ganamos, usted no paga nada. Cuéntenos qué pasó y ' +
        'le decimos con franqueza si tiene un caso.',
      locality: `<strong>${honestyShort}</strong> Tomamos casos de ${labelShort} y vamos a donde ` +
        `usted esté — ${geo.cities.slice(0, 5).join(', ')} y el resto del condado.`,
      formHeading: 'Cuéntenos qué pasó',
      formSub: 'Cuatro preguntas. Toma unos treinta segundos.',
      detail: `ej. ${geo.hub}, el martes pasado`,
      proofHeading: 'Razones para creernos',
      proofLede: 'Calificaciones que usted puede abrir y verificar, y un nombre que puede buscar ' +
        'en el registro del Colegio de Abogados de Utah.',
      who: 'William Andrews lleva casos de lesiones graves y muerte por negligencia en Utah desde ' +
        '2004. Él es el abogado de su caso, no un gestor al que lo pasan después de firmar.',
      closingHeading: '¿Todavía lo está pensando?',
      closingLede: 'Llamar no le cuesta nada y no lo compromete a nada. Lo peor que puede pasar ' +
        'es que le digamos que no hay caso y usted siga con su semana.',
    },
  }[lang];

  return {
    slug,
    altSlug,
    lang,
    t,
    intake,
    geoKey: geo.key,
    practiceKey: opts.practice,

    title: o.title || D.title,
    metaDescription: o.metaDescription || D.meta,
    h1: o.h1 || D.h1,
    h1Line2: o.h1Line2 || D.h1Line2,
    subhead: o.subhead || D.subhead,
    localityHtml: o.localityHtml || D.locality,

    formHeading: o.formHeading || D.formHeading,
    formSub: o.formSub || D.formSub,
    detailPlaceholder: o.detailPlaceholder || D.detail,

    incidentOptions: o.incidentOptions || p.incidentOptions,
    difference: o.difference || p.difference,
    firstHours: o.firstHours || p.firstHours,

    proofHeading: o.proofHeading || D.proofHeading,
    proofLede: o.proofLede || D.proofLede,
    who: o.who || D.who,

    faqs: o.faqs || p.faqs(geo, Object.assign({}, site, { intake })),

    closingHeading: o.closingHeading || D.closingHeading,
    closingLede: o.closingLede || D.closingLede,

    serviceArea: o.serviceArea || geo.cities,
    serviceAreaNote: o.serviceAreaNote || `${honestyShort} ${meeting}`,
  };
}

/**
 * Builds the English page and, when Spanish intake is staffed, its Spanish
 * counterpart. The flag is the gate on purpose: a Spanish page that routes to
 * an English-only phone line is worse than no Spanish page.
 */
function makePair(opts) {
  const pages = [makePage(Object.assign({}, opts, { lang: 'en' }))];
  if (opts.site.intake.spanishStaffed) {
    pages.push(makePage(Object.assign({}, opts, { lang: 'es' })));
  }
  return pages;
}

module.exports = { makePage, makePair, geos };

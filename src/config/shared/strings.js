/**
 * UI chrome, in both languages.
 *
 * The Spanish here is written, not machine-translated. Two choices worth
 * knowing about:
 *
 *   "camión"  In Mexico this commonly means *bus*. Utah's Spanish-speaking
 *             population is largely of Mexican origin, so a page headed
 *             "accidente de camión" can read as a bus crash. Every reference
 *             to a semi says "tráiler" or "camión de carga" to remove the
 *             ambiguity, even though "accidente de camión" is the phrase the
 *             ad group will bid on.
 *
 *   "usted"   Formal address throughout. A law firm that tutea a stranger in
 *             crisis sounds either junior or careless.
 */

module.exports = {
  en: {
    htmlLang: 'en',
    langToggle: 'Español',
    langToggleAria: 'Ver esta página en español',
    skip: 'Skip to content',
    tagline: 'Utah injury & wrongful death',
    callNow: 'Call Now',
    textPerson: (name) => `Text ${name}`,
    callNumber: (n) => `Call ${n}`,
    textInstead: 'Text us instead',
    stickyNote: (hours) => `Free. No fee unless we win. ${hours}.`,
    chipYears: (n) => `${n}+ years in Utah courts`,
    chipReviews: (rating, count) => `${rating} Google (${count} reviews)`,
    chipReviewsLinked: (rating, count) => `${rating} Google — ${count} reviews`,
    chipNoFee: 'No fee unless we win',
    fieldName: 'Your name',
    fieldPhone: 'Mobile number',
    fieldIncident: 'What happened?',
    fieldDetail: 'City and date of the crash',
    fieldOptional: '(optional)',
    choose: 'Choose one…',
    honeypot: 'Company',
    submit: 'Get a free case review',
    submitSub: 'We’ll call you back',
    reassure: (sla) => [
      'No fee unless we win. No upfront cost.',
      `Confidential. ${sla}`,
      'Sending this does not hire us or create an attorney-client relationship.',
    ],
    faqHeading: 'Straight answers',
    faqLede: 'The five questions people actually ask on the first call.',
    areaHeading: 'Where we take cases',
    whoHeading: 'Who you are calling',
    whoPractising: (year, edu) => `Practising in Utah since ${year} · ${edu}`,
    reviewsAll: (count) => `Read all ${count} on Google`,
    reviewsPlain: (count) => `${count} reviews on Google`,
    advertising: 'Attorney advertising.',
    barLine: (n) => ` Utah State Bar no. ${n} · `,
    verify: 'verify',
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    // Client-side validation. Lives here so lp.js has no hardcoded English.
    errName: 'Please enter your name.',
    errPhone: 'Enter a 10-digit mobile number so we can call you back.',
    errIncident: 'Pick the closest option — "Not sure" is fine.',
    errFix: 'Please fix the highlighted fields, or just call — it is faster.',
    sending: 'Sending your request…',
    sendingBtn: 'Sending…',
    errSend: (phone) =>
      `That did not go through. Please call ${phone} — we answer 24/7 and it is the ` +
      `fastest way to reach us.`,
    tyTitle: 'We got it — we’re calling you',
    tyH1: 'Got it. We’re calling you.',
    tyH1Line2: (prefix) => `Watch for a ${prefix} number.`,
    tySub: (sla) =>
      `${sla} If you would rather not wait, call or text now — you will get straight through.`,
    tyToldUs: 'You told us:',
    tyWaitHeading: 'While you wait',
    tyWaitLede: 'Three things that protect your case in the next few hours.',
    tySteps: [
      {
        h: 'Do not give a recorded statement',
        p:
          'If an insurance adjuster calls — especially the trucking company’s — you can say ' +
          '“I have counsel, please call my attorney.” You are not required to explain the ' +
          'crash to them today.',
      },
      {
        h: 'Get checked, and say everything that hurts',
        p:
          'Adrenaline hides injuries for a day or two. What is written in the first medical ' +
          'record matters later, so mention every symptom, not just the worst one.',
      },
      {
        h: 'Photograph what you still have',
        p:
          'Your vehicle, your injuries, the bills, the tow paperwork, the police report ' +
          'number. Send them to us once we speak — no need to organise anything first.',
      },
    ],
  },

  es: {
    htmlLang: 'es',
    langToggle: 'English',
    langToggleAria: 'View this page in English',
    skip: 'Ir al contenido',
    tagline: 'Lesiones personales en Utah',
    callNow: 'Llamar ahora',
    textPerson: () => 'Enviar mensaje',
    callNumber: (n) => `Llame al ${n}`,
    textInstead: 'Mejor envíe un mensaje',
    stickyNote: (hours) => `Gratis. Si no ganamos, usted no paga. ${hours}.`,
    chipYears: (n) => `${n}+ años de experiencia`,
    chipReviews: (rating, count) => `${rating} Google · ${count} reseñas`,
    chipReviewsLinked: (rating, count) => `${rating} Google · ${count} reseñas`,
    chipNoFee: 'Si no ganamos, no paga',
    fieldName: 'Su nombre',
    fieldPhone: 'Número de celular',
    fieldIncident: '¿Qué pasó?',
    fieldDetail: 'Ciudad y fecha del accidente',
    fieldOptional: '(opcional)',
    choose: 'Elija una opción…',
    honeypot: 'Empresa',
    submit: 'Consulta gratis',
    submitSub: 'Le llamamos nosotros',
    reassure: (sla) => [
      'Si no ganamos, usted no paga nada. Sin costo por adelantado.',
      `Confidencial. ${sla}`,
      'Enviar este formulario no nos contrata ni crea una relación abogado-cliente.',
    ],
    faqHeading: 'Respuestas claras',
    faqLede: 'Las cinco preguntas que la gente hace de verdad en la primera llamada.',
    areaHeading: 'Dónde tomamos casos',
    whoHeading: 'Con quién va a hablar',
    whoPractising: (year, edu) => `Ejerciendo en Utah desde ${year} · ${edu}`,
    reviewsAll: (count) => `Vea las ${count} reseñas en Google`,
    reviewsPlain: (count) => `${count} reseñas en Google`,
    advertising: 'Publicidad de abogado.',
    barLine: (n) => ` Colegio de Abogados de Utah n.º ${n} · `,
    verify: 'verificar',
    privacy: 'Aviso de privacidad',
    terms: 'Términos de uso',
    errName: 'Por favor escriba su nombre.',
    errPhone: 'Escriba un número de 10 dígitos para poder llamarle.',
    errIncident: 'Elija la opción más cercana — «No estoy seguro» está bien.',
    errFix: 'Corrija los campos marcados, o simplemente llame — es más rápido.',
    sending: 'Enviando su solicitud…',
    sendingBtn: 'Enviando…',
    errSend: (phone) =>
      `No se pudo enviar. Por favor llame al ${phone} — contestamos las 24 horas y es la ` +
      `forma más rápida de comunicarse.`,
    tyTitle: 'Recibido — le vamos a llamar',
    tyH1: 'Recibido. Le vamos a llamar.',
    tyH1Line2: (prefix) => `Espere una llamada del ${prefix}.`,
    tySub: (sla) =>
      `${sla} Si prefiere no esperar, llame o envíe un mensaje ahora y le atendemos de inmediato.`,
    tyToldUs: 'Usted nos dijo:',
    tyWaitHeading: 'Mientras espera',
    tyWaitLede: 'Tres cosas que protegen su caso en las próximas horas.',
    tySteps: [
      {
        h: 'No dé una declaración grabada',
        p:
          'Si le llama un ajustador de seguros — sobre todo el de la compañía de transporte — ' +
          'puede decirle: «Tengo abogado, por favor hable con él». Usted no está obligado a ' +
          'explicarles el accidente hoy.',
      },
      {
        h: 'Vaya al médico y diga todo lo que le duele',
        p:
          'La adrenalina esconde las lesiones uno o dos días. Lo que quede escrito en el primer ' +
          'informe médico importa después, así que mencione cada molestia, no solo la peor.',
      },
      {
        h: 'Tome fotos de lo que todavía tiene',
        p:
          'Su vehículo, sus lesiones, las cuentas, el papeleo de la grúa y el número del reporte ' +
          'policial. Nos los manda cuando hablemos — no hace falta que ordene nada antes.',
      },
    ],
  },
};

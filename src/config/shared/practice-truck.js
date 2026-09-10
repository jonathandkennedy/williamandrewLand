/**
 * Truck-crash content.
 *
 * This is the block that has to earn the click. A scared person does not
 * need to hear that we are relentless. They need to hear that we know what
 * evidence disappears and how fast.
 *
 * NOTE FOR REVIEW: every legal statement below is a general statement of
 * Utah or federal law, not advice, and must be signed off by the attorney
 * before this page takes paid traffic. See LAUNCH-CHECKLIST.md.
 */

const en = (geo) => ({
  incidentOptions: [
    'Semi / tractor-trailer',
    'Amazon, UPS or FedEx delivery truck',
    'Dump truck, box truck or work truck',
    'Someone died in the crash',
    'Not sure',
  ],

  difference: {
    heading: 'A truck case is not a big car case',
    lede:
      'Different rules, different evidence, and a defence team that is already working ' +
      'while you are still in the emergency room.',
    items: [
      {
        h: 'The evidence has a shelf life',
        p:
          'The truck records what it was doing. Engine control module data, the electronic ' +
          'logging device, dash and cab cameras, dispatch messages. Some of it is overwritten ' +
          'on a timer. If nobody demands it in writing, it is gone and no one has to explain why.',
      },
      {
        h: 'They send people to the scene',
        p:
          'Large carriers have rapid-response teams under contract. An investigator and often a ' +
          'lawyer can be at the wreck the same day, photographing and measuring, building the ' +
          'file long before you have been discharged.',
      },
      {
        h: 'More than one company can owe you',
        p:
          'The driver is one defendant. The motor carrier, the broker who arranged the load, the ' +
          'company that loaded it, and the shop that serviced the brakes can each be another. ' +
          'Finding all of them is often the difference between a policy limit and full value.',
      },
      {
        h: 'They are held to federal rules',
        p:
          'Interstate carriers answer to the FMCSA: hours-of-service limits, driver qualification ' +
          'files, drug and alcohol testing, inspection and maintenance records. A violation in ' +
          'those files is not just paperwork. It is the case.',
      },
      {
        h: 'The policies are much larger',
        p:
          'Federal minimums for interstate freight start at $750,000 and run into the millions ' +
          'for tankers and hazardous loads. Bigger coverage means the insurer fights harder and ' +
          'earlier than it would over a fender bender.',
      },
      {
        h: 'Utah splits the fault',
        p:
          'Utah reduces what you recover by your share of the blame, and bars recovery once your ' +
          'share reaches 50%. Shifting a slice of fault onto you is the cheapest move the carrier ' +
          'has, which is why what you say early matters so much.',
      },
    ],
  },

  firstHours: {
    heading: 'What we do in the first 72 hours',
    lede:
      'A truck case is an evidence race. This is the part that cannot wait for you to feel better.',
    steps: [
      {
        h: 'Send a spoliation letter',
        p:
          'A written demand that the carrier preserve the ECM download, the ELD logs, dash camera ' +
          'footage, the driver qualification file, dispatch records and the truck itself. Once it ' +
          'is served, "we lost it" stops being free.',
      },
      {
        h: 'Get to the truck and the scene',
        p:
          `We move to inspect the tractor and trailer before they are repaired or released, and to ` +
          `photograph the road while the marks are still there — ${geo.roads[0]} does not stay ` +
          `closed for long.`,
      },
      {
        h: 'Identify every defendant',
        p:
          'We pull the police report and the carrier\'s USDOT filings and work out who the driver ' +
          'was really working for, who brokered the load, who loaded it and who maintained it.',
      },
      {
        h: 'Stop the recorded statement',
        p:
          'The carrier\'s adjuster will call, friendly and fast, and ask you to describe the crash ' +
          'while you are on pain medication. From the day we are hired, those calls come to us.',
      },
      {
        h: 'Get your treatment and your bills organised',
        p:
          `We point you to doctors who will actually see you, sort out who pays while the claim ` +
          `runs, and start documenting wage loss from day one — ${geo.hospitals[0]} included.`,
      },
    ],
  },

  faqs: (geo, site) => [
    {
      q: 'What if the crash was partly my fault?',
      a: [
        'Call anyway. Utah reduces your recovery by your percentage of fault rather than wiping ' +
          'it out, and you can still recover as long as your share stays under 50%.',
        'People are also wrong about their own fault surprisingly often, usually against ' +
          'themselves. Whether a truck driver had been on the road too long, or the brakes were ' +
          'out of adjustment, is not something you could have seen from the driver\'s seat.',
      ],
    },
    {
      q: `How do you handle a case in ${geo.label} from Salt Lake?`,
      a: [
        geo.honesty.long,
        geo.honesty.meeting,
      ],
    },
    {
      q: 'What does this cost me?',
      a: [
        'Nothing up front, and nothing at all unless we win. Our fee is a percentage of what we ' +
          'recover, agreed in writing before we start, and case costs come out of the recovery ' +
          'rather than your pocket.',
        'The first conversation is free and carries no obligation. If we do not think you need a ' +
          'lawyer, we will tell you that too.',
      ],
    },
    {
      q: 'How fast will someone call me back?',
      a: [
        `${site.intake.callbackSla} ${site.intake.whoAnswers} We take calls ${site.intake.hours.toLowerCase()}, ` +
          'because crashes do not only happen during office hours.',
      ],
    },
    {
      q: 'Should I talk to the trucking company\'s insurer?',
      a: [
        'Not before you have spoken to a lawyer. The adjuster is pleasant and it feels rude to ' +
          'refuse, but a recorded statement taken days after a crash, while you are medicated and ' +
          'do not yet know the extent of your injuries, is used to lock you into a version of ' +
          'events and to move fault onto you.',
        'You can simply say you have counsel and give them our number. That is a complete answer.',
      ],
    },
  ],
});

/**
 * Spanish. Written, not translated.
 *
 * Two additions that have no English counterpart, because they are the two
 * questions that actually stop a Spanish-speaking crash victim from calling
 * a lawyer in Utah:
 *
 *   - Immigration status. Many people believe that being undocumented means
 *     they have no claim, or that calling a lawyer puts them at risk. It is
 *     the single most common reason a real case never gets made. Answering it
 *     plainly, high on the page, is worth more than any headline test.
 *   - Being a passenger with no licence and no insurance of their own, which
 *     is extremely common among agricultural and dairy crews in Cache Valley.
 *
 * Both are stated as general information and both need the same attorney
 * review as the English copy. See LAUNCH-CHECKLIST.md.
 */
const es = (geo) => ({
  incidentOptions: [
    'Tráiler o camión de carga',
    'Camioneta de reparto (Amazon, UPS, FedEx)',
    'Camión de volteo, camión de caja o de trabajo',
    'Alguien falleció en el accidente',
    'No estoy seguro',
  ],

  difference: {
    heading: 'Un caso de tráiler no es un choque de carro grande',
    lede:
      'Otras reglas, otra evidencia, y un equipo de defensa que ya está trabajando mientras ' +
      'usted sigue en la sala de emergencias.',
    items: [
      {
        h: 'La evidencia se borra sola',
        p:
          'El tráiler graba lo que estaba haciendo: el módulo del motor, el registro electrónico ' +
          'de horas, las cámaras de la cabina, los mensajes con el despachador. Parte de eso se ' +
          'borra sola con el tiempo. Si nadie la exige por escrito, desaparece y nadie tiene que ' +
          'dar explicaciones.',
      },
      {
        h: 'Ellos mandan gente al lugar',
        p:
          'Las compañías grandes de transporte tienen equipos de respuesta rápida por contrato. ' +
          'Un investigador, y muchas veces un abogado, puede llegar al lugar el mismo día a ' +
          'tomar fotos y medidas, armando su expediente mucho antes de que a usted le den de alta.',
      },
      {
        h: 'Más de una empresa puede deberle',
        p:
          'El chofer es solo uno. La compañía de transporte, el bróker que consiguió la carga, ' +
          'quien cargó el tráiler y el taller que le dio servicio a los frenos pueden ser otros. ' +
          'Encontrarlos a todos es a menudo la diferencia entre el límite de una póliza y el ' +
          'valor real del caso.',
      },
      {
        h: 'Están sujetos a reglas federales',
        p:
          'Las compañías interestatales responden ante la FMCSA: límites de horas de manejo, ' +
          'expediente de calificación del chofer, pruebas de alcohol y drogas, y registros de ' +
          'inspección y mantenimiento. Una violación en esos archivos no es papeleo. Es el caso.',
      },
      {
        h: 'Las pólizas son mucho más grandes',
        p:
          'Los mínimos federales para carga interestatal empiezan en $750,000 y llegan a millones ' +
          'para tanques y materiales peligrosos. Más cobertura significa que la aseguradora pelea ' +
          'más duro y desde más temprano.',
      },
      {
        h: 'Utah reparte la culpa',
        p:
          'Utah reduce lo que usted recibe según su porcentaje de culpa, y lo elimina cuando esa ' +
          'parte llega al 50%. Echarle un poco de culpa a usted es la movida más barata que tiene ' +
          'la compañía, y por eso importa tanto lo que usted diga al principio.',
      },
    ],
  },

  firstHours: {
    heading: 'Lo que hacemos en las primeras 72 horas',
    lede:
      'Un caso de tráiler es una carrera por la evidencia. Esta parte no puede esperar a que ' +
      'usted se sienta mejor.',
    steps: [
      {
        h: 'Enviamos una carta de preservación',
        p:
          'Una exigencia por escrito de que la compañía conserve los datos del módulo del motor, ' +
          'los registros electrónicos de horas, el video de las cámaras, el expediente del chofer, ' +
          'los registros del despachador y el tráiler mismo. Una vez entregada, «se nos perdió» ' +
          'deja de salir gratis.',
      },
      {
        h: 'Vamos al tráiler y al lugar del accidente',
        p:
          `Actuamos para inspeccionar el tractor y la caja antes de que los reparen o los ` +
          `entreguen, y para fotografiar el camino mientras todavía se ven las marcas — ` +
          `${geo.roads[0]} no queda cerrada mucho tiempo.`,
      },
      {
        h: 'Identificamos a todos los responsables',
        p:
          'Pedimos el reporte policial y los registros USDOT de la compañía para determinar para ' +
          'quién trabajaba realmente el chofer, quién consiguió la carga, quién la cargó y quién ' +
          'le dio mantenimiento al tráiler.',
      },
      {
        h: 'Detenemos la declaración grabada',
        p:
          'El ajustador de la compañía le va a llamar, amable y rápido, y le va a pedir que ' +
          'describa el accidente mientras usted anda con medicamento para el dolor. Desde el día ' +
          'que nos contrata, esas llamadas llegan a nosotros.',
      },
      {
        h: 'Organizamos su atención médica y sus cuentas',
        p:
          `Le indicamos médicos que sí lo van a atender, resolvemos quién paga mientras avanza el ` +
          `reclamo y empezamos a documentar el salario perdido desde el primer día — incluyendo ` +
          `${geo.hospitals[0]}.`,
      },
    ],
  },

  faqs: (geo, site) => [
    {
      q: '¿Mi estatus migratorio afecta mi caso?',
      a: [
        'No. En Utah, cualquier persona lesionada por la negligencia de otro puede presentar un ' +
          'reclamo por lesiones, sin importar su estatus migratorio. No se necesita número de ' +
          'seguro social ni licencia de manejo para tener derecho a reclamar.',
        'Lo que usted nos cuente es confidencial. No le reportamos a inmigración y no es algo que ' +
          'la aseguradora tenga derecho a usar para decidir si le paga. Esta es la razón número ' +
          'uno por la que casos buenos nunca se presentan, y no debería serlo.',
      ],
    },
    {
      q: '¿Y si el accidente fue en parte mi culpa?',
      a: [
        'Llame de todos modos. Utah reduce lo que usted recibe según su porcentaje de culpa en ' +
          'lugar de quitárselo todo, y usted todavía puede recuperar algo mientras esa parte se ' +
          'mantenga por debajo del 50%.',
        'Además, la gente se echa la culpa a sí misma con mucha más frecuencia de la que debería. ' +
          'Si el chofer llevaba demasiadas horas manejando, o si los frenos estaban mal ajustados, ' +
          'no es algo que usted pudiera haber visto desde su asiento.',
      ],
    },
    {
      q: 'Yo iba de pasajero y no tengo seguro. ¿Puedo reclamar?',
      a: [
        'Sí. Como pasajero, usted normalmente no tiene ninguna culpa, y la cobertura que responde ' +
          'suele ser la del vehículo en el que iba o la de la compañía de transporte, no la suya.',
        'No tener seguro propio, ni licencia, no le quita el derecho a que le paguen sus gastos ' +
          'médicos y su salario perdido. Vale la pena una llamada gratis para saber qué pólizas ' +
          'aplican en su caso.',
      ],
    },
    {
      q: `¿Cómo llevan un caso en ${geo.esLabel || geo.label} si están en Salt Lake?`,
      a: [geo.es.honestyLong, geo.es.meeting],
    },
    {
      q: '¿Cuánto me cuesta?',
      a: [
        'Nada por adelantado, y nada si no ganamos. Nuestros honorarios son un porcentaje de lo ' +
          'que recuperemos, acordado por escrito antes de empezar, y los gastos del caso salen de ' +
          'la recuperación, no de su bolsillo.',
        'La primera plática es gratis y no lo compromete a nada. Si creemos que usted no necesita ' +
          'abogado, se lo decimos también.',
      ],
    },
    {
      q: '¿Debo hablar con el seguro de la compañía de transporte?',
      a: [
        'No antes de hablar con un abogado. El ajustador es amable y da pena negarse, pero una ' +
          'declaración grabada tomada a los pocos días del accidente, cuando usted anda medicado ' +
          'y todavía no sabe qué tan graves son sus lesiones, se usa para amarrarlo a una versión ' +
          'y para pasarle la culpa a usted.',
        'Puede simplemente decir que tiene abogado y darles nuestro número. Con eso basta.',
      ],
    },
  ],
});

module.exports = { en, es };

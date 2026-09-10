/**
 * Car-crash content.
 *
 * Utah is a no-fault state, which is the single biggest source of confusion
 * on the first call: people are told "it's no-fault" and conclude they have
 * no claim. Clearing that up is most of the work this block has to do.
 *
 * NOTE FOR REVIEW: general statements of Utah law, not advice. Attorney
 * sign-off required before paid traffic. See LAUNCH-CHECKLIST.md.
 */

const en = (geo) => ({
  incidentOptions: [
    'Rear-ended',
    'T-boned at an intersection',
    'Head-on or wrong-way',
    'Hit-and-run or uninsured driver',
    'Someone died in the crash',
    'Not sure',
  ],

  difference: {
    heading: 'What Utah’s no-fault rules actually mean for you',
    lede:
      '"No-fault" does not mean nobody is responsible. It means your own policy pays first, and ' +
      'there is a line you have to cross before you can claim against the driver who hit you.',
    items: [
      {
        h: 'Your own PIP pays the first bills',
        p:
          'Utah policies carry personal injury protection that covers early medical treatment ' +
          'regardless of who caused the crash. Using it is not an admission of anything and it ' +
          'does not use up your claim.',
      },
      {
        h: 'There is a threshold to cross',
        p:
          'To claim against the at-fault driver for pain and suffering, Utah requires a certain ' +
          'level of harm — a medical-expense threshold, or a permanent injury, disfigurement or ' +
          'dismemberment. Whether you have crossed it is a legal question, not a feeling.',
      },
      {
        h: 'The adjuster is not neutral',
        p:
          'The other driver\'s insurer is not a referee. An early offer, made before anyone knows ' +
          'whether your back settles down, is priced to close the file cheaply while you are still ' +
          'worried about the rent.',
      },
      {
        h: 'Uninsured and hit-and-run still have a route',
        p:
          'If the other driver has no coverage or drove off, your own uninsured and underinsured ' +
          'motorist coverage can step in. It is a claim against your own insurer, and they defend ' +
          'it like any other.',
      },
      {
        h: 'Fault gets shifted onto you',
        p:
          'Utah reduces recovery by your share of the blame and bars it at 50%. Expect the ' +
          'argument that you stopped short, or were going too fast, or should have seen it coming.',
      },
      {
        h: 'The clock is shorter than people think',
        p:
          'Deadlines vary by claim type, and a crash involving a city, county or state vehicle ' +
          'can require formal notice far sooner than an ordinary case. Ask early rather than ' +
          'finding out late.',
      },
    ],
  },

  firstHours: {
    heading: 'What we do in the first week',
    lede: 'Most of the damage to a car-crash claim is done in the first few days, quietly.',
    steps: [
      {
        h: 'Open your PIP and get you treated',
        p:
          `We get your own coverage opened so treatment starts now, and point you to doctors who ` +
          `will see a crash patient quickly — ${geo.hospitals[0]} and the clinics around it included.`,
      },
      {
        h: 'Preserve what disappears',
        p:
          `Intersection and business camera footage is usually overwritten within days. We send ` +
          `preservation letters and get someone to the scene on ${geo.roads[2] || geo.roads[0]} ` +
          `while there is still something to photograph.`,
      },
      {
        h: 'Take the adjuster calls',
        p:
          'From the day we are hired, the other insurer talks to us. No recorded statement, no ' +
          'signing a medical authorisation that hands over your entire history.',
      },
      {
        h: 'Find every layer of coverage',
        p:
          'The at-fault policy, your own UM/UIM, any umbrella policy, and whether the driver was ' +
          'working at the time — which can bring an employer\'s much larger policy into play.',
      },
      {
        h: 'Document the loss properly',
        p:
          'Wage records, the treatment you actually needed, and what you can no longer do. A file ' +
          'built like this is what makes an insurer move off its first number.',
      },
    ],
  },

  faqs: (geo, site) => [
    {
      q: 'I was told Utah is a no-fault state. Do I even have a claim?',
      a: [
        'Very possibly. No-fault only decides who pays the first medical bills. Once your injuries ' +
          'meet Utah\'s threshold, you can pursue the at-fault driver for everything else — the ' +
          'ongoing treatment, the lost income, and the pain.',
        'This is the single most common reason people talk themselves out of a real claim. It is ' +
          'worth one free phone call to find out which side of the line you are on.',
      ],
    },
    {
      q: 'What if the crash was partly my fault?',
      a: [
        'Call anyway. Utah reduces recovery by your share of the fault rather than eliminating it, ' +
          'and you can still recover while your share stays under 50%.',
        'People routinely overestimate their own fault in the days after a crash, when they are ' +
          'shaken and replaying it. What the evidence shows is often different.',
      ],
    },
    {
      q: 'The insurer already offered me a settlement. Should I take it?',
      a: [
        'Not before someone reads the file. A first offer is made before anyone knows whether ' +
          'your neck or back settles down, and it is priced to close the claim while you are ' +
          'worried about the rent. Signing it usually ends the claim permanently.',
        'If your treatment is still going, you cannot yet know what the claim is worth — and ' +
          'neither can they.',
      ],
    },
    {
      q: 'What does this cost me?',
      a: [
        'Nothing up front, and nothing unless we win. The fee is a percentage of the recovery, ' +
          'agreed in writing before we start, and costs come out of the recovery.',
        'If we think you can handle the claim yourself and keep more of it, we will say so.',
      ],
    },
    {
      q: 'How fast will someone call me back?',
      a: [
        `${site.intake.callbackSla} ${site.intake.whoAnswers} We take calls ${site.intake.hours.toLowerCase()}.`,
      ],
    },
  ],
});

/**
 * Spanish. Same two additions as the truck page - immigration status and the
 * uninsured passenger - because they are what actually stops the call.
 *
 * "No-fault" has no clean Spanish equivalent and the literal renderings
 * ("sin culpa") make it sound like nobody is responsible, which is exactly
 * the misunderstanding this block exists to fix. It is written out as what it
 * means instead.
 */
const es = (geo) => ({
  incidentOptions: [
    'Me chocaron por detrás',
    'Choque en una intersección',
    'Choque de frente o en sentido contrario',
    'Se dio a la fuga o no tenía seguro',
    'Alguien falleció en el accidente',
    'No estoy seguro',
  ],

  difference: {
    heading: 'Qué significan de verdad las reglas de Utah para usted',
    lede:
      'En Utah su propio seguro paga primero, sin importar quién tuvo la culpa. Eso no quiere ' +
      'decir que nadie sea responsable: quiere decir que hay una línea que hay que cruzar antes ' +
      'de poder reclamarle al conductor que lo chocó.',
    items: [
      {
        h: 'Su cobertura PIP paga las primeras cuentas',
        p:
          'Las pólizas de Utah incluyen protección contra lesiones (PIP) que cubre la atención ' +
          'médica inicial sin importar quién causó el choque. Usarla no es admitir nada y no le ' +
          'gasta su reclamo.',
      },
      {
        h: 'Hay un límite que hay que cruzar',
        p:
          'Para reclamarle al conductor culpable por dolor y sufrimiento, Utah exige cierto nivel ' +
          'de daño: un monto en gastos médicos, o una lesión permanente, desfiguración o pérdida ' +
          'de un miembro. Si usted ya lo cruzó es una pregunta legal, no una impresión.',
      },
      {
        h: 'El ajustador no es imparcial',
        p:
          'La aseguradora del otro conductor no es un árbitro. Una oferta temprana, hecha antes ' +
          'de que se sepa si su espalda va a sanar, está calculada para cerrar el expediente ' +
          'barato mientras usted anda preocupado por la renta.',
      },
      {
        h: 'Si se dio a la fuga o no tenía seguro, todavía hay salida',
        p:
          'Si el otro conductor no tenía cobertura o se fue del lugar, su propia cobertura contra ' +
          'conductores sin seguro puede responder. Es un reclamo contra su propia aseguradora, y ' +
          'ellos lo defienden como cualquier otro.',
      },
      {
        h: 'Le van a echar la culpa a usted',
        p:
          'Utah reduce la recuperación según su parte de culpa y la elimina en el 50%. Espere el ' +
          'argumento de que usted frenó de repente, o iba rápido, o debió haberlo visto venir.',
      },
      {
        h: 'El plazo es más corto de lo que la gente cree',
        p:
          'Los plazos cambian según el tipo de reclamo, y un choque con un vehículo de la ciudad, ' +
          'del condado o del estado puede exigir un aviso formal mucho antes. Pregunte temprano ' +
          'en vez de enterarse tarde.',
      },
    ],
  },

  firstHours: {
    heading: 'Lo que hacemos la primera semana',
    lede:
      'Casi todo el daño que sufre un reclamo por choque se hace en los primeros días, y en ' +
      'silencio.',
    steps: [
      {
        h: 'Abrimos su PIP y lo llevamos al médico',
        p:
          `Activamos su propia cobertura para que el tratamiento empiece ya, y le indicamos ` +
          `médicos que atienden rápido a un lesionado — incluyendo ${geo.hospitals[0]} y las ` +
          `clínicas de alrededor.`,
      },
      {
        h: 'Preservamos lo que desaparece',
        p:
          `Los videos de las cámaras de negocios y de las intersecciones normalmente se borran en ` +
          `pocos días. Enviamos cartas de preservación y mandamos a alguien a ` +
          `${geo.roads[2] || geo.roads[0]} mientras todavía haya algo que fotografiar.`,
      },
      {
        h: 'Contestamos nosotros al ajustador',
        p:
          'Desde el día que nos contrata, la otra aseguradora habla con nosotros. Sin declaración ' +
          'grabada y sin firmar una autorización médica que les entregue todo su historial.',
      },
      {
        h: 'Buscamos todas las coberturas',
        p:
          'La póliza del culpable, la suya contra conductores sin seguro, cualquier póliza ' +
          'adicional, y si esa persona andaba trabajando — lo cual puede traer la póliza mucho ' +
          'más grande de su patrón.',
      },
      {
        h: 'Documentamos bien la pérdida',
        p:
          'Comprobantes de salario, el tratamiento que de verdad necesitó, y lo que ya no puede ' +
          'hacer. Un expediente armado así es lo que hace que una aseguradora se mueva de su ' +
          'primera oferta.',
      },
    ],
  },

  faqs: (geo, site) => [
    {
      q: '¿Mi estatus migratorio afecta mi caso?',
      a: [
        'No. En Utah, cualquier persona lesionada por la negligencia de otro puede presentar un ' +
          'reclamo, sin importar su estatus migratorio. No se necesita número de seguro social ni ' +
          'licencia de manejo para tener derecho a reclamar.',
        'Lo que usted nos cuente es confidencial. No le reportamos a inmigración. Esta es la razón ' +
          'número uno por la que casos buenos nunca se presentan.',
      ],
    },
    {
      q: 'Me dijeron que en Utah el seguro paga sin importar la culpa. ¿Entonces sí tengo caso?',
      a: [
        'Es muy posible que sí. Esa regla solo decide quién paga las primeras cuentas médicas. ' +
          'Una vez que sus lesiones alcanzan el nivel que exige Utah, usted puede reclamarle al ' +
          'conductor culpable por todo lo demás: el tratamiento que sigue, el salario perdido y ' +
          'el dolor.',
        'Esta es la razón más común por la que la gente se convence sola de que no tiene reclamo. ' +
          'Vale una llamada gratis para saber de qué lado de la línea está usted.',
      ],
    },
    {
      q: 'Yo iba de pasajero y no tengo seguro. ¿Puedo reclamar?',
      a: [
        'Sí. Como pasajero usted normalmente no tiene culpa, y la cobertura que responde suele ser ' +
          'la del vehículo en el que iba o la del conductor culpable, no la suya.',
        'No tener seguro propio, ni licencia, no le quita el derecho a que le paguen sus gastos ' +
          'médicos y su salario perdido.',
      ],
    },
    {
      q: 'La aseguradora ya me ofreció un arreglo. ¿Lo acepto?',
      a: [
        'No sin que alguien revise el caso primero. La primera oferta se hace antes de saber si ' +
          'su cuello o su espalda van a sanar, y está calculada para cerrar el reclamo mientras ' +
          'usted anda preocupado por la renta. Firmarla normalmente termina el reclamo de forma ' +
          'permanente.',
        'Si todavía está en tratamiento, usted aún no puede saber cuánto vale el reclamo — y ' +
          'ellos tampoco.',
      ],
    },
    {
      q: '¿Cuánto me cuesta?',
      a: [
        'Nada por adelantado y nada si no ganamos. Los honorarios son un porcentaje de la ' +
          'recuperación, acordado por escrito antes de empezar, y los gastos salen de la ' +
          'recuperación.',
        'Si creemos que usted puede resolverlo solo y quedarse con más, se lo decimos.',
      ],
    },
  ],
});

module.exports = { en, es };

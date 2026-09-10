/**
 * Wrongful death content.
 *
 * The tone here is different on purpose. This visitor is not comparison
 * shopping a service; someone in their family has died, often days ago.
 * Urgency language that works on an injury page reads as ghoulish here.
 * Everything below is written to be readable by someone who is not okay.
 *
 * NOTE FOR REVIEW: general statements of Utah law, not advice. Attorney
 * sign-off required before paid traffic. See LAUNCH-CHECKLIST.md.
 */

const en = (geo) => ({
  incidentOptions: [
    'Truck or semi crash',
    'Car crash',
    'Motorcycle crash',
    'Pedestrian or cyclist',
    'Something else',
  ],

  difference: {
    heading: 'What a Utah wrongful death claim involves',
    lede:
      'You do not need to understand any of this today. It is here so you know what the ' +
      'conversation will cover when you are ready to have it.',
    items: [
      {
        h: 'Who is allowed to bring it',
        p:
          'Utah law limits a wrongful death claim to certain family members and to the personal ' +
          'representative of the estate. Sorting out who brings it, and on whose behalf, is one ' +
          'of the first things we handle so the family does not have to negotiate it.',
      },
      {
        h: 'The deadline is shorter than for injury',
        p:
          'Utah gives less time to file a wrongful death claim than an ordinary injury claim, and ' +
          'far less again when a government vehicle or a public entity is involved. This is the ' +
          'one part that genuinely cannot wait.',
      },
      {
        h: 'Evidence still disappears on a timer',
        p:
          'If a commercial truck was involved, its electronic data, the driver\'s logs and any ' +
          'camera footage are subject to the same retention windows as in any other case. Grief ' +
          'does not pause them.',
      },
      {
        h: 'The claim covers more than bills',
        p:
          'Funeral and medical expenses, the income and benefits your family has lost, and the ' +
          'loss of the person themselves — their care, their companionship, what they did for ' +
          'the household.',
      },
      {
        h: 'There may be a separate estate claim',
        p:
          'What your family member went through between the crash and their death can be a ' +
          'distinct claim brought by the estate, on top of the family\'s own.',
      },
      {
        h: 'You are not signing anything today',
        p:
          'A first conversation is a conversation. Many families call once to understand the ' +
          'deadlines, then call back weeks later. That is completely normal and it is fine.',
      },
    ],
  },

  firstHours: {
    heading: 'What we take off your hands',
    lede: 'The parts that have deadlines, so your family can deal with the parts that matter.',
    steps: [
      {
        h: 'The insurers stop calling you',
        p:
          'Every adjuster, from every company involved, is redirected to us from the day we are ' +
          'hired. You should not be taking claims calls this week.',
      },
      {
        h: 'We preserve the evidence',
        p:
          `Preservation letters go out immediately — vehicle data, driver records, camera footage, ` +
          `and the vehicles themselves before they are released or repaired.`,
      },
      {
        h: 'We handle the estate paperwork',
        p:
          'A wrongful death claim usually needs a personal representative appointed. We do that ' +
          'work rather than sending your family to a second lawyer to sort it out.',
      },
      {
        h: 'We find everyone responsible',
        p:
          `Not just the driver. The company they worked for, the broker, the maintenance shop, ` +
          `or whoever was responsible for the road on ${geo.roads[0]}.`,
      },
      {
        h: 'We deal with the bills',
        p:
          'Medical liens, funeral costs and health-insurer reimbursement claims all arrive at ' +
          'once and are all negotiable. Nobody in your family should be answering those letters.',
      },
    ],
  },

  faqs: (geo, site) => [
    {
      q: 'It just happened. Is it too early to call?',
      a: [
        'No, and there is no pressure attached to calling. Some families want to understand the ' +
          'deadlines and then take weeks before doing anything else. That is a completely ' +
          'reasonable way to handle it.',
        'The only genuinely time-sensitive part is preserving evidence, and that is something we ' +
          'can start without asking anything else of you.',
      ],
    },
    {
      q: 'How long does my family have to file?',
      a: [
        'Utah sets a shorter deadline for wrongful death than for injury claims, and a much ' +
          'shorter notice requirement when a government entity or vehicle is involved. Because it ' +
          'depends on the specific facts, it is worth one call to have it confirmed rather than ' +
          'assumed.',
      ],
    },
    {
      q: 'Will our family have to go to court?',
      a: [
        'Most of these resolve without a trial. Filing a case is not the same as trying one, and ' +
          'much of what happens is paperwork and negotiation your family never has to attend.',
        'If it does need a courtroom, you will know long before it gets there, and nobody is put ' +
          'on a witness stand by surprise.',
      ],
    },
    {
      q: 'What does this cost?',
      a: [
        'Nothing up front and nothing unless there is a recovery. The fee is a percentage agreed ' +
          'in writing beforehand, and case costs come out of the recovery, not out of your family.',
      ],
    },
    {
      q: 'Who will we actually be dealing with?',
      a: [
        `${site.intake.whoAnswers} ${site.intake.callbackSla} William Andrews handles these cases ` +
          'personally rather than passing them to a case manager.',
      ],
    },
  ],
});

/**
 * Spanish. The register shifts further here than in the other two files.
 *
 * "Wrongful death" has no good literal Spanish equivalent - "muerte injusta"
 * is a calque and reads as a translation error. "Muerte por negligencia" is
 * what Utah's Spanish-speaking bar and community actually say, so that is
 * what the page says.
 *
 * The immigration answer stays, because a family that has just lost someone
 * is even less likely to call if they think it will expose them.
 */
const es = (geo) => ({
  incidentOptions: [
    'Accidente con tráiler o camión de carga',
    'Accidente de carro',
    'Accidente de motocicleta',
    'Peatón o ciclista',
    'Otra cosa',
  ],

  difference: {
    heading: 'Qué implica un reclamo por muerte por negligencia en Utah',
    lede:
      'Usted no necesita entender nada de esto hoy. Está aquí para que sepa de qué se va a tratar ' +
      'la conversación cuando esté listo para tenerla.',
    items: [
      {
        h: 'Quién puede presentarlo',
        p:
          'La ley de Utah limita este reclamo a ciertos familiares y al representante personal de ' +
          'la sucesión. Definir quién lo presenta, y a nombre de quién, es de lo primero que ' +
          'resolvemos para que la familia no tenga que negociarlo entre sí.',
      },
      {
        h: 'El plazo es más corto que en lesiones',
        p:
          'Utah da menos tiempo para presentar un reclamo por muerte que para uno por lesiones, y ' +
          'mucho menos todavía cuando hay de por medio un vehículo del gobierno o una entidad ' +
          'pública. Esta es la única parte que de verdad no puede esperar.',
      },
      {
        h: 'La evidencia también se borra sola',
        p:
          'Si hubo un tráiler involucrado, sus datos electrónicos, los registros del chofer y ' +
          'cualquier video están sujetos a los mismos plazos de retención que en cualquier otro ' +
          'caso. El duelo no los detiene.',
      },
      {
        h: 'El reclamo cubre más que las cuentas',
        p:
          'Gastos funerarios y médicos, el ingreso y los beneficios que su familia perdió, y la ' +
          'pérdida de la persona misma: su cuidado, su compañía, lo que hacía por la casa.',
      },
      {
        h: 'Puede haber un reclamo aparte de la sucesión',
        p:
          'Lo que su familiar sufrió entre el accidente y su fallecimiento puede ser un reclamo ' +
          'distinto, presentado por la sucesión, además del de la familia.',
      },
      {
        h: 'Hoy usted no firma nada',
        p:
          'Una primera plática es solo una plática. Muchas familias llaman una vez para entender ' +
          'los plazos y vuelven a llamar semanas después. Eso es completamente normal y está bien.',
      },
    ],
  },

  firstHours: {
    heading: 'Lo que le quitamos de encima',
    lede: 'Las partes que tienen plazos, para que su familia atienda las que de verdad importan.',
    steps: [
      {
        h: 'Las aseguradoras dejan de llamarles',
        p:
          'Todos los ajustadores, de todas las compañías involucradas, se redirigen a nosotros ' +
          'desde el día que nos contrata. Usted no debería estar contestando llamadas de seguros ' +
          'esta semana.',
      },
      {
        h: 'Preservamos la evidencia',
        p:
          'Las cartas de preservación salen de inmediato: datos del vehículo, registros del ' +
          'chofer, videos de cámaras, y los vehículos mismos antes de que los entreguen o reparen.',
      },
      {
        h: 'Nos encargamos del papeleo de la sucesión',
        p:
          'Un reclamo por muerte normalmente requiere nombrar a un representante personal. Eso lo ' +
          'hacemos nosotros, en lugar de mandar a su familia con un segundo abogado.',
      },
      {
        h: 'Buscamos a todos los responsables',
        p:
          `No solo al chofer. También a la compañía para la que trabajaba, al bróker, al taller ` +
          `de mantenimiento, o a quien fuera responsable del camino en ${geo.roads[0]}.`,
      },
      {
        h: 'Atendemos las cuentas',
        p:
          'Los gravámenes médicos, los gastos funerarios y los reclamos de reembolso del seguro ' +
          'de salud llegan todos al mismo tiempo y todos son negociables. Nadie de su familia ' +
          'debería estar contestando esas cartas.',
      },
    ],
  },

  faqs: (geo, site) => [
    {
      q: 'Acaba de pasar. ¿Es muy pronto para llamar?',
      a: [
        'No, y llamar no lo compromete a nada. Algunas familias quieren entender los plazos y ' +
          'luego dejan pasar semanas antes de hacer cualquier otra cosa. Es una forma ' +
          'perfectamente razonable de manejarlo.',
        'Lo único verdaderamente urgente es preservar la evidencia, y eso podemos empezarlo sin ' +
          'pedirle nada más a usted.',
      ],
    },
    {
      q: '¿Nuestro estatus migratorio afecta el reclamo?',
      a: [
        'No. La familia puede presentar un reclamo por muerte por negligencia sin importar su ' +
          'estatus migratorio, y tampoco importa el de la persona que falleció.',
        'Lo que hablemos es confidencial. No le reportamos a inmigración.',
      ],
    },
    {
      q: '¿Cuánto tiempo tiene mi familia para presentarlo?',
      a: [
        'Utah fija un plazo más corto para muerte por negligencia que para reclamos por lesiones, ' +
          'y un aviso mucho más corto todavía cuando hay una entidad o un vehículo del gobierno ' +
          'de por medio. Como depende de los hechos concretos, vale una llamada para confirmarlo ' +
          'en vez de suponerlo.',
      ],
    },
    {
      q: '¿Nuestra familia va a tener que ir a la corte?',
      a: [
        'La mayoría de estos casos se resuelven sin juicio. Presentar un caso no es lo mismo que ' +
          'llevarlo a juicio, y gran parte del proceso es papeleo y negociación a la que su ' +
          'familia nunca tiene que asistir.',
        'Si llegara a hacer falta una corte, usted lo sabría con mucha anticipación, y a nadie se ' +
          'le sube al estrado por sorpresa.',
      ],
    },
    {
      q: '¿Cuánto cuesta?',
      a: [
        'Nada por adelantado y nada si no hay recuperación. Los honorarios son un porcentaje ' +
          'acordado por escrito de antemano, y los gastos del caso salen de la recuperación, no ' +
          'de su familia.',
      ],
    },
  ],
});

module.exports = { en, es };

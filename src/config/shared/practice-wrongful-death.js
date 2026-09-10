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

module.exports = (geo) => ({
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
      q: `Do we have to travel to Salt Lake?`,
      a: [geo.honesty.long, geo.honesty.meeting],
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

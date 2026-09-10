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

module.exports = (geo) => ({
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
      q: `How do you handle a case in ${geo.label} from Salt Lake?`,
      a: [geo.honesty.long, geo.honesty.meeting],
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

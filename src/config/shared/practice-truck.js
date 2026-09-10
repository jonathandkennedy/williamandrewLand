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

module.exports = (geo) => ({
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

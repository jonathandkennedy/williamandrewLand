/**
 * Geography.
 *
 * The point of this file is to make the pages beat the "they're not from
 * here" objection with specifics rather than a bullet list of city names.
 * Every road, hospital and landmark below is real. If a road is not one a
 * local would name, it does not belong here - a wrong detail is worse than
 * a generic one, because locals notice.
 *
 * `coverage` says which towns we take cases in and that we travel to the
 * client. It deliberately does NOT raise where the office is: intake covers
 * logistics on the call, and the landing page is not the place to answer an
 * objection the visitor has not made yet.
 */

module.exports = {
  'cache-valley': {
    key: 'cache-valley',
    label: 'Cache County',
    labelShort: 'Cache Valley',
    areaCode: '435',
    hub: 'Logan',
    driveFromOffice: 'about 80 miles, an hour and a half up through Sardine Canyon',
    roads: [
      'US-89/91 through Sardine Canyon',
      'US-91 north toward Richmond and the Idaho line',
      'Main Street and 200 North in Logan',
      'US-89 in Logan Canyon',
      'SR-30, SR-23 and SR-165',
    ],
    freightNote:
      'Nearly every semi in the valley comes over the same stretch of US-89/91 through Sardine ' +
      'Canyon, then runs north on US-91 or out to the food plants around Logan and Smithfield.',
    hospitals: ['Logan Regional Hospital', 'Cache Valley Hospital'],
    localColour:
      'USU lets out, Main Street backs up, and a loaded truck coming down out of the canyon ' +
      'needs a lot more room to stop than the car behind it does.',
    cities: [
      'Logan', 'North Logan', 'Smithfield', 'Hyrum', 'Providence', 'River Heights',
      'Nibley', 'Millville', 'Wellsville', 'Mendon', 'Hyde Park', 'Richmond',
      'Lewiston', 'Paradise', 'Newton', 'Clarkston', 'Amalga', 'Trenton',
    ],
    esLabel: 'el condado de Cache',
    esLabelShort: 'Cache Valley',
    es: {
      coverageShort: 'Tomamos casos de Cache Valley y vamos a donde usted esté.',
      meeting:
        'Nos vemos en Logan Regional, en Cache Valley Hospital, o en la mesa de su cocina. ' +
        'Consulta por video el mismo día si le resulta más fácil. Usted no maneja a ningún lado ' +
        'para contratarnos.',
    },
    coverage: {
      short: 'We take Cache Valley cases and come to you.',
      meeting:
        'We meet you at Logan Regional, at Cache Valley Hospital, or at your kitchen table. ' +
        'Same-day video consult if that is easier. You are not driving anywhere to hire us.',
    },
  },

  'salt-lake': {
    key: 'salt-lake',
    label: 'Salt Lake County',
    labelShort: 'Salt Lake',
    areaCode: '801',
    hub: 'Salt Lake City',
    driveFromOffice: 'downtown, on Main Street',
    roads: [
      'I-15 through the Salt Lake valley',
      'I-80 east to Parleys and west past the airport',
      'I-215 on both belts',
      'Bangerter Highway and Redwood Road',
      'State Street and 5400 South',
    ],
    freightNote:
      'The I-15 and I-80 interchange west of downtown is one of the heaviest freight junctions ' +
      'in the Intermountain West, and the distribution parks along Bangerter push trucks onto ' +
      'surface streets all day.',
    hospitals: ['Intermountain Medical Center', 'University of Utah Hospital', 'St. Mark’s Hospital'],
    localColour:
      'On I-15 through the valley a semi and a commuter are in the same lane at the same speed, ' +
      'and only one of them weighs 80,000 pounds.',
    cities: [
      'Salt Lake City', 'West Valley City', 'West Jordan', 'Sandy', 'South Jordan',
      'Murray', 'Taylorsville', 'Draper', 'Midvale', 'Riverton', 'Herriman',
      'Cottonwood Heights', 'Holladay', 'Millcreek', 'Magna', 'Bluffdale',
    ],
    esLabel: 'el condado de Salt Lake',
    esLabelShort: 'Salt Lake',
    es: {
      coverageShort: 'Nuestra oficina está en Main Street, en el centro. Puede llegar sin cita.',
      meeting:
        'Puede llegar sin cita al centro, o vamos a donde usted esté en todo el valle. Consulta ' +
        'por video el mismo día si le resulta más fácil.',
    },
    coverage: {
      short: 'Our office is on Main Street downtown. You can walk in.',
      meeting:
        'Walk in downtown, or we come to you anywhere in the valley. Same-day video consult if ' +
        'that is easier.',
    },
  },

  'weber-davis': {
    key: 'weber-davis',
    // Plain text, never HTML entities. Templates escape on output, so an
    // entity here would be escaped a second time and render literally.
    label: 'Weber & Davis County',
    labelShort: 'Ogden and Layton',
    areaCode: '801',
    hub: 'Ogden',
    driveFromOffice: 'about 35 miles up I-15',
    roads: [
      'I-15 between Farmington and Ogden',
      'US-89 through South Weber and Uintah',
      'Riverdale Road and Washington Boulevard',
      'Legacy Parkway and Antelope Drive',
      'I-84 out of Riverdale toward the canyon',
    ],
    freightNote:
      'I-15 north of Farmington carries the freight for the whole northern corridor, and the ' +
      'rail and distribution yards around Ogden put heavy trucks on Riverdale Road and ' +
      'Washington Boulevard at every hour.',
    hospitals: ['McKay-Dee Hospital', 'Davis Hospital and Medical Center', 'Layton Hospital'],
    localColour:
      'The I-15 stretch through Layton and Riverdale is stop-and-go one minute and 75 the next, ' +
      'which is exactly how loaded trucks end up in the back of stopped traffic.',
    cities: [
      'Ogden', 'Layton', 'Roy', 'Clearfield', 'Bountiful', 'Kaysville', 'Syracuse',
      'North Ogden', 'South Ogden', 'Riverdale', 'Farmington', 'Centerville',
      'Clinton', 'West Point', 'Woods Cross', 'South Weber',
    ],
    esLabel: 'los condados de Weber y Davis',
    esLabelShort: 'Ogden y Layton',
    es: {
      coverageShort: 'Tomamos casos de los condados de Weber y Davis y vamos a donde usted esté.',
      meeting:
        'Nos vemos en McKay-Dee, Davis Hospital, Layton Hospital o su casa. Consulta por video el ' +
        'mismo día si le resulta más fácil.',
    },
    coverage: {
      short: 'We take Weber and Davis County cases and come to you.',
      meeting:
        'We meet you at McKay-Dee, Davis Hospital, Layton Hospital or your house. Same-day video ' +
        'consult if that is easier.',
    },
  },
};

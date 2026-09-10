/**
 * Geography.
 *
 * The point of this file is to make the pages beat the "they're not from
 * here" objection with specifics rather than a bullet list of city names.
 * Every road, hospital and landmark below is real. If a road is not one a
 * local would name, it does not belong here - a wrong detail is worse than
 * a generic one, because locals notice.
 *
 * `honesty` is deliberately blunt about where the office actually is.
 * Pretending by omission is what the current geo pages do, and a Logan firm
 * can beat that with one sentence.
 */

const SLC_OFFICE = 'Salt Lake City';

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
      honestyShort: 'Nuestra oficina está en Salt Lake City, no en Logan. Se lo decimos de frente.',
      honestyLong:
        'Nuestra oficina está en Salt Lake City. No vamos a poner una dirección falsa de Logan en ' +
        'esta página. Lo que sí hacemos es subir: al hospital Logan Regional, a Cache Valley ' +
        'Hospital, o a la mesa de su cocina en Hyrum o Smithfield. De todos modos, casi todos los ' +
        'casos de tráiler del condado de Cache terminan con un despacho de Salt Lake o de Ogden, ' +
        'porque ahí es donde están los abogados que defienden a las compañías de transporte. La ' +
        'pregunta que vale no es quién está más cerca, sino quién consigue los datos electrónicos ' +
        'del tráiler antes de que se borren y quién habla primero con la aseguradora.',
      meeting:
        'Consulta por video el mismo día, una llamada esta noche, o subimos al valle a verlo esta ' +
        'semana. Usted nunca tiene que manejar hasta Salt Lake para contratarnos.',
    },
    honesty: {
      short: `Our office is in ${SLC_OFFICE}, not Logan. We say so up front.`,
      long:
        `Our office is in ${SLC_OFFICE}. We are not going to put a fake Logan address on this ` +
        `page. What we will do is drive up: to Logan Regional, to Cache Valley Hospital, or to ` +
        `your kitchen table in Hyrum or Smithfield. Most Cache County truck cases end up with a ` +
        `Salt Lake or Ogden firm anyway, because that is where the trucking defence lawyers are. ` +
        `The question worth asking is not who is closest. It is who gets the truck's electronic ` +
        `data before it is overwritten, and who talks to the carrier's insurer first.`,
      meeting:
        'Same-day video consult, a phone call tonight, or we come to you in the valley this week. ' +
        'You never have to drive to Salt Lake to hire us.',
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
      honestyShort: 'Nuestra oficina está en Main Street, en el centro. Puede llegar sin cita.',
      honestyLong:
        'Nuestra oficina está en el 299 South Main Street, en el centro. Si prefiere venir y ' +
        'sentarse frente al abogado que de verdad va a llevar su caso, puede hacerlo. Si prefiere ' +
        'no moverse, nosotros vamos al hospital o a su casa.',
      meeting:
        'Puede llegar sin cita al centro, o vamos a donde usted esté en todo el valle. Consulta ' +
        'por video el mismo día si le resulta más fácil.',
    },
    honesty: {
      short: 'Our office is on Main Street downtown. You can walk in.',
      long:
        'Our office is at 299 South Main Street, downtown. If you would rather come in and ' +
        'sit across a desk from the attorney who will actually handle your case, you can. ' +
        'If you would rather not move, we will come to the hospital or to your house.',
      meeting:
        'Walk in downtown, or we come to you anywhere in the valley. Video consult the same day ' +
        'if that is easier.',
    },
  },

  'weber-davis': {
    key: 'weber-davis',
    label: 'Weber &amp; Davis County',
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
      honestyShort: 'Nuestra oficina está en Salt Lake, como media hora por la I-15.',
      honestyLong:
        'Nuestra oficina está en Salt Lake City, más o menos media hora por la I-15. Vamos a ' +
        'McKay-Dee, a Davis Hospital, a Layton Hospital, o a su casa. Usted no va a andar ' +
        'manejando a Salt Lake para firmar papeles.',
      meeting:
        'Vamos a donde usted esté en los condados de Weber o Davis, o nos vemos por video el ' +
        'mismo día.',
    },
    honesty: {
      short: 'Our office is in Salt Lake, about 35 minutes down I-15.',
      long:
        'Our office is in Salt Lake City, roughly half an hour down I-15. We come to McKay-Dee, ' +
        'to Davis Hospital, to Layton Hospital, or to your house. You will not be driving to ' +
        'Salt Lake to sign paperwork.',
      meeting: 'We come to you in Weber or Davis County, or meet by video the same day.',
    },
  },
};

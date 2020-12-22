export const US_STATES = [
  {
    abbreviated: 'AL',
    complete: 'Alabama'
  },
  {
    abbreviated: 'AK',
    complete: 'Alaska'
  },
  {
    abbreviated: 'AZ',
    complete: 'Arizona'
  },
  {
    abbreviated: 'AR',
    complete: 'Arkansas'
  },
  {
    abbreviated: 'CA',
    complete: 'California'
  },
  {
    abbreviated: 'CO',
    complete: 'Colorado'
  },
  {
    abbreviated: 'CT',
    complete: 'Connecticut'
  },
  {
    abbreviated: 'DE',
    complete: 'Delaware'
  },
  {
    abbreviated: 'DC',
    complete: 'District of Columbia'
  },
  {
    abbreviated: 'FL',
    complete: 'Florida'
  },
  {
    abbreviated: 'GA',
    complete: 'Georgia'
  },
  {
    abbreviated: 'HI',
    complete: 'Hawaii'
  },
  {
    abbreviated: 'ID',
    complete: 'Idaho'
  },
  {
    abbreviated: 'IL',
    complete: 'Illinois'
  },
  {
    abbreviated: 'IN',
    complete: 'Indiana'
  },
  {
    abbreviated: 'IA',
    complete: 'Iowa'
  },
  {
    abbreviated: 'KS',
    complete: 'Kansas'
  },
  {
    abbreviated: 'KY',
    complete: 'Kentucky'
  },
  {
    abbreviated: 'LA',
    complete: 'Louisiana'
  },
  {
    abbreviated: 'ME',
    complete: 'Maine'
  },
  {
    abbreviated: 'MD',
    complete: 'Maryland'
  },
  {
    abbreviated: 'MA',
    complete: 'Massachusetts'
  },
  {
    abbreviated: 'MI',
    complete: 'Michigan'
  },
  {
    abbreviated: 'MN',
    complete: 'Minnesota'
  },
  {
    abbreviated: 'MS',
    complete: 'Mississippi'
  },
  {
    abbreviated: 'MO',
    complete: 'Missouri'
  },
  {
    abbreviated: 'MT',
    complete: 'Montana'
  },
  {
    abbreviated: 'NE',
    complete: 'Nebraska'
  },
  {
    abbreviated: 'NV',
    complete: 'Nevada'
  },
  {
    abbreviated: 'NH',
    complete: 'New Hampshire'
  },
  {
    abbreviated: 'NJ',
    complete: 'New Jersey'
  },
  {
    abbreviated: 'NM',
    complete: 'New Mexico'
  },
  {
    abbreviated: 'NY',
    complete: 'New York'
  },
  {
    abbreviated: 'NC',
    complete: 'North Carolina'
  },
  {
    abbreviated: 'ND',
    complete: 'North Dakota'
  },
  {
    abbreviated: 'OH',
    complete: 'Ohio'
  },
  {
    abbreviated: 'OK',
    complete: 'Oklahoma'
  },
  {
    abbreviated: 'OR',
    complete: 'Oregon'
  },
  {
    abbreviated: 'PA',
    complete: 'Pennsylvania'
  },
  {
    abbreviated: 'RI',
    complete: 'Rhode Island'
  },
  {
    abbreviated: 'SC',
    complete: 'South Carolina'
  },
  {
    abbreviated: 'SD',
    complete: 'South Dakota'
  },
  {
    abbreviated: 'TN',
    complete: 'Tennessee'
  },
  {
    abbreviated: 'TX',
    complete: 'Texas'
  },
  {
    abbreviated: 'UT',
    complete: 'Utah'
  },
  {
    abbreviated: 'VT',
    complete: 'Vermont'
  },
  {
    abbreviated: 'VA',
    complete: 'Virginia'
  },
  {
    abbreviated: 'WA',
    complete: 'Washington'
  },
  {
    abbreviated: 'WV',
    complete: 'West Virginia'
  },
  {
    abbreviated: 'WI',
    complete: 'Wisconsin'
  },
  {
    abbreviated: 'WY',
    complete: 'Wyoming'
  }
] as const

export const US_STATES_ABBREVIATED = US_STATES.map(state => state.abbreviated)
export const US_STATES_COMPLETE = US_STATES.map(state => state.complete)

export const US_POSTAL_CODE_REGEX = new RegExp(/^\d{5}(-\d{4})?$/)

export const CA_PROVINCES = [
  {
    abbreviated: 'ON',
    complete: 'Ontario'
  },
  {
    abbreviated: 'QC',
    complete: 'Quebec'
  },
  {
    abbreviated: 'NS',
    complete: 'Nova Scotia'
  },
  {
    abbreviated: 'NB',
    complete: 'New Brunswick'
  },
  {
    abbreviated: 'MB',
    complete: 'Manitoba'
  },
  {
    abbreviated: 'BC',
    complete: 'British Columbia'
  },
  {
    abbreviated: 'PE',
    complete: 'Prince Edward Island'
  },
  {
    abbreviated: 'SK',
    complete: 'Saskatchewan'
  },
  {
    abbreviated: 'AB',
    complete: 'Alberta'
  },
  {
    abbreviated: 'NL',
    complete: 'Newfoundland and Labrador'
  }
] as const

export const CA_PROVINCES_ABBREVIATED = CA_PROVINCES.map(
  province => province.abbreviated
)

export const CA_PROVINCES_COMPLETE = CA_PROVINCES.map(
  province => province.complete
)

export const CA_POSTAL_CODE_REGEX = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
)

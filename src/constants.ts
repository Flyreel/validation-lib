import {
  InspectionFlyreelType,
  InspectionPolicyType,
  ValidCountry
} from './types'

export const FLYREEL_TYPES = [
  InspectionFlyreelType.INSPECTION,
  InspectionFlyreelType.HOME_REVIEW,
  InspectionFlyreelType.CLAIM
]

export const FLYREEL_POLICY_TYPES = [
  InspectionPolicyType.NEW,
  InspectionPolicyType.RENEWAL
]

export const US_STATES = [
  { abbr: 'AL', full: 'Alabama' },
  { abbr: 'AK', full: 'Alaska' },
  { abbr: 'AZ', full: 'Arizona' },
  { abbr: 'AR', full: 'Arkansas' },
  { abbr: 'CA', full: 'California' },
  { abbr: 'CO', full: 'Colorado' },
  { abbr: 'CT', full: 'Connecticut' },
  { abbr: 'DE', full: 'Delaware' },
  { abbr: 'DC', full: 'District of Columbia' },
  { abbr: 'FL', full: 'Florida' },
  { abbr: 'GA', full: 'Georgia' },
  { abbr: 'HI', full: 'Hawaii' },
  { abbr: 'ID', full: 'Idaho' },
  { abbr: 'IL', full: 'Illinois' },
  { abbr: 'IN', full: 'Indiana' },
  { abbr: 'IA', full: 'Iowa' },
  { abbr: 'KS', full: 'Kansas' },
  { abbr: 'KY', full: 'Kentucky' },
  { abbr: 'LA', full: 'Louisiana' },
  { abbr: 'ME', full: 'Maine' },
  { abbr: 'MD', full: 'Maryland' },
  { abbr: 'MA', full: 'Massachusetts' },
  { abbr: 'MI', full: 'Michigan' },
  { abbr: 'MN', full: 'Minnesota' },
  { abbr: 'MS', full: 'Mississippi' },
  { abbr: 'MO', full: 'Missouri' },
  { abbr: 'MT', full: 'Montana' },
  { abbr: 'NE', full: 'Nebraska' },
  { abbr: 'NV', full: 'Nevada' },
  { abbr: 'NH', full: 'New Hampshire' },
  { abbr: 'NJ', full: 'New Jersey' },
  { abbr: 'NM', full: 'New Mexico' },
  { abbr: 'NY', full: 'New York' },
  { abbr: 'NC', full: 'North Carolina' },
  { abbr: 'ND', full: 'North Dakota' },
  { abbr: 'OH', full: 'Ohio' },
  { abbr: 'OK', full: 'Oklahoma' },
  { abbr: 'OR', full: 'Oregon' },
  { abbr: 'PA', full: 'Pennsylvania' },
  { abbr: 'RI', full: 'Rhode Island' },
  { abbr: 'SC', full: 'South Carolina' },
  { abbr: 'SD', full: 'South Dakota' },
  { abbr: 'TN', full: 'Tennessee' },
  { abbr: 'TX', full: 'Texas' },
  { abbr: 'UT', full: 'Utah' },
  { abbr: 'VT', full: 'Vermont' },
  { abbr: 'VA', full: 'Virginia' },
  { abbr: 'WA', full: 'Washington' },
  { abbr: 'WV', full: 'West Virginia' },
  { abbr: 'WI', full: 'Wisconsin' },
  { abbr: 'WY', full: 'Wyoming' }
] as const

export const CA_PROVINCES = [
  { abbr: 'ON', full: 'Ontario' },
  { abbr: 'QC', full: 'Quebec' },
  { abbr: 'NS', full: 'Nova Scotia' },
  { abbr: 'NB', full: 'New Brunswick' },
  { abbr: 'MB', full: 'Manitoba' },
  { abbr: 'BC', full: 'British Columbia' },
  { abbr: 'PE', full: 'Prince Edward Island' },
  { abbr: 'SK', full: 'Saskatchewan' },
  { abbr: 'AB', full: 'Alberta' },
  { abbr: 'NL', full: 'Newfoundland and Labrador' }
] as const

export const VALID_COUNTRIES = [ValidCountry.US, ValidCountry.CA]

export const US_STATES_ABBR = US_STATES.map(state => state.abbr)
export const US_STATES_FULL = US_STATES.map(state => state.full)
export const CA_PROVINCES_ABBR = CA_PROVINCES.map(province => province.abbr)
export const CA_PROVINCES_FULL = CA_PROVINCES.map(province => province.full)

export const CA_POSTAL_CODE_REGEX = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
)

export const US_POSTAL_CODE_REGEX = new RegExp(/^\d{5}(-\d{4})?$/)

export const URL_REGEX = new RegExp(
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
)

export const PHONE_VALIDATION_MESSAGES = {
  FALLBACK: 'Invalid phone number',
  INVALID_COUNTRY_CODE: 'Country is not currently supported',
  MISSING_PHONE_NUMBER: 'No phone number provided',
  NOT_POSSIBLE:
    'Not a valid phone number, failed at either the phone number length or matching any regular expressions'
}

export const VALIDATION_MESSAGES = {
  PHONE: PHONE_VALIDATION_MESSAGES,
  FLYREEL_TYPE: `Must be one of ${FLYREEL_TYPES}`,
  POLICY_TYPE: `Must be one of ${FLYREEL_POLICY_TYPES}`,
  DATES: {
    CARRIER_EXP_SEVEN: 'Carrier Expiration must be at least a week from now',
    EXPIRATION_FIVE: 'Expiration must be at least 5 days from now',
    DIFF_TOO_SMALL:
      'Carrier Expiration must be at least 2 days after the Expiration'
  },
  EMAIL: {
    INVALID_FORMAT: 'Invalid email format'
  },
  ZIP_CODE: {
    INVALID_CA_CODE: 'Invalid Canadian Postal Code',
    INVALID_US_CODE: 'Invalid US Postal Code'
  },
  GENERAL: {
    TOO_SHORT_MONGO: 'Too short, value should be 24 characters',
    TOO_SHORT: 'Too short, value should be greater than 1 character long',
    REQUIRED: 'Required'
  },
  STATE: {
    INVALID_CA_PROVINCE: `Must be one of ${CA_PROVINCES_ABBR}`,
    INVALID_US_STATE: `Must be one of ${US_STATES_ABBR}`
  }
}

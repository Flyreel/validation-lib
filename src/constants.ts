import {
  InspectionStatus,
  InspectionFlyreelType,
  InspectionPolicyType,
  ValidCountry
} from './types'

export const FLYREEL_STATUS = [
  { label: 'Abandoned', value: InspectionStatus.ABANDONED },
  { label: 'Cancelled', value: InspectionStatus.CANCELLED },
  { label: 'Completed', value: InspectionStatus.COMPLETED },
  { label: 'Expired', value: InspectionStatus.EXPIRED },
  { label: 'Invited', value: InspectionStatus.INVITED },
  { label: 'In Review', value: InspectionStatus.IN_REVIEW },
  {
    label: 'Ready for Review',
    value: InspectionStatus.READY_FOR_REVIEW
  },
  { label: 'Started', value: InspectionStatus.STARTED },
  { label: 'Submitted', value: InspectionStatus.SUBMITTED }
]

export const FLYREEL_INSPECTION_STATUSES = FLYREEL_STATUS.map(
  status => status.value
)

export const FLYREEL_TYPES = [
  InspectionFlyreelType.UNKNOWN,
  InspectionFlyreelType.INSPECTION,
  InspectionFlyreelType.HOME_REVIEW,
  InspectionFlyreelType.CLAIM
]

export const FLYREEL_POLICY_TYPES = [
  InspectionPolicyType.NEW,
  InspectionPolicyType.RENEWAL,
  InspectionPolicyType.UNKNOWN
]

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
] as const

export const CA_PROVINCES = [
  { value: 'ON', label: 'Ontario' },
  { value: 'QC', label: 'Quebec' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'AB', label: 'Alberta' },
  { value: 'NL', label: 'Newfoundland and Labrador' }
] as const

export const VALID_COUNTRIES = [ValidCountry.US, ValidCountry.CA]

export const US_STATES_ABBR = US_STATES.map(state => state.value)
export const US_STATES_FULL = US_STATES.map(state => state.label)
export const CA_PROVINCES_ABBR = CA_PROVINCES.map(province => province.value)
export const CA_PROVINCES_FULL = CA_PROVINCES.map(province => province.label)

export const LOCATION_TYPES = ['Point']

export const CA_POSTAL_CODE_REGEX = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
)

export const US_POSTAL_CODE_REGEX = new RegExp(/^\d{5}$/)

export const URL_REGEX = new RegExp(
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
)

export const MONGOID_REGEX = new RegExp(/^[a-f\d]{24}$/i)

export const NA_PHONE_REGEX = new RegExp(
  /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
)

export const PHONE_VALIDATION_MESSAGES = {
  FALLBACK: 'Invalid phone number',
  INVALID_COUNTRY_CODE: 'Country is not currently supported',
  MISSING_PHONE_NUMBER: 'No phone number provided',
  NOT_POSSIBLE:
    'Invalid, failed at either the phone number length or matching any regular expressions'
}

export const VALIDATION_MESSAGES = {
  PHONE: 'Invalid North American phone number',
  INVALID_COUNTRY_CODE: 'Country is not currently supported',
  REQUIRE_TWO_COORDINATES: '[number, number] required',
  FLYREEL_TYPE: `Must be one of ${FLYREEL_TYPES}`,
  POLICY_TYPE: `Must be one of ${FLYREEL_POLICY_TYPES}`,
  STATUS: `Must be one of ${FLYREEL_INSPECTION_STATUSES}`,
  LOCATION_TYPE: `Invalid location type, must be one of ${LOCATION_TYPES}`,
  MONGO_ID: 'Invalid Mongo Object ID format',
  DATES: {
    CARRIER_EXP_MAX:
      'Carrier Expiration date cannot be more than 367 days from now',
    CARRIER_EXP_MIN: 'Carrier Expiration date must be at least a week from now',
    EXPIRATION_EDIT_CREATED:
      'Expiration date cannot be set before the day this inspection was created',
    EXPIRATION_AFTER_TODAY: 'Expiration date must be after today',
    EXPIRATION_MIN: 'Expiration date must be at least 5 days from now',
    EXPIRATION_MAX: 'Expiration date cannot be more than 365 days from now',
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
    INVALID_CA_PROVINCE: `Must be a valid Canadian Province`,
    INVALID_US_STATE: `Must be a valid US State (abbreviated)`
  }
}

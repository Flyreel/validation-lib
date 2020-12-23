import { ParseError } from 'libphonenumber-js'
import * as Yup from 'yup'
import {
  CA_POSTAL_CODE_REGEX,
  CA_PROVINCES_ABBR,
  URL_REGEX,
  US_POSTAL_CODE_REGEX,
  US_STATES_ABBR
} from '../constants'
import {
  ExtendedYupType,
  InspectionFlyreelType,
  InspectionPolicyType,
  ValidCountry
} from '../types'
import { validatePhoneNumber } from '../utils'

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isUrl', function(message: string) {
  return this.test('validateIsUrl', message, function(value) {
    return !value || URL_REGEX.test(value)
      ? true
      : this.createError({ message })
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isUSPostalCode', function(
  message: string
) {
  return this.test('validateIsUSPostalCode', message, function(value) {
    return !value || US_POSTAL_CODE_REGEX.test(value)
      ? true
      : this.createError({ message })
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isCAPostalCode', function(
  message: string
) {
  return this.test('validateIsCAPostalCode', message, function(value) {
    return !value || CA_POSTAL_CODE_REGEX.test(value)
      ? true
      : this.createError({ message })
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isPhone', function(
  errorMessage?: string
) {
  let errMsg = errorMessage ?? '${path} must be a valid phone number.'

  return this.test('validateIsPhone', errMsg, value => {
    try {
      return validatePhoneNumber(value)
    } catch (error) {
      if (error instanceof ParseError) {
        errMsg = error.message
      }
      return false
    }
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isUSPhone', function(
  errorMessage?: string
) {
  let errMsg = errorMessage ?? '${path} must be a valid US phone number.'
  return this.test('validateIsUSPhone', errMsg, value => {
    try {
      return validatePhoneNumber(value, ValidCountry.US)
    } catch (error) {
      if (error instanceof ParseError) {
        errMsg = error.message
      }
      return false
    }
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isCAPhone', function(
  errorMessage?: string
) {
  let errMsg = errorMessage ?? '${path} must be a valid Canadian phone number.'

  return this.test('validateIsCAPhone', errMsg, value => {
    try {
      return validatePhoneNumber(value, ValidCountry.CA)
    } catch (error) {
      if (error instanceof ParseError) {
        errMsg = error.message
      }
      return false
    }
  })
})

const inspectionValidationOptionalSchema = (Yup as ExtendedYupType)
  .object()
  .shape({
    address2: (Yup as ExtendedYupType)
      .string()
      .min(1, 'Valid address required')
      .nullable(),
    agent_email: (Yup as ExtendedYupType)
      .string()
      .nullable()
      .when('agent_email', {
        is: (value: string | undefined) => value !== undefined,
        then: (Yup as ExtendedYupType).string().email('Valid email required')
      }),

    agent_name: (Yup as ExtendedYupType)
      .string()
      .nullable()
      .when('agent_name', {
        is: (value: string | undefined) => value !== undefined,
        then: (Yup as ExtendedYupType).string().min(1, 'Valid name required')
      }),

    agent_phone: (Yup as ExtendedYupType)
      .string()
      .isPhone('Not a valid phone number')
      .nullable(),

    carrier: (Yup as ExtendedYupType).string().notRequired(),

    longitude: (Yup as ExtendedYupType).number().nullable(),
    latitude: (Yup as ExtendedYupType).number().nullable()
  })

export const inspectionValidationSchema = (Yup as ExtendedYupType)
  .object()
  .shape({
    address1: (Yup as ExtendedYupType)
      .string()
      .min(1, 'Please enter a valid address')
      .required('Address Required'),

    city: (Yup as ExtendedYupType).string().required('City is required'),

    conversation: (Yup as ExtendedYupType)
      .string()
      .required('Conversation ID Required'),

    country: (Yup as ExtendedYupType)
      .string()
      .nullable()
      .default(ValidCountry.US)
      .oneOf([ValidCountry.US, ValidCountry.CA], 'Country not supported'),

    first_name: (Yup as ExtendedYupType)
      .string()
      .required('First Name required')
      .min(1, 'Valid first name required'),

    last_name: (Yup as ExtendedYupType)
      .string()
      .required('Last Name required')
      .min(1, 'Valid last name required'),

    flyreel_type: (Yup as ExtendedYupType)
      .string()
      .nullable()
      .default(InspectionFlyreelType.INSPECTION)
      .oneOf(
        [
          InspectionFlyreelType.INSPECTION,
          InspectionFlyreelType.HOME_REVIEW,
          InspectionFlyreelType.CLAIM
        ],
        'Flyreel Type Required'
      ),

    phone: (Yup as ExtendedYupType).string().when('country', {
      is: ValidCountry.CA,
      then: (Yup as ExtendedYupType)
        .string()
        .isCAPhone('Not a valid Canadian phone number is required')
        .required('A valid Canadian phone number is required'),
      otherwise: (Yup as ExtendedYupType)
        .string()
        .isUSPhone('Not a valid US phone number is required')
        .required('A valid US phone number is required')
    }),

    policy_id: (Yup as ExtendedYupType).string().required('Policy ID required'),

    policy_type: (Yup as ExtendedYupType)
      .string()
      .nullable()
      .default(InspectionPolicyType.NEW)
      .oneOf(
        [InspectionPolicyType.NEW, InspectionPolicyType.RENEWAL],
        'Policy Type Required'
      ),

    state: (Yup as ExtendedYupType).string().when('country', {
      is: ValidCountry.CA,
      then: (Yup as ExtendedYupType)
        .string()
        .required('A valid Canadian Province (abbreviated) is required')
        .oneOf(
          CA_PROVINCES_ABBR,
          'Not a valid Canadian Province (abbreviated form)'
        ),
      otherwise: (Yup as ExtendedYupType)
        .string()
        .required('A valid state (abbreviated) is required')
        .oneOf(US_STATES_ABBR, 'Not a valid US State (abbreviated form)')
    }),

    zip_code: (Yup as ExtendedYupType)
      .string()
      .required('Postal Code required')
      .when('country', {
        is: ValidCountry.CA,
        then: (Yup as ExtendedYupType)
          .string()
          .isCAPostalCode('A valid Canadian Postal Code is required'),
        otherwise: (Yup as ExtendedYupType)
          .string()
          .isUSPostalCode('A valid Canadian Postal Code is required')
      })
  })
  .concat(inspectionValidationOptionalSchema)

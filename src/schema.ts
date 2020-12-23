import * as Yup from 'yup'
import {
  CA_POSTAL_CODE_REGEX,
  CA_PROVINCES_ABBR,
  US_POSTAL_CODE_REGEX,
  US_STATES_ABBR
} from './constants'
import {
  InspectionFlyreelType,
  InspectionPolicyType,
  InspectionToBeValidated,
  InspectionValidationResult,
  ValidCountry
} from './types'
import { extendValidators } from './extendValidators'
import { validatePhoneNumber } from './utils'

extendValidators()

const inspectionValidationSchema = Yup.object().shape({
  address2: Yup.lazy(value => {
    if (value !== undefined) {
      return Yup.string()
        .nullable()
        .min(1, 'Valid address required')
    }
    return Yup.string().notRequired()
  }),

  agent_email: Yup.lazy(value => {
    if (value !== undefined) {
      return Yup.string().email('Invalid email address')
    }
    return Yup.string().notRequired()
  }),

  agent_name: Yup.lazy(value => {
    if (value !== undefined) {
      return Yup.string().min(1, 'Valid name required')
    }
    return Yup.string().notRequired()
  }),

  agent_phone: Yup.lazy(value => {
    if (value !== undefined) {
      return Yup.string().test({
        name: 'validateUSPhone',
        test: function(value) {
          const { errorMessage, isValid } = validatePhoneNumber(value)
          return !isValid
            ? this.createError({ message: errorMessage, path: this.path })
            : true
        }
      })
    }

    return Yup.string().notRequired()
  }),

  carrier: Yup.string().optional(),

  longitude: Yup.number().nullable(),

  latitude: Yup.number().nullable(),

  address1: Yup.string()
    .min(1, 'Please enter a valid address')
    .required('Address Required'),

  city: Yup.string().required('City is required'),

  conversation: Yup.string().required('Conversation ID Required'),

  country: Yup.string()
    .nullable()
    .default(ValidCountry.US)
    .oneOf([ValidCountry.US, ValidCountry.CA], 'Country not supported'),

  first_name: Yup.string()
    .required('First Name required')
    .min(1, 'Valid first name required'),

  last_name: Yup.string()
    .required('Last Name required')
    .min(1, 'Valid last name required'),

  flyreel_type: Yup.string()
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

  phone: Yup.string()
    .when('country', {
      is: ValidCountry.CA,
      then: Yup.string().test({
        name: 'validateIsCAPhone',
        test: function(value) {
          const { errorMessage, isValid } = validatePhoneNumber(
            value,
            ValidCountry.CA
          )
          return !isValid
            ? this.createError({ message: errorMessage, path: this.path })
            : true
        }
      }),
      otherwise: Yup.string().test({
        name: 'validateUSPhone',
        test: function(value) {
          const { errorMessage, isValid } = validatePhoneNumber(value)
          return !isValid
            ? this.createError({ message: errorMessage, path: this.path })
            : true
        }
      })
    })
    .required(),

  policy_id: Yup.string().required('Policy ID required'),

  policy_type: Yup.string()
    .nullable()
    .default(InspectionPolicyType.NEW)
    .oneOf(
      [InspectionPolicyType.NEW, InspectionPolicyType.RENEWAL],
      'Policy Type Required'
    ),

  state: Yup.string()
    .when('country', {
      is: ValidCountry.CA,
      then: Yup.string().oneOf(
        CA_PROVINCES_ABBR,
        `A valid Canadian Province (abbreviated) is required; Allowed values include ${CA_PROVINCES_ABBR}`
      ),
      otherwise: Yup.string().oneOf(
        US_STATES_ABBR,
        `A valid US State (abbreviated) is required; Allowed values include ${US_STATES_ABBR}`
      )
    })
    .required(),

  zip_code: Yup.string()
    .when('country', {
      is: ValidCountry.CA,
      then: Yup.string().test({
        name: 'validateCAPostalCode',
        test: function(value) {
          const { createError, path } = this
          return !value || CA_POSTAL_CODE_REGEX.test(value)
            ? true
            : createError({
                path,
                message:
                  'Postal Code provided is not a valid Canadian Postal Code'
              })
        }
      }),
      otherwise: Yup.string().test({
        name: 'validateUSPostalCode',
        test: function(value) {
          const { createError, path } = this
          return !value || US_POSTAL_CODE_REGEX.test(value)
            ? true
            : createError({
                path,
                message: 'Postal Code provided is not a valid US Postal Code'
              })
        }
      })
    })
    .required()
})

export async function validateInspection(
  inspection: Partial<InspectionToBeValidated>
): Promise<InspectionValidationResult> {
  const errors: InspectionValidationResult['errors'] = {}

  await inspectionValidationSchema
    .validate(inspection, { abortEarly: false })
    .catch((err: Yup.ValidationError) => {
      err.inner.forEach(err => {
        if (err.path) {
          Object.assign(errors, { [err.path]: err.message })
        }
      })
      return errors
    })

  return {
    isValid: Object.keys(errors).length < 1,
    errors
  }
}

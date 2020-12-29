import * as Yup from 'yup'
import {
  CA_POSTAL_CODE_REGEX,
  CA_PROVINCES_ABBR,
  FLYREEL_POLICY_TYPES,
  FLYREEL_TYPES,
  US_POSTAL_CODE_REGEX,
  US_STATES_ABBR,
  VALIDATION_MESSAGES
} from '../constants'
import {
  InspectionFlyreelType,
  InspectionPolicyType,
  InspectionToBeValidated,
  ValidCountry
} from '../types'
import { useValidatePhoneNumber } from '../utils'

const { CA, US } = ValidCountry
const { EMAIL, DATES, PHONE, GENERAL, STATE, ZIP_CODE } = VALIDATION_MESSAGES

function getDateFromNow(numberOfDays: number) {
  const dateFromNow = new Date()
  dateFromNow.setDate(dateFromNow.getDate() + numberOfDays)
  return dateFromNow
}

function checkOptionalString(value: string | undefined) {
  if (value !== undefined) {
    return Yup.string()
      .min(1, GENERAL.TOO_SHORT)
      .strict()
  }
  return Yup.string().notRequired()
}

function checkOptionalEmail(value: string | undefined) {
  if (value !== undefined) {
    return Yup.string()
      .trim()
      .email(EMAIL.INVALID_FORMAT)
  }
  return Yup.string().notRequired()
}

export const inspectionValidationSchema: Yup.SchemaOf<InspectionToBeValidated> = Yup.object()
  .shape({
    agent_email: Yup.lazy(checkOptionalEmail),

    agent_name: Yup.lazy(checkOptionalString),

    agent_phone: Yup.lazy(value => {
      if (value !== undefined) {
        return Yup.string().test({
          test: function(value) {
            const { errorMessage, isValid } = useValidatePhoneNumber(value)
            const { createError, path } = this
            return isValid ?? createError({ message: errorMessage, path })
          }
        })
      }
      return Yup.string().notRequired()
    }),

    address1: Yup.string()
      .required(GENERAL.REQUIRED)
      .trim()
      .min(1, GENERAL.TOO_SHORT),

    address2: Yup.lazy(checkOptionalString),

    carrier: Yup.string().optional(),

    carrier_expiration: Yup.date()
      .default(getDateFromNow(7))
      .min(getDateFromNow(7), DATES.CARRIER_EXP_SEVEN)
      .test('isGreaterThanTwoDaysDif', DATES.DIFF_TOO_SMALL, function(
        carrier_expiration
      ) {
        const { createError, path, parent } = this
        const expiration = parent.expiration as Date
        const a = new Date(expiration)
        const b = new Date(carrier_expiration)
        const _MS_PER_DAY = 1000 * 60 * 60 * 24
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
        const dif = Math.floor((utc2 - utc1) / _MS_PER_DAY)
        return dif >= 2 ?? createError({ message: DATES.DIFF_TOO_SMALL, path })
      }),

    city: Yup.string()
      .required(GENERAL.REQUIRED)
      .trim()
      .min(1, GENERAL.TOO_SHORT),

    conversation: Yup.string()
      .trim()
      .min(24, GENERAL.TOO_SHORT_MONGO)
      .required(GENERAL.REQUIRED),

    country: Yup.string()
      .uppercase()
      .default(US)
      .oneOf([US, CA], PHONE.INVALID_COUNTRY_CODE),

    expiration: Yup.date()
      .default(getDateFromNow(5))
      .min(getDateFromNow(5), DATES.EXPIRATION_FIVE),

    first_name: Yup.string()
      .trim()
      .min(1, GENERAL.TOO_SHORT)
      .required(GENERAL.REQUIRED),

    longitude: Yup.number().nullable(),

    latitude: Yup.number().nullable(),

    last_name: Yup.string()
      .trim()
      .min(1, GENERAL.TOO_SHORT)
      .required(GENERAL.REQUIRED),

    email: Yup.string()
      .required(GENERAL.REQUIRED)
      .trim()
      .email(EMAIL.INVALID_FORMAT),

    flyreel_type: Yup.string()
      .lowercase()
      .default(InspectionFlyreelType.INSPECTION)
      .oneOf(FLYREEL_TYPES, VALIDATION_MESSAGES.FLYREEL_TYPE),

    phone: Yup.string()
      .required(PHONE.MISSING_PHONE_NUMBER)
      .when('country', {
        is: CA,
        then: Yup.string().test({
          test: function(value) {
            const { errorMessage, isValid } = useValidatePhoneNumber(value, CA)
            const { createError, path } = this
            return isValid ?? createError({ message: errorMessage, path: path })
          }
        }),
        otherwise: Yup.string().test({
          test: function(value) {
            const { errorMessage, isValid } = useValidatePhoneNumber(value, US)
            const { createError, path } = this
            return isValid ?? createError({ message: errorMessage, path })
          }
        })
      }),

    policy_id: Yup.string()
      .trim()
      .required(GENERAL.REQUIRED),

    policy_type: Yup.string()
      .lowercase()
      .nullable()
      .default(InspectionPolicyType.NEW)
      .oneOf(FLYREEL_POLICY_TYPES, VALIDATION_MESSAGES.POLICY_TYPE),

    state: Yup.string()
      .uppercase()
      .required(GENERAL.REQUIRED)
      .when('country', {
        is: CA,
        then: Yup.string().oneOf(CA_PROVINCES_ABBR, STATE.INVALID_CA_PROVINCE),
        otherwise: Yup.string().oneOf(US_STATES_ABBR, STATE.INVALID_US_STATE)
      }),

    zip_code: Yup.string()
      .uppercase()
      .required(GENERAL.REQUIRED)
      .when('country', {
        is: CA,
        then: Yup.string().test({
          test: function(value) {
            const { createError, path } = this
            return !value || CA_POSTAL_CODE_REGEX.test(value)
              ? true
              : createError({ path, message: ZIP_CODE.INVALID_CA_CODE })
          }
        }),
        otherwise: Yup.string().test({
          test: function(value) {
            const { createError, path } = this
            return !value || US_POSTAL_CODE_REGEX.test(value)
              ? true
              : createError({ path, message: ZIP_CODE.INVALID_US_CODE })
          }
        })
      })
  })
  .defined()

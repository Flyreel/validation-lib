import * as Yup from 'yup'
import {
  CA_POSTAL_CODE_REGEX,
  CA_PROVINCES_ABBR,
  FLYREEL_INSPECTION_STATUSES,
  FLYREEL_POLICY_TYPES,
  FLYREEL_TYPES,
  MONGOID_REGEX,
  US_POSTAL_CODE_REGEX,
  US_STATES_ABBR,
  VALIDATION_MESSAGES
} from '../constants'
import { differenceInDays } from '../utils/dateUtils'
import {
  InspectionFlyreelType,
  InspectionPolicyType,
  InspectionToBeValidated,
  OptionalInspectionFields,
  RequiredInspectionFields,
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
  return Yup.string().optional()
}

function checkOptionalEmail(value: string | undefined) {
  if (value !== undefined) {
    return Yup.string()
      .trim()
      .email(EMAIL.INVALID_FORMAT)
  }
  return Yup.string().optional()
}

function checkMongoId(value: string | undefined) {
  if (value !== undefined) {
    return Yup.string().matches(MONGOID_REGEX, VALIDATION_MESSAGES.MONGO_ID)
  }
  return Yup.string().optional()
}

function checkOptionalNumber(value: number | undefined) {
  if (value !== undefined) {
    return Yup.number().nullable()
  }
  return Yup.number().optional()
}

const coreValidationSchema: Yup.SchemaOf<RequiredInspectionFields> = Yup.object().shape(
  {
    address1: Yup.string()
      .required(GENERAL.REQUIRED)
      .trim()
      .min(1, GENERAL.TOO_SHORT),

    carrier_expiration: Yup.date()
      .default(getDateFromNow(7))
      .min(getDateFromNow(7), DATES.CARRIER_EXP_SEVEN)
      .test('isGreaterThanTwoDaysDif', DATES.DIFF_TOO_SMALL, function(
        carrier_expiration
      ) {
        const expiration = this.parent.expiration as Date
        const dif = differenceInDays(carrier_expiration, expiration)
        return (
          dif >= 2 ??
          this.createError({ message: DATES.DIFF_TOO_SMALL, path: this.path })
        )
      }),

    city: Yup.string()
      .required(GENERAL.REQUIRED)
      .trim()
      .min(1, GENERAL.TOO_SHORT),

    country: Yup.string()
      .uppercase()
      .default(US)
      .oneOf([US, CA], PHONE.INVALID_COUNTRY_CODE),

    conversation: Yup.string()
      .required(GENERAL.REQUIRED)
      .matches(MONGOID_REGEX, VALIDATION_MESSAGES.MONGO_ID),

    email: Yup.string()
      .required(GENERAL.REQUIRED)
      .trim()
      .email(EMAIL.INVALID_FORMAT),

    expiration: Yup.date()
      .default(getDateFromNow(5))
      .min(getDateFromNow(5), DATES.EXPIRATION_FIVE),

    first_name: Yup.string()
      .trim()
      .min(1, GENERAL.TOO_SHORT)
      .required(GENERAL.REQUIRED),

    flyreel_type: Yup.string()
      .lowercase()
      .default(InspectionFlyreelType.INSPECTION)
      .oneOf(FLYREEL_TYPES, VALIDATION_MESSAGES.FLYREEL_TYPE),

    last_name: Yup.string()
      .trim()
      .min(1, GENERAL.TOO_SHORT)
      .required(GENERAL.REQUIRED),

    phone: Yup.string()
      .required(PHONE.MISSING_PHONE_NUMBER)
      .when('country', {
        is: CA,
        then: Yup.string().test({
          test: function(value) {
            const { errorMessage, isValid } = useValidatePhoneNumber(value, CA)
            return (
              isValid ??
              this.createError({ message: errorMessage, path: this.path })
            )
          }
        }),
        otherwise: Yup.string().test({
          test: function(value) {
            const { errorMessage, isValid } = useValidatePhoneNumber(value, US)
            return (
              isValid ??
              this.createError({ message: errorMessage, path: this.path })
            )
          }
        })
      }),

    policy_id: Yup.string()
      .trim()
      .required(GENERAL.REQUIRED),

    policy_type: Yup.string()
      .lowercase()
      .default(InspectionPolicyType.UNKOWN)
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
            return !value || CA_POSTAL_CODE_REGEX.test(value)
              ? true
              : this.createError({
                  path: this.path,
                  message: ZIP_CODE.INVALID_CA_CODE
                })
          }
        }),
        otherwise: Yup.string().test({
          test: function(value) {
            return !value || US_POSTAL_CODE_REGEX.test(value)
              ? true
              : this.createError({
                  path: this.path,
                  message: ZIP_CODE.INVALID_US_CODE
                })
          }
        })
      })
  }
)

const optionalValidationSchema: Yup.SchemaOf<OptionalInspectionFields> = Yup.object()
  .shape({
    address2: Yup.lazy(checkOptionalString),
    agent_email: Yup.lazy(checkOptionalEmail),
    agent_name: Yup.lazy(checkOptionalString),
    agent_phone: Yup.lazy(value => {
      if (value !== undefined) {
        return Yup.string().test({
          test: function(value) {
            const { errorMessage, isValid } = useValidatePhoneNumber(value)
            return (
              isValid ??
              this.createError({ message: errorMessage, path: this.path })
            )
          }
        })
      }
      return Yup.string().notRequired()
    }),
    carrier: Yup.lazy(checkMongoId),
    longitude: Yup.lazy(checkOptionalNumber),
    latitude: Yup.lazy(checkOptionalNumber),
    status: Yup.string()
      .lowercase()
      .oneOf(FLYREEL_INSPECTION_STATUSES, VALIDATION_MESSAGES.STATUS)
  })
  .defined()

export const inspectionValidationSchema: Yup.SchemaOf<InspectionToBeValidated> = Yup.object()
  .concat(coreValidationSchema)
  .concat(optionalValidationSchema)

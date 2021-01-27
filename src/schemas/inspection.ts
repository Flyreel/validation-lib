import * as Yup from 'yup'
import {
  CA_POSTAL_CODE_REGEX,
  CA_PROVINCES_ABBR,
  FLYREEL_INSPECTION_STATUSES,
  FLYREEL_POLICY_TYPES,
  FLYREEL_TYPES,
  LOCATION_TYPES,
  MONGOID_REGEX,
  US_POSTAL_CODE_REGEX,
  US_STATES_ABBR,
  VALIDATION_MESSAGES
} from '../constants'
import { differenceInDays, getDateFromNow } from '../utils/dateUtils'
import {
  OptionalCreateSchema,
  InspectionFlyreelType,
  InspectionPolicyType,
  ValidCountry,
  OptionalUpdateSchema,
  CoreRequiredSchema,
  CoreOptionalSchema,
  CoreInspectionSchema,
  CreateInspectionSchema,
  UpdateInspectionSchema
} from '../types'
import {
  checkOptionalString,
  checkOptionalEmail,
  checkOptionalPhone,
  checkMongoId
} from '../utils/checkOptional'

const requiredInspectionFieldsSchema: CoreRequiredSchema = Yup.object().shape({
  address1: Yup.string()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    .trim()
    .min(2, VALIDATION_MESSAGES.GENERAL.TOO_SHORT),

  carrier_expiration: Yup.date()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    .min(getDateFromNow(7), VALIDATION_MESSAGES.DATES.CARRIER_EXP_MIN)
    .max(getDateFromNow(92), VALIDATION_MESSAGES.DATES.CARRIER_EXP_MAX)
    .test(
      'isGreaterThanTwoDaysDif',
      VALIDATION_MESSAGES.DATES.DIFF_TOO_SMALL,
      function(carrier_expiration) {
        const expiration = this.parent.expiration as Date
        const dif = differenceInDays(carrier_expiration, expiration)
        return (
          dif >= 2 ??
          this.createError({
            message: VALIDATION_MESSAGES.DATES.DIFF_TOO_SMALL,
            path: this.path
          })
        )
      }
    ),

  city: Yup.string()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    .trim()
    .min(2, VALIDATION_MESSAGES.GENERAL.TOO_SHORT),

  country: Yup.string()
    .uppercase()
    .default(ValidCountry.US)
    .oneOf(
      [ValidCountry.US, ValidCountry.CA],
      VALIDATION_MESSAGES.INVALID_COUNTRY_CODE
    ),

  conversation: Yup.string()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    .matches(MONGOID_REGEX, VALIDATION_MESSAGES.MONGO_ID),

  email: Yup.string()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    .trim()
    .email(VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT),

  expiration: Yup.date()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    .min(getDateFromNow(5), VALIDATION_MESSAGES.DATES.EXPIRATION_MIN)
    .max(getDateFromNow(90), VALIDATION_MESSAGES.DATES.EXPIRATION_MAX),

  first_name: Yup.string()
    .trim()
    .min(2, VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED),

  last_name: Yup.string()
    .trim()
    .min(2, VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED),

  policy_id: Yup.string()
    .trim()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED),

  state: Yup.string()
    .uppercase()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    .when('country', {
      is: ValidCountry.CA,
      then: Yup.string().oneOf(
        CA_PROVINCES_ABBR,
        VALIDATION_MESSAGES.STATE.INVALID_CA_PROVINCE
      ),
      otherwise: Yup.string().oneOf(
        US_STATES_ABBR,
        VALIDATION_MESSAGES.STATE.INVALID_US_STATE
      )
    }),

  zip_code: Yup.string()
    .uppercase()
    .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    .when('country', {
      is: ValidCountry.CA,
      then: Yup.string().test({
        test: function(value) {
          return !value || CA_POSTAL_CODE_REGEX.test(value)
            ? true
            : this.createError({
                path: this.path,
                message: VALIDATION_MESSAGES.ZIP_CODE.INVALID_CA_CODE
              })
        }
      }),
      otherwise: Yup.string().test({
        test: function(value) {
          return !value || US_POSTAL_CODE_REGEX.test(value)
            ? true
            : this.createError({
                path: this.path,
                message: VALIDATION_MESSAGES.ZIP_CODE.INVALID_US_CODE
              })
        }
      })
    })
})

export const optionalInspectionFieldsSchema: CoreOptionalSchema = Yup.object()
  .shape({
    address2: Yup.lazy(checkOptionalString),
    agent_email: Yup.lazy(checkOptionalEmail),
    agent_name: Yup.lazy(checkOptionalString),
    agent_phone: Yup.lazy(checkOptionalPhone),
    carrier: Yup.lazy(checkMongoId),
    flyreel_type: Yup.string()
      .lowercase()
      .default(InspectionFlyreelType.INSPECTION)
      .oneOf(FLYREEL_TYPES, VALIDATION_MESSAGES.FLYREEL_TYPE),
    policy_type: Yup.string()
      .lowercase()
      .default(InspectionPolicyType.UNKOWN)
      .oneOf(FLYREEL_POLICY_TYPES, VALIDATION_MESSAGES.POLICY_TYPE),
    phone: Yup.lazy(checkOptionalPhone),
    status: Yup.string()
      .lowercase()
      .oneOf(FLYREEL_INSPECTION_STATUSES, VALIDATION_MESSAGES.STATUS)
  })
  .defined()

export const optionalUpdateInspectionFields: OptionalUpdateSchema = Yup.object()
  .shape({
    location: Yup.object({
      type: Yup.string().oneOf(
        LOCATION_TYPES,
        VALIDATION_MESSAGES.LOCATION_TYPE
      ),
      coordinates: Yup.array()
        .length(2, VALIDATION_MESSAGES.REQUIRE_TWO_COORDINATES)
        .of(Yup.number().required())
        .required(VALIDATION_MESSAGES.GENERAL.REQUIRED)
    }).optional()
  })
  .optional()
  .defined()

export const metaFieldsCreateInspectionSchema: OptionalCreateSchema = Yup.object()
  .shape({
    meta: Yup.object()
      .shape({
        external_id: Yup.lazy(checkOptionalString),
        forms: Yup.object()
          .shape({
            self_inspection_form_id: Yup.lazy(checkOptionalString),
            self_inspection_internal_form: Yup.lazy(checkOptionalString),
            inspection_form_id: Yup.lazy(checkOptionalString)
          })
          .defined()
      })
      .optional()
  })
  .optional()
  .defined()

export const coreInspectionValidationSchema: CoreInspectionSchema = Yup.object()
  .concat(requiredInspectionFieldsSchema)
  .concat(optionalInspectionFieldsSchema)

export const createInspectionValidationSchema: CreateInspectionSchema = Yup.object()
  .concat(coreInspectionValidationSchema)
  .concat(metaFieldsCreateInspectionSchema)

export const updateInspectionValidationSchema: UpdateInspectionSchema = Yup.object()
  .concat(coreInspectionValidationSchema)
  .concat(optionalUpdateInspectionFields)

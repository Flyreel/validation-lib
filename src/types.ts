import {
  CA_PROVINCES_ABBR,
  CA_PROVINCES_FULL,
  US_STATES_ABBR,
  US_STATES_FULL
} from './constants'
import { ValuesType } from 'utility-types'
import * as Yup from 'yup'

export type USStatesAbbreviated = ValuesType<typeof US_STATES_ABBR>
export type USStatesFull = ValuesType<typeof US_STATES_FULL>
export type CAProvincesFull = ValuesType<typeof CA_PROVINCES_FULL>
export type CAProvincesAbbreviated = ValuesType<typeof CA_PROVINCES_ABBR>

export enum InspectionFlyreelType {
  UNKNOWN = 'unknown',
  INSPECTION = 'inspection',
  HOME_REVIEW = 'home_review',
  CLAIM = 'claim'
}

export enum InspectionPolicyType {
  NEW = 'new',
  RENEWAL = 'renewal',
  UNKNOWN = 'unknown'
}

export enum InspectionStatus {
  ABANDONED = 'abandoned',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
  INVITED = 'invited',
  IN_REVIEW = 'in_review',
  PENDING = 'pending',
  READY_FOR_INVITE = 'ready_for_invite',
  READY_FOR_REVIEW = 'ready_for_review',
  STARTED = 'started',
  SUBMITTED = 'submitted'
}

export enum ValidCountry {
  US = 'US',
  CA = 'CA'
}

export type RequiredCoreInspectionFields = {
  address1: string
  city: string
  country: string | ValidCountry
  conversation: string
  email: string
  first_name: string
  last_name: string
  policy_id: string
  state: CAProvincesAbbreviated | USStatesAbbreviated | string
  zip_code: string
}

export type DateFields = {
  carrier_expiration: Date | string
  expiration: Date | string
}

export type CreateSpecificMeta = Partial<{
  external_id: string
  forms: Partial<MetaFormFields>
}>

export type OptionalCoreInspectionFields = Partial<{
  address2: string
  agent_email: string
  agent_name: string
  agent_phone: string
  carrier: string
  flyreel_type: string | InspectionFlyreelType
  phone: string
  policy_type: string | InspectionPolicyType
  status: InspectionStatus
  meta: CreateSpecificMeta
}>

type AcceptedLocationTypes = 'Point'

type InspectionLocation = {
  type: AcceptedLocationTypes | string
  coordinates: [number, number]
}

export type OptionalUpdateSpecificFields = Partial<{
  location: Partial<InspectionLocation>
}>

type MetaFormFields = {
  self_inspection_form_id: string
  self_inspection_internal_form: string
  inspection_form_id: string
}

export type DashboardInspectionCreationValidation = RequiredCoreInspectionFields &
  Pick<
    OptionalCoreInspectionFields,
    | 'address2'
    | 'agent_email'
    | 'agent_phone'
    | 'agent_name'
    | 'phone'
    | 'flyreel_type'
    | 'policy_type'
  >

export type CoreInspectionPayload = RequiredCoreInspectionFields

export type CreateInspectionPayload = CoreInspectionPayload &
  OptionalCoreInspectionFields &
  DateFields

export type UpdateInspectionPayload = CoreInspectionPayload &
  OptionalCoreInspectionFields &
  OptionalUpdateSpecificFields &
  DateFields

export type CoreRequiredSchema = Yup.SchemaOf<RequiredCoreInspectionFields>

export type CoreDateSchema = Yup.SchemaOf<DateFields>

export type CoreOptionalSchema = Yup.SchemaOf<OptionalCoreInspectionFields>
export type CreateMetaSchema = Yup.SchemaOf<CreateSpecificMeta>
export type OptionalUpdateSchema = Yup.SchemaOf<OptionalUpdateSpecificFields>

export type CreateInspectionSchema = Yup.SchemaOf<
  RequiredCoreInspectionFields & OptionalCoreInspectionFields & DateFields
>

export type UpdateInspectionSchema = Yup.SchemaOf<
  RequiredCoreInspectionFields &
    OptionalCoreInspectionFields &
    OptionalUpdateSpecificFields &
    DateFields
>

export type ValidationErrors<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? ValidationErrors<T[K]>
    : string
}

export type ValidationResult<T> = {
  errors: ValidationErrors<T> & {
    meta?: ValidationErrors<CreateSpecificMeta> & {
      forms?: ValidationErrors<CreateSpecificMeta['forms']>
    }
    location?: ValidationErrors<InspectionLocation>
  }

  isValid: boolean
}

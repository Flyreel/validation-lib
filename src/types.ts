import {
  CA_PROVINCES_ABBR,
  CA_PROVINCES_FULL,
  US_STATES_ABBR,
  US_STATES_FULL
} from './constants'
import { ValuesType } from 'utility-types'

export type USStatesAbbreviated = ValuesType<typeof US_STATES_ABBR>
export type USStatesFull = ValuesType<typeof US_STATES_FULL>
export type CAProvincesFull = ValuesType<typeof CA_PROVINCES_FULL>
export type CAProvincesAbbreviated = ValuesType<typeof CA_PROVINCES_ABBR>

export enum InspectionFlyreelType {
  INSPECTION = 'inspection',
  HOME_REVIEW = 'home_review',
  CLAIM = 'claim'
}

export enum InspectionPolicyType {
  NEW = 'new',
  RENEWAL = 'renewal',
  UNKOWN = 'unknown'
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

export type RequiredInspectionFields = {
  address1: string
  carrier_expiration: Date | string
  city: string
  country: string | ValidCountry
  conversation: string
  email: string
  expiration: Date | string
  first_name: string
  flyreel_type: string | InspectionFlyreelType
  last_name: string
  phone: string
  policy_id: string
  policy_type: string | InspectionPolicyType
  state: CAProvincesAbbreviated | USStatesAbbreviated | string
  zip_code: string
}

export type OptionalInspectionFields = Partial<{
  address2: string
  agent_email: string
  agent_name: string
  agent_phone: string
  carrier: string
  latitude: number
  longitude: number
  status: InspectionStatus
}>

export type DashboardInspectionCreationValidation = RequiredInspectionFields &
  Pick<
    OptionalInspectionFields,
    'address2' | 'agent_email' | 'agent_phone' | 'agent_name'
  >

export type DashboardInspectionUpdateValidation = DashboardInspectionCreationValidation &
  Omit<OptionalInspectionFields, 'latitude' | 'longitude'>

export type InspectionToBeValidated = RequiredInspectionFields &
  OptionalInspectionFields

export type ValidationErrors<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? ValidationErrors<T[K]>
    : string
}

export type ValidationResult<T> = {
  errors: ValidationErrors<T>
  isValid: boolean
}

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

export enum ValidCountry {
  US = 'US',
  CA = 'CA'
}

type RequiredInspectionFields = {
  address1: string
  carrier_expiration: Date | string
  expiration: Date | string
  city: string
  conversation: string
  email: string
  first_name: string
  last_name: string
  phone: string
  policy_id: string
  state: CAProvincesAbbreviated | USStatesAbbreviated
  zip_code: string
}

type OptionalInspectionFields = Partial<{
  address2: string
  agent_email: string
  agent_name: string
  agent_phone: string
  carrier: string
  country: string | ValidCountry
  flyreel_type: string | InspectionFlyreelType
  latitude: number
  longitude: number
  policy_type: string | InspectionPolicyType
}>

export type InspectionToBeValidated = RequiredInspectionFields &
  OptionalInspectionFields

export type InspectionValidationResultErrors = Partial<
  Record<keyof Partial<InspectionToBeValidated>, string>
>

export type InspectionValidationResult = {
  isValid: boolean
  errors: InspectionValidationResultErrors
}

export type Values = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [field: string]: any
}

export type ValidationErrors<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? ValidationErrors<T[K]>
    : string
}

export type ValidationResult<T> = {
  errors: ValidationErrors<T>
  isValid: boolean
}

import * as Yup from 'yup'
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
  RENEWAL = 'renewal'
}

export enum ValidCountry {
  US = 'US',
  CA = 'CA'
}

type RequiredInspectionFields = {
  address1: string
  carrier_expiration: string
  expiration: string
  city: string
  // the id of the conversation, not the actual conversation object
  conversation: string
  email: string
  first_name: string
  flyreel_type: InspectionFlyreelType
  last_name: string
  phone: string
  policy_id: string
  policy_type: InspectionPolicyType
  state: CAProvincesAbbreviated | USStatesAbbreviated
  zip_code: string
}

type OptionalInspectionFields = Partial<{
  address2: string
  agent_email: string
  agent_name: string
  agent_phone: string
  // the carrier id
  carrier: string
  country: ValidCountry
  latitude: number
  longitude: number
}>

export type InspectionToBeValidated = RequiredInspectionFields &
  OptionalInspectionFields

type ValidatorFn<T> = (
  message?: string | Record<string | number | symbol, unknown> | undefined
) => T

export interface CustomStringSchema extends Yup.StringSchema {
  isUrl: ValidatorFn<this>
}

export interface CustomStringSchemaConstructor extends Yup.StringSchema {
  (): CustomStringSchema
  new (): CustomStringSchema
}

export type ExtendedYupType = Omit<typeof Yup, 'string'> & {
  string: CustomStringSchemaConstructor
}

export type InspectionValidationResult = {
  isValid: boolean
  errors: Partial<Record<keyof Partial<InspectionToBeValidated>, string>>
}

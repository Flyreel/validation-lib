import { US_STATES_COMPLETE, US_STATES_ABBREVIATED } from './constants'
import { ValuesType } from 'utility-types'

export type USStatesAbbreviated = ValuesType<typeof US_STATES_ABBREVIATED>
export type USStatesComplete = ValuesType<typeof US_STATES_COMPLETE>

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

type CreateInspectionRequiredFields = {
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
  state: string
  zip_code: string
}

type CreateInspectionOptionalFields = Partial<{
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

export type CreateInspectionRequestBody = CreateInspectionRequiredFields &
  CreateInspectionOptionalFields
4

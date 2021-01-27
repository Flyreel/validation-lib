/* eslint-disable */
import {
  validateCreateInspection,
  validateUpdateInspection
} from '../src/validators/inspection'
import { VALIDATION_MESSAGES } from '../src/constants'
import { UpdateInspectionPayload, ValidCountry } from '../src/types'
import { getDateFromNow } from '../src/utils/dateUtils'

const weekLater = getDateFromNow(7)
const fiveDaysLater = getDateFromNow(5)

describe('validateCreateInspection()', () => {
  it(`address1 - throws an error when there is a missing address1`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.address1).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`address1 - throws an error when last name is less than 2 char`, async () => {
    const { errors } = await validateCreateInspection({ address1: 'x' })

    expect(errors.address1).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })

  it(`address1 - throws an error when address1 is present as a blank string`, async () => {
    const { errors } = await validateCreateInspection({ address1: '' })

    expect(errors.address1).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })

  it(`address2 - throws an error when address2 is present but less than 2 char`, async () => {
    const { errors } = await validateCreateInspection({ address2: 'x' })

    expect(errors.address2).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })

  it(`address2 - does not throw an error when address2 is empty`, async () => {
    const { errors } = await validateCreateInspection({ address2: '' })

    expect(errors.address2).toBeUndefined()
  })

  it(`address2 - does not throw an error when address2 is missing`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.address2).toBeUndefined()
  })

  it(`agent_email - throws an error when agent_email is present but not valid`, async () => {
    const { errors } = await validateCreateInspection({
      agent_email: 'test' as any
    })

    expect(errors.agent_email).toStrictEqual(
      VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT
    )
  })

  it(`agent_email - does not throw an error if agent_email is an empty string`, async () => {
    const { errors } = await validateCreateInspection({ agent_email: '' })

    expect(errors.agent_email).toBeUndefined()
  })

  it(`agent_email - does not throw an error if agent_email is missing`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.agent_email).toBeUndefined()
  })

  it(`agent_name - throws an error when agent_name is present but less than 2 char`, async () => {
    const { errors } = await validateCreateInspection({ agent_name: '2' })

    expect(errors.agent_name).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.TOO_SHORT
    )
  })

  it(`agent_name - does not throw an error when agent_name is an empty string`, async () => {
    const { errors } = await validateCreateInspection({ agent_name: '' })

    expect(errors.agent_name).toBeUndefined()
  })

  it(`agent_name - does not throw an error when agent_name missing`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.agent_name).toBeUndefined()
  })

  it(`agent_phone - throws an error when agent phone has an incorrect format`, async () => {
    const { errors } = await validateCreateInspection({ agent_phone: '23940' })

    expect(errors.agent_phone).toBeDefined()
  })

  it(`agent_phone - does not throw an error when agent_phone is missing`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.agent_phone).toBeUndefined()
  })

  it(`carrier_expiration - throws an error when carrier expiration is less than 7 days away`, async () => {
    const date = new Date()
    date.setDate(date.getDate() + 4)

    const { errors } = await validateCreateInspection({
      expiration: new Date(),
      carrier_expiration: date
    })

    expect(errors.carrier_expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.CARRIER_EXP_MIN
    )
  })

  it(`carrier_expiration - throws no error when carrier expiration is between 7-92 days away`, async () => {
    const { errors } = await validateCreateInspection({
      expiration: getDateFromNow(75),
      carrier_expiration: getDateFromNow(91)
    })

    expect(errors.carrier_expiration).toStrictEqual(undefined)
  })

  it(`carrier_expiration - throws an error when carrier expiration is more than 92 days away`, async () => {
    const { errors } = await validateCreateInspection({
      expiration: getDateFromNow(75),
      carrier_expiration: getDateFromNow(93)
    })

    expect(errors.carrier_expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.CARRIER_EXP_MAX
    )
  })

  it(`carrier_expiration - throws an error when expiration is not at least 2 days before carrier expiration`, async () => {
    const { errors } = await validateCreateInspection({
      expiration: new Date(),
      carrier_expiration: new Date()
    })

    expect(errors.carrier_expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.DIFF_TOO_SMALL
    )
  })

  it(`city - throws an error when there is a missing a city`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.city).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`city - throws an error when city is present as a blank string`, async () => {
    const { errors } = await validateCreateInspection({ city: '  ' })

    expect(errors.city).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })

  it(`city - throws an error when city is present but less than 2 char`, async () => {
    const { errors } = await validateCreateInspection({ city: 'x' })

    expect(errors.city).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })

  it(`conversation - throws an error when there is a missing a conversation id`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.conversation).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.REQUIRED
    )
  })

  it(`conversation - throws an error when conversation id is present but in an incorrect format`, async () => {
    const { errors } = await validateCreateInspection({
      conversation: '2324222  '
    })

    expect(errors.conversation).toStrictEqual(VALIDATION_MESSAGES.MONGO_ID)
  })

  it('country - throws an error when there is an invalid country code', async () => {
    const result = await validateCreateInspection({ country: 'RU' })

    expect(result.errors.country).toStrictEqual(
      VALIDATION_MESSAGES.INVALID_COUNTRY_CODE
    )
  })

  it(`email - throws an error when there is a missing an email`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.email).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`email - throws an error when there is an invalid email format`, async () => {
    const { errors } = await validateCreateInspection({ email: 'hi' })

    expect(errors.email).toStrictEqual(VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT)
  })

  it(`expiration - throws an error when expiration is less than 5 days away`, async () => {
    const { errors } = await validateCreateInspection({
      expiration: new Date()
    })

    expect(errors.expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.EXPIRATION_MIN
    )
  })

  it(`expiration - throws an error when expiration is more than 90 days away`, async () => {
    const { errors } = await validateCreateInspection({
      expiration: getDateFromNow(92)
    })

    expect(errors.expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.EXPIRATION_MAX
    )
  })

  it(`expiration - throws no error when expiration is between 5-90 days away`, async () => {
    const { errors } = await validateCreateInspection({
      expiration: getDateFromNow(89)
    })

    expect(errors.expiration).toStrictEqual(undefined)
  })

  it(`first_name - throws an error when last name is less than 2 char`, async () => {
    const { errors } = await validateCreateInspection({ first_name: 'x' })

    expect(errors.first_name).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.TOO_SHORT
    )
  })

  it(`first_name - throws an error when there is a missing a first_name`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.first_name).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.REQUIRED
    )
  })

  it(`first_name - throws an error when first_name is a blank string`, async () => {
    const { errors } = await validateCreateInspection({ first_name: '' })

    expect(errors.first_name).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.REQUIRED
    )
  })

  it(`flyreel_type - throws an error when there is an unrecognized flyreel type`, async () => {
    const { errors } = await validateCreateInspection({ flyreel_type: 'test' })

    expect(errors.flyreel_type).toStrictEqual(VALIDATION_MESSAGES.FLYREEL_TYPE)
  })

  it(`last_name - throws an error when last name is less than 2 char`, async () => {
    const { errors } = await validateCreateInspection({ last_name: 'x' })

    expect(errors.last_name).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.TOO_SHORT
    )
  })

  it(`last_name - throws an error when there is a missing a last_name`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.last_name).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`last_name - throws an error when last_name is a blank string`, async () => {
    const { errors } = await validateCreateInspection({ last_name: '' })

    expect(errors.last_name).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it('meta - does not throw an error if there is no meta object', async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.meta).toBeUndefined()
  })

  it('meta - does not throw an error if there an empty meta object', async () => {
    const { errors } = await validateCreateInspection({ meta: {} })

    expect(errors.meta).toBeUndefined()
  })

  it('meta - does not throw an error if there is a partial meta object', async () => {
    const { errors } = await validateCreateInspection({
      meta: {
        external_id: 'abc'
      }
    })

    expect(errors.meta).toBeUndefined()
  })

  it('meta.external_id - throws an error if there is an incorrect value type for a field that exists', async () => {
    const { errors } = await validateCreateInspection({
      meta: {
        external_id: 123 as any
      }
    })

    console.log(errors.meta)

    // expect(errors.meta?.external_id).toBeDefined()
  })

  it('meta.forms.self_inspection_form_id - throws an error if there is an incorrect value type for a field that exists', async () => {
    const { errors } = await validateCreateInspection({
      meta: {
        forms: {
          self_inspection_form_id: 123 as any
        }
      }
    })

    console.log(errors)

    // expect(errors.meta?.forms?.self_inspection_form_id).toBeDefined()
  })

  it('meta.forms.self_inspection_internal_form - throws an error if there is an incorrect value type for a field that exists', async () => {
    const { errors } = await validateCreateInspection({
      meta: {
        forms: {
          self_inspection_internal_form: 123 as any
        }
      }
    })
    console.log(errors.meta)
    // expect(errors.meta?.forms?.self_inspection_internal_form).toBeDefined()
  })

  it('meta.forms.inspection_form_id - throws an error if there is an incorrect value type for a field that exists', async () => {
    const { errors } = await validateCreateInspection({
      meta: {
        forms: {
          inspection_form_id: 123 as any
        }
      }
    })
    console.log(errors.meta)

    // expect(errors.meta?.forms?.inspection_form_id).toBeDefined()
  })

  it(`phone - throws an error when phone has an incorrect format`, async () => {
    const { errors } = await validateCreateInspection({ phone: '23940' })
    expect(errors.phone).toBeDefined()
  })

  it(`phone - does not throw an error when phone is missing`, async () => {
    const { errors } = await validateCreateInspection({})
    expect(errors.phone).toBeUndefined()
  })

  it(`policy_id - throws an error when there is a missing a policy_id`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.policy_id).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`policy_type - does not throw an error if policy_type is missing`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.policy_type).toBeUndefined()
  })

  it(`policy_type - throws an error when policy_type is present but not valid`, async () => {
    const { errors } = await validateCreateInspection({ policy_type: 'test' })

    expect(errors.policy_type).toStrictEqual(VALIDATION_MESSAGES.POLICY_TYPE)
  })

  it(`state - throws an error when there is a missing a state`, async () => {
    const { errors } = await validateCreateInspection({})

    expect(errors.state).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`state - throws an error when there is an unrecognized state, defaulting to US country`, async () => {
    const { errors } = await validateCreateInspection({ state: 'x' as any })

    expect(errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_US_STATE
    )
  })

  it('state - throws an error when there is a state mismatch with a US country code', async () => {
    const result = await validateCreateInspection({
      state: 'QC',
      zip_code: '4422',
      country: ValidCountry.US
    })

    expect(result.isValid).toBe(false)

    expect(result.errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_US_STATE
    )
  })

  it('state - throws an error when there is a state mismatch with a CA country code', async () => {
    const result = await validateCreateInspection({
      state: 'TX',
      zip_code: '00000',
      country: ValidCountry.CA
    })

    expect(result.isValid).toBe(false)
    expect(result.errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_CA_PROVINCE
    )
  })

  it(`zip_code - throws an error when there is a missing a zip_code`, async () => {
    const { errors } = await validateCreateInspection({ address2: 'test' })

    expect(errors.zip_code).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it('zip_code - throws an error when there is a mismatch with a US country code', async () => {
    const result = await validateCreateInspection({
      zip_code: '4422',
      country: ValidCountry.US
    })

    expect(result.isValid).toBe(false)

    expect(result.errors.zip_code).toStrictEqual(
      VALIDATION_MESSAGES.ZIP_CODE.INVALID_US_CODE
    )
  })

  it('zip_code -  throws an error when there is a zipcode mismatch with a CA country code', async () => {
    const result = await validateCreateInspection({
      state: 'TX',
      zip_code: '00000',
      country: ValidCountry.CA
    })

    expect(result.isValid).toBe(false)

    expect(result.errors.zip_code).toStrictEqual(
      VALIDATION_MESSAGES.ZIP_CODE.INVALID_CA_CODE
    )
  })
})

describe('validateUpdateInspection', () => {
  let inspectionBeingUpdated: Partial<UpdateInspectionPayload> = {}

  beforeEach(() => {
    inspectionBeingUpdated = {
      address1: 'test',
      email: 'test@test.com',
      conversation: '1234567890123456789011234',
      expiration: fiveDaysLater,
      carrier_expiration: weekLater,
      first_name: 'test',
      country: 'US',
      last_name: 'test',
      policy_id: '11223344556677',
      phone: '2145555555',
      state: 'TX',
      city: 'Dallas',
      zip_code: '75555'
    }
  })

  it(`throws an error trying to update the country from US to CA, without a valid state change`, async () => {
    const { errors } = await validateUpdateInspection(
      { country: 'CA' },
      inspectionBeingUpdated as UpdateInspectionPayload
    )

    expect(errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_CA_PROVINCE
    )
  })

  it(`throws an error trying to update the country from US to CA, without a valid zip_code change`, async () => {
    const { errors } = await validateUpdateInspection(
      { country: 'CA' },
      inspectionBeingUpdated as UpdateInspectionPayload
    )

    expect(errors.zip_code).toStrictEqual(
      VALIDATION_MESSAGES.ZIP_CODE.INVALID_CA_CODE
    )
  })

  it(`throws an error trying to update the state to a CA province without updating the country to CA`, async () => {
    const { errors } = await validateUpdateInspection(
      { state: 'ON' },
      inspectionBeingUpdated as UpdateInspectionPayload
    )

    expect(errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_US_STATE
    )
  })

  it(`throws an error trying to update the expiration to a date beyond the already set carrier_expiration`, async () => {
    const { errors } = await validateUpdateInspection(
      { expiration: getDateFromNow(10) },
      inspectionBeingUpdated as UpdateInspectionPayload
    )

    expect(errors.carrier_expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.DIFF_TOO_SMALL
    )
  })

  it(`throws an error trying to update an existing value to an invalid format`, async () => {
    const { errors } = await validateUpdateInspection(
      { email: 'aa' },
      inspectionBeingUpdated as UpdateInspectionPayload
    )

    expect(errors.email).toStrictEqual(VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT)
  })

  it(`throws an error trying to update an existing value to an empty value`, async () => {
    const { errors } = await validateUpdateInspection(
      { address1: '' },
      inspectionBeingUpdated as UpdateInspectionPayload
    )

    expect(errors.address1).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })
})

/* eslint-disable */
import {
  validateInspection,
  validateInspectionUpdate
} from '../../src/validators/validateInspection'
import { VALIDATION_MESSAGES } from '../../src/constants'
import { InspectionToBeValidated, ValidCountry } from '../../src/types'
import { getDateFromNow } from '../../src/utils/dateUtils'

const weekLater = getDateFromNow(7)
const fiveDaysLater = getDateFromNow(5)

describe('validateInspection', () => {
  it('throws an error when there is a state mismatch with a CA country code', async () => {
    const result = await validateInspection({
      expiration: fiveDaysLater,
      carrier_expiration: weekLater,
      phone: '2145556852',
      state: 'TX',
      city: 'Dallas',
      first_name: 'Test',
      zip_code: '00000',
      country: ValidCountry.CA
    })

    expect(result.isValid).toBe(false)
    expect(result.errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_CA_PROVINCE
    )
  })

  it('throws an error when there is a zipcode mismatch with a CA country code', async () => {
    const result = await validateInspection({
      expiration: fiveDaysLater,
      carrier_expiration: weekLater,
      phone: '2145556852',
      state: 'TX',
      city: 'Dallas',
      first_name: 'Test',
      zip_code: '00000',
      country: ValidCountry.CA
    })

    expect(result.isValid).toBe(false)

    expect(result.errors.zip_code).toStrictEqual(
      VALIDATION_MESSAGES.ZIP_CODE.INVALID_CA_CODE
    )
  })

  it('throws an error when there is a state mismatch with a US country code', async () => {
    const result = await validateInspection({
      expiration: fiveDaysLater,
      carrier_expiration: weekLater,
      phone: '2145556852',
      state: 'QC',
      city: 'Dallas',
      first_name: 'Test',
      zip_code: '4422',
      country: ValidCountry.US
    })

    expect(result.isValid).toBe(false)

    expect(result.errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_US_STATE
    )
  })

  it('throws an error when there is a zipcode mismatch with a US country code', async () => {
    const result = await validateInspection({
      expiration: fiveDaysLater,
      carrier_expiration: weekLater,
      phone: '2145976852',
      state: 'QC',
      city: 'Dallas',
      first_name: 'Test',
      zip_code: '4422',
      country: ValidCountry.US
    })

    expect(result.isValid).toBe(false)

    expect(result.errors.zip_code).toStrictEqual(
      VALIDATION_MESSAGES.ZIP_CODE.INVALID_US_CODE
    )
  })

  it('throws an error when there is an invalid country code', async () => {
    const result = await validateInspection({
      phone: '2145976852',
      country: 'RU'
    })

    expect(result.errors.country).toStrictEqual(
      VALIDATION_MESSAGES.PHONE.INVALID_COUNTRY_CODE
    )
  })

  it(`throws an error when there is a missing a address1`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.address1).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`throws an error when there is a missing a city`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.city).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`throws an error when there is a missing a conversation id`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.conversation).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.REQUIRED
    )
  })

  it(`throws an error when there is a missing an email`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.email).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`throws an error when there is a missing a first_name`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.first_name).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.REQUIRED
    )
  })

  it(`throws an error when there is a missing a last_name`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.last_name).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`throws an error when there is a missing a phone`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })
    expect(errors.phone).toBeDefined()
  })

  it(`throws an error when there is a missing a policy_id`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.policy_id).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`throws an error when there is a missing a state`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.state).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`throws an error when there is a missing a zip_code`, async () => {
    const { errors } = await validateInspection({ address2: 'test' })

    expect(errors.zip_code).toStrictEqual(VALIDATION_MESSAGES.GENERAL.REQUIRED)
  })

  it(`throws an error when there is an invalid email format`, async () => {
    const { errors } = await validateInspection({
      address2: 'test',
      email: 'hi'
    })

    expect(errors.email).toStrictEqual(VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT)
  })

  it(`throws an error when there is an unrecognized flyreel type`, async () => {
    const { errors } = await validateInspection({ flyreel_type: 'test' })

    expect(errors.flyreel_type).toStrictEqual(VALIDATION_MESSAGES.FLYREEL_TYPE)
  })

  it(`throws an error when there is an unrecognized state, defaulting to US country`, async () => {
    const { errors } = await validateInspection({ state: 'test' as any })

    expect(errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_US_STATE
    )
  })

  it(`throws an error when agent_email is present but not valid`, async () => {
    const { errors } = await validateInspection({ agent_email: 'test' as any })

    expect(errors.agent_email).toStrictEqual(
      VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT
    )
  })

  it(`throws an error when policy_type is present but not valid`, async () => {
    const { errors } = await validateInspection({ policy_type: 'test' })

    expect(errors.policy_type).toStrictEqual(VALIDATION_MESSAGES.POLICY_TYPE)
  })

  it(`throws an error when address1 is present as a blank string`, async () => {
    const { errors } = await validateInspection({ address1: '' })

    expect(errors.address1).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })

  it(`throws an error when address2 is present as a blank string`, async () => {
    const { errors } = await validateInspection({ address2: '' })

    expect(errors.address2).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })

  it(`throws an error when agent_name is present as a blank string`, async () => {
    const { errors } = await validateInspection({ agent_name: '' })

    expect(errors.agent_name).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.TOO_SHORT
    )
  })

  it(`throws an error when city is present as a blank string`, async () => {
    const { errors } = await validateInspection({ city: '  ' })

    expect(errors.city).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })

  it(`throws an error when conversation id is present but in an incorrect format`, async () => {
    const { errors } = await validateInspection({ conversation: '2324222  ' })

    expect(errors.conversation).toStrictEqual(VALIDATION_MESSAGES.MONGO_ID)
  })

  it(`throws an error when expiration is less than 5 days away`, async () => {
    const { errors } = await validateInspection({ expiration: new Date() })

    expect(errors.expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.EXPIRATION_MIN_DAYS
    )
  })

  it(`throws no error when expiration is between 5-90 days away`, async () => {
    const { errors } = await validateInspection({
      expiration: getDateFromNow(89)
    })

    expect(errors.expiration).toStrictEqual(undefined)
  })

  it(`throws an error when expiration is more than 90 days away`, async () => {
    const { errors } = await validateInspection({
      expiration: getDateFromNow(92)
    })

    expect(errors.expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.EXPIRATION_MAX_DAYS
    )
  })

  it(`throws an error when carrier expiration is less than 7 days away`, async () => {
    const date = new Date()
    date.setDate(date.getDate() + 4)

    const { errors } = await validateInspection({
      expiration: new Date(),
      carrier_expiration: date
    })

    expect(errors.carrier_expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.CARRIER_EXPIRATION_MIN_DAYS
    )
  })

  it(`throws no error when carrier expiration is between 7-92 days away`, async () => {
    const { errors } = await validateInspection({
      expiration: getDateFromNow(75),
      carrier_expiration: getDateFromNow(91)
    })

    expect(errors.carrier_expiration).toStrictEqual(undefined)
  })

  it(`throws an error when carrier expiration is more than 92 days away`, async () => {
    const { errors } = await validateInspection({
      expiration: getDateFromNow(75),
      carrier_expiration: getDateFromNow(93)
    })

    expect(errors.carrier_expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.CARRIER_EXPIRATION_MAX_DAYS
    )
  })

  it(`throws an error when expiration is not at least 2 days before carrier expiration`, async () => {
    const { errors } = await validateInspection({
      expiration: new Date(),
      carrier_expiration: new Date()
    })

    expect(errors.carrier_expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.DIFF_TOO_SMALL
    )
  })
})

describe('validateInspectionUpdate', () => {
  let inspectionBeingUpdated: Partial<InspectionToBeValidated> = {}

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
    const { errors } = await validateInspectionUpdate(
      { country: 'CA' },
      inspectionBeingUpdated as InspectionToBeValidated
    )

    expect(errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_CA_PROVINCE
    )
  })

  it(`throws an error trying to update the country from US to CA, without a valid zip_code change`, async () => {
    const { errors } = await validateInspectionUpdate(
      { country: 'CA' },
      inspectionBeingUpdated as InspectionToBeValidated
    )

    expect(errors.zip_code).toStrictEqual(
      VALIDATION_MESSAGES.ZIP_CODE.INVALID_CA_CODE
    )
  })

  it(`throws an error trying to update the state to a CA province without updating the country to CA`, async () => {
    const { errors } = await validateInspectionUpdate(
      { state: 'ON' },
      inspectionBeingUpdated as InspectionToBeValidated
    )

    expect(errors.state).toStrictEqual(
      VALIDATION_MESSAGES.STATE.INVALID_US_STATE
    )
  })

  it(`throws an error trying to update the expiration to a date beyond the already set carrier_expiration`, async () => {
    const { errors } = await validateInspectionUpdate(
      { expiration: getDateFromNow(10) },
      inspectionBeingUpdated as InspectionToBeValidated
    )

    expect(errors.carrier_expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.DIFF_TOO_SMALL
    )
  })

  it(`throws an error trying to update an existing value to an invalid format`, async () => {
    const { errors } = await validateInspectionUpdate(
      { email: 'aa' },
      inspectionBeingUpdated as InspectionToBeValidated
    )

    expect(errors.email).toStrictEqual(VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT)
  })

  it(`throws an error trying to update an existing value to an empty value`, async () => {
    const { errors } = await validateInspectionUpdate(
      { address1: '' },
      inspectionBeingUpdated as InspectionToBeValidated
    )

    expect(errors.address1).toStrictEqual(VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
  })
})

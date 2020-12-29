/* eslint-disable */
import { validateInspection } from '../../src/validators/validateInspection'
import { VALIDATION_MESSAGES } from '../../src/constants'
import { ValidCountry } from '../../src/types'

const weekLater = new Date()
weekLater.setDate(weekLater.getDate() + 7)

const fiveDaysLater = new Date()
fiveDaysLater.setDate(fiveDaysLater.getDate() + 5)

const twoDaysLater = new Date()
twoDaysLater.setDate(fiveDaysLater.getDate() + 2)

describe('inspectionValidationSchema', () => {
  it('throws an error when there is a state mismatch with a CA country code', async () => {
    const result = await validateInspection({
      expiration: fiveDaysLater,
      carrier_expiration: weekLater,
      phone: '2145976852',
      state: 'TX',
      city: 'Dallas',
      first_name: 'Ahmed',
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
      phone: '2145976852',
      state: 'TX',
      city: 'Dallas',
      first_name: 'Ahmed',
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
      phone: '2145976852',
      state: 'QC',
      city: 'Dallas',
      first_name: 'Ahmed',
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
      first_name: 'Ahmed',
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

  it(`throws an error when conversation is present but not 24 char`, async () => {
    const { errors } = await validateInspection({ conversation: '2324222  ' })

    expect(errors.conversation).toStrictEqual(
      VALIDATION_MESSAGES.GENERAL.TOO_SHORT_MONGO
    )
  })

  it(`throws an error when expiration is less than 5 days away`, async () => {
    const { errors } = await validateInspection({ expiration: new Date() })

    expect(errors.expiration).toStrictEqual(
      VALIDATION_MESSAGES.DATES.EXPIRATION_FIVE
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
      VALIDATION_MESSAGES.DATES.CARRIER_EXP_SEVEN
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

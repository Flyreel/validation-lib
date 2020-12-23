import { VALID_COUNTRIES } from './constants'
import { ValidCountry } from './types'
import { parsePhoneNumberWithError } from 'libphonenumber-js'

export const isValidCountryCode = (
  countryCode: ValidCountry | string | undefined
): boolean => VALID_COUNTRIES.includes(countryCode as ValidCountry)

export const validatePhoneNumber = (
  phoneNumber: string | undefined,
  countryCode = ValidCountry.US
): boolean => {
  if (!phoneNumber) {
    return false
  }

  if (!isValidCountryCode(countryCode)) {
    return false
  }

  const parsedPhoneNumber = parsePhoneNumberWithError(
    phoneNumber,
    countryCode as ValidCountry
  )

  if (!parsedPhoneNumber.isPossible()) {
    return false
  }

  return parsedPhoneNumber.isValid()
}

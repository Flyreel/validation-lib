import { VALID_COUNTRIES } from './constants'
import { ValidCountry } from './types'
import { parsePhoneNumberWithError } from 'libphonenumber-js'

export const isValidCountryCode = (
  countryCode: ValidCountry | string | undefined
): boolean => VALID_COUNTRIES.includes(countryCode as ValidCountry)

export const validatePhoneNumber = (
  phoneNumber: string | undefined,
  countryCode = ValidCountry.US
): { isValid: boolean; errorMessage: string } => {
  if (!phoneNumber) {
    return { isValid: false, errorMessage: 'No phone number provided' }
  }

  if (!isValidCountryCode(countryCode)) {
    return {
      isValid: false,
      errorMessage: 'Country is not currently supported'
    }
  }

  const parsedPhoneNumber = parsePhoneNumberWithError(
    phoneNumber,
    countryCode as ValidCountry
  )

  if (!parsedPhoneNumber.isPossible()) {
    return {
      isValid: false,
      errorMessage:
        'Not a valid phone number, failed at either the phone number length or matching any regular expressions'
    }
  }

  if (parsedPhoneNumber.country !== countryCode) {
    return {
      isValid: false,
      errorMessage: `The country code for this phone number (${parsedPhoneNumber.country}) does not match the provided country (${countryCode})`
    }
  }

  return {
    isValid: parsedPhoneNumber.isValid(),
    errorMessage: 'Invalid phone number'
  }
}

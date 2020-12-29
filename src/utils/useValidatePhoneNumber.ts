import { PHONE_VALIDATION_MESSAGES, VALID_COUNTRIES } from '../constants'
import { ValidCountry } from '../types'
import { parsePhoneNumber } from 'libphonenumber-js'

export const isValidCountryCode = (
  countryCode: string extends ValidCountry ? ValidCountry : string | undefined
): boolean => VALID_COUNTRIES.includes(countryCode as ValidCountry)

export function useValidatePhoneNumber(
  phoneNumber: string | undefined,
  countryCode?: ValidCountry
): { isValid: boolean; errorMessage: string } {
  const {
    FALLBACK,
    INVALID_COUNTRY_CODE,
    MISSING_PHONE_NUMBER,
    NOT_POSSIBLE
  } = PHONE_VALIDATION_MESSAGES

  if (!phoneNumber) {
    return {
      isValid: false,
      errorMessage: MISSING_PHONE_NUMBER
    }
  }

  if (!isValidCountryCode(countryCode)) {
    return {
      isValid: false,
      errorMessage: INVALID_COUNTRY_CODE
    }
  }

  try {
    const parsedPhoneNumber = parsePhoneNumber(phoneNumber, countryCode)
    const isPossible = parsedPhoneNumber.isPossible()

    if (!isPossible) {
      return {
        isValid: false,
        errorMessage: NOT_POSSIBLE
      }
    }
  } catch (err) {
    return {
      isValid: false,
      errorMessage: FALLBACK
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  }
}

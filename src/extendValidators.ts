import * as Yup from 'yup'
import {
  CA_POSTAL_CODE_REGEX,
  URL_REGEX,
  US_POSTAL_CODE_REGEX
} from './constants'
import { ValidCountry } from './types'
import { validatePhoneNumber } from './utils'
import { ParseError } from 'libphonenumber-js'

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isUrl', function(message: string) {
  return this.test('validateIsUrl', message, function(value) {
    return !value || URL_REGEX.test(value)
      ? true
      : this.createError({ message })
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isUSPostalCode', function(
  message: string
) {
  return this.test('validateIsUSPostalCode', message, function(value) {
    return !value || US_POSTAL_CODE_REGEX.test(value)
      ? true
      : this.createError({ message })
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isCAPostalCode', function(
  message: string
) {
  return this.test('validateIsCAPostalCode', message, function(value) {
    return !value || CA_POSTAL_CODE_REGEX.test(value)
      ? true
      : this.createError({ message })
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'phone', function(
  errorMessage?: string
) {
  let errMsg = errorMessage ?? '${path} must be a valid phone number.'

  return this.test('validateIsPhone', errMsg, value => {
    try {
      return validatePhoneNumber(value)
    } catch (error) {
      if (error instanceof ParseError) {
        errMsg = error.message
      }
      return false
    }
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isUSPhone', function(
  errorMessage?: string
) {
  let errMsg = errorMessage ?? '${path} must be a valid US phone number.'
  return this.test('validateIsUSPhone', errMsg, value => {
    try {
      return validatePhoneNumber(value, ValidCountry.US)
    } catch (error) {
      if (error instanceof ParseError) {
        errMsg = error.message
      }
      return false
    }
  })
})

Yup.addMethod<Yup.StringSchema>(Yup.string, 'isCAPhone', function(
  errorMessage?: string
) {
  let errMsg = errorMessage ?? '${path} must be a valid Canadian phone number.'

  return this.test('validateIsCAPhone', errMsg, value => {
    try {
      return validatePhoneNumber(value, ValidCountry.CA)
    } catch (error) {
      if (error instanceof ParseError) {
        errMsg = error.message
      }
      return false
    }
  })
})

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup'
import {
  MONGOID_REGEX,
  NA_PHONE_REGEX,
  VALIDATION_MESSAGES
} from '../constants'

type OptionalYupString = Yup.StringSchema<
  string | undefined,
  Record<string, any>,
  string | undefined
>

export function checkOptionalString(
  value: string | undefined
): OptionalYupString {
  if (value !== undefined) {
    if (typeof value === 'string') {
      if (value.trim().length > 0) {
        return Yup.string()
          .min(2, VALIDATION_MESSAGES.GENERAL.TOO_SHORT)
          .strict()
      }
    } else {
      return Yup.string().optional()
    }
  }
  return Yup.string().optional()
}

export function checkOptionalEmail(
  value: string | undefined
): OptionalYupString {
  if (value !== undefined) {
    if (value.trim().length > 0) {
      return Yup.string().email(VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT)
    } else return Yup.string().optional()
  }
  return Yup.string().optional()
}

export function checkOptionalPhone(
  value: string | undefined
): OptionalYupString {
  if (value !== undefined && value.trim().length > 0) {
    return Yup.string().matches(NA_PHONE_REGEX, VALIDATION_MESSAGES.PHONE)
  }
  return Yup.string().notRequired()
}

export function checkMongoId(value: string | undefined): OptionalYupString {
  if (value !== undefined && value.trim().length > 0) {
    return Yup.string().matches(MONGOID_REGEX, VALIDATION_MESSAGES.MONGO_ID)
  }
  return Yup.string().optional()
}

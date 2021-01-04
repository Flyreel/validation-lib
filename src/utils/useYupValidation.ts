import * as Yup from 'yup'
import { yupToValidationErrors } from './yupErrorUtils'
import { ValidationErrors, ValidationResult } from '../types'

export async function useYupValidation<T extends Record<string, unknown>>(
  values: Partial<T>,
  validationSchema: Yup.SchemaOf<T>,
  validationOptions: {
    abortEarly: boolean
    stripUnknown: boolean
  }
): Promise<ValidationResult<T>> {
  let errors: ValidationErrors<T> = {}
  const { abortEarly, stripUnknown } = validationOptions

  await validationSchema
    .validate(values, { abortEarly, stripUnknown })
    .then(() => {
      return {} as ValidationErrors<T>
    })
    .catch((error: Yup.ValidationError) => {
      return yupToValidationErrors<T>(error)
    })
    .then(newErrors => {
      errors = newErrors
    })

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

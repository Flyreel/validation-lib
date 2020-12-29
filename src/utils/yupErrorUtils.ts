import { ValidationErrors } from '../types';
import type { ValidationError } from 'yup';

/**
 * Transform Yup errors to a ValidationErrors object
 */
export function yupToValidationErrors<T extends Record<string, unknown>>(
  yupError: ValidationError
): ValidationErrors<T> {
  const errors: ValidationErrors<T> = {}
  if (yupError.inner.length === 0 && yupError.path) {
    updateIn(errors, yupError.path, yupError.message)
    return errors
  }
  for (const err of yupError.inner) {
    if (err.path) {
      updateIn(errors, err.path, err.message)
    }
  }
  return errors
}

export function updateIn(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  path: string,
  value: string
): void {
  const pathArray = path.split('.')
  let destinationObject = obj
  for (let i = 0; i < pathArray.length - 1; i++) {
    if (!destinationObject[pathArray[i]]) {
      destinationObject[pathArray[i]] = {}
    }
    destinationObject = destinationObject[pathArray[i]]
  }
  destinationObject[pathArray[pathArray.length - 1]] = value
}

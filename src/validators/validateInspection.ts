import {
  InspectionToBeValidated,
  ValidationErrors,
  ValidationResult
} from '../types'
import { inspectionValidationSchema } from '../schemas/inspection'
import { useYupValidation } from '../utils/useYupValidation'

export async function validateInspection(
  inspection: Partial<InspectionToBeValidated>,
  options?: {
    abortEarly: boolean
    stripUnknown: boolean
  }
): Promise<ValidationResult<InspectionToBeValidated>> {
  return await useYupValidation(inspection, inspectionValidationSchema, {
    abortEarly: options?.abortEarly ?? false,
    stripUnknown: options?.stripUnknown ?? false
  })
}

export async function validateInspectionUpdate(
  patch: Partial<InspectionToBeValidated>,
  inspectionBeingUpdated: InspectionToBeValidated
): Promise<ValidationResult<InspectionToBeValidated>> {
  const updateErrors: ValidationErrors<InspectionToBeValidated> = {}
  const updatedKeys = Object.keys(patch)

  const countryLinkedFields = ['country', 'zip_code', 'state', 'phone']
  const dateLinkedFields = ['carrier_expiration', 'expiration']

  const draft = { ...inspectionBeingUpdated, ...patch }

  const { errors } = await validateInspection(draft, {
    abortEarly: false,
    stripUnknown: false
  })

  updatedKeys.forEach(key => {
    // need to make sure the linked fields get checked if only one gets updated
    if (countryLinkedFields.includes(key)) {
      countryLinkedFields.forEach(key => {
        if (errors[key as keyof InspectionToBeValidated]) {
          Object.assign(updateErrors, {
            [key]: errors[key as keyof InspectionToBeValidated]
          })
        }
      })
    }

    if (dateLinkedFields.includes(key)) {
      dateLinkedFields.forEach(key => {
        if (errors[key as keyof InspectionToBeValidated]) {
          Object.assign(updateErrors, {
            [key]: errors[key as keyof InspectionToBeValidated]
          })
        }
      })
    }

    if (errors[key as keyof InspectionToBeValidated]) {
      Object.assign(updateErrors, {
        [key]: errors[key as keyof InspectionToBeValidated]
      })
    }
  })

  return {
    isValid: Object.keys(updateErrors).length === 0,
    errors: updateErrors
  }
}

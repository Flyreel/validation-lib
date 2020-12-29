import { InspectionToBeValidated, ValidationResult } from '../types'
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

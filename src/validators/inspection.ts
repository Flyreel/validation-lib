import {
  CreateInspectionPayload,
  CreateSpecificMeta,
  UpdateInspectionPayload,
  ValidationErrors,
  ValidationResult
} from '../types'
import {
  createInspectionSchema,
  createMetaFieldSchema,
  updateInspectionValidationSchema
} from '../schemas/inspection'
import { useYupValidation } from '../utils/useYupValidation'

type ValidatorOptions = {
  abortEarly: boolean
  stripUnknown: boolean
}

export async function validateCreateInspectionMeta(
  meta: CreateSpecificMeta,
  options?: ValidatorOptions
): Promise<ValidationResult<CreateInspectionPayload['meta']>> {
  return await useYupValidation(meta, createMetaFieldSchema, {
    abortEarly: options?.abortEarly ?? false,
    stripUnknown: options?.stripUnknown ?? false
  })
}

export async function validateCreateInspection(
  inspection: Partial<CreateInspectionPayload>,
  options?: ValidatorOptions
): Promise<ValidationResult<CreateInspectionPayload>> {
  return await useYupValidation(inspection, createInspectionSchema, {
    abortEarly: options?.abortEarly ?? false,
    stripUnknown: options?.stripUnknown ?? false
  })
}

export async function validateUpdateInspection(
  patch: Partial<UpdateInspectionPayload>,
  inspectionBeingUpdated: UpdateInspectionPayload,
  options?: ValidatorOptions
): Promise<ValidationResult<UpdateInspectionPayload>> {
  const updateErrors: ValidationErrors<UpdateInspectionPayload> = {}
  const updatedKeys = Object.keys(patch)

  const countryLinkedFields = ['country', 'zip_code', 'state', 'phone']
  const dateLinkedFields = ['carrier_expiration', 'expiration']

  const draft = { ...inspectionBeingUpdated, ...patch }

  const { errors } = await useYupValidation<UpdateInspectionPayload>(
    draft,
    updateInspectionValidationSchema,
    {
      abortEarly: options?.abortEarly ?? false,
      stripUnknown: options?.stripUnknown ?? false
    }
  )

  updatedKeys.forEach(key => {
    // need to make sure the linked fields get checked if only one gets updated
    if (countryLinkedFields.includes(key)) {
      countryLinkedFields.forEach(key => {
        if (errors[key as keyof UpdateInspectionPayload]) {
          Object.assign(updateErrors, {
            [key]: errors[key as keyof UpdateInspectionPayload]
          })
        }
      })
    }

    if (dateLinkedFields.includes(key)) {
      dateLinkedFields.forEach(key => {
        if (errors[key as keyof UpdateInspectionPayload]) {
          Object.assign(updateErrors, {
            [key]: errors[key as keyof UpdateInspectionPayload]
          })
        }
      })
    }

    if (errors[key as keyof UpdateInspectionPayload]) {
      Object.assign(updateErrors, {
        [key]: errors[key as keyof UpdateInspectionPayload]
      })
    }
  })

  return {
    isValid: Object.keys(updateErrors).length === 0,
    errors: updateErrors
  }
}

import * as Yup from 'yup'
import { ValidCountry } from '../types'

const CreateInspectionOptionalFieldsSchema = Yup.object().shape({
  address2: Yup.string()
    .notRequired()
    .when('address2', {
      is: (value: string | undefined) => value !== undefined,
      then: Yup.string().min(1, 'Valid address required')
    }),

  agent_email: Yup.string()
    .notRequired()
    .when('agent_email', {
      is: (value: string | undefined) => value !== undefined,
      then: Yup.string().email('Valid email required')
    }),

  agent_name: Yup.string()
    .notRequired()
    .when('agent_name', {
      is: (value: string | undefined) => value !== undefined,
      then: Yup.string().min(1, 'Valid name required')
    }),

  agent_phone: Yup.string()
    .notRequired()
    .when('agent_phone', {
      is: (value: string | undefined) => value !== undefined,
      then: Yup.string().min(1, 'Please enter a valid address')
    }),

  country: Yup.string()
    .notRequired()
    .when('country', {
      is: (value: string | undefined) => value !== undefined,
      then: Yup.string().oneOf(
        [ValidCountry.US, ValidCountry.CA],
        'Flyreel Type Required'
      )
    }),

  longitude: Yup.number().notRequired(),

  latitude: Yup.number().notRequired()
})

export const CreateInspectionValidationSchema = Yup.object()
  .shape({
    address1: Yup.string()
      .min(1, 'Please enter a valid address')
      .required('Address Required'),

    // This is the radio button.
    preferredContact: Yup.string().required('Preferred contact is required.'),
    // This is the input field.
    contactPhone: Yup.string().when('preferredContact', {
      is: 'Phone',
      then: Yup.string().required('Phone number is required.')
    }),
    // This is another input field.
    contactEmail: Yup.string().when('preferredContact', {
      is: 'Email',
      then: Yup.string()
        .email('Please use a valid email address.')
        .required('Email address is required.')
    })
  })
  .concat(CreateInspectionOptionalFieldsSchema)

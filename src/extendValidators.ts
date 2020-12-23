import * as Yup from 'yup'
import { URL_REGEX } from './constants'

export function extendValidators(): void {
  Yup.addMethod<Yup.StringSchema>(Yup.string, 'isUrl', function(
    message: string
  ) {
    return this.test('validateIsUrl', message, function(value) {
      const { createError, path } = this
      return !value || URL_REGEX.test(value)
        ? true
        : createError({ path, message })
    })
  })
}

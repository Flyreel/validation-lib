import * as Yup from 'yup'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { ValidCountry } from './types'


function isValidPhoneNumber(
    this: Yup
    countryCode: string,
    strict = false,
    errorMessage = ''
  ) {
    const errMsg =
      typeof errorMessage === 'string' && errorMessage
        ? errorMessage
        : isValidCountryCode(countryCode)
        ? `\${path} must be a valid phone number for region ${countryCode}`
        : '${path} must be a valid phone number.'
  
    return this.test('phone', errMsg, (value: string) => {
      if (!isValidCountryCode(countryCode)) {
        // if not valid countryCode, then set default country to India (IN)
        countryCode = 'IN'
        strict = false
      }
  
      try {
        const phoneNumber = phoneUtil.parseAndKeepRawInput(value, countryCode)
  
        if (!phoneUtil.isPossibleNumber(phoneNumber)) {
          return false
        }
  
        const regionCodeFromPhoneNumber = phoneUtil.getRegionCodeForNumber(
          phoneNumber
        )
  
        /* check if the countryCode provided should be used as
           default country code or strictly followed
         */
        return strict
          ? phoneUtil.isValidNumberForRegion(phoneNumber, countryCode)
          : phoneUtil.isValidNumberForRegion(
              phoneNumber,
              regionCodeFromPhoneNumber
            )
      } catch {
        return false
      }
    })
  }))


const isValidCountryCode = (countryCode: any): boolean =>
  typeof countryCode === 'string' &&
  countryCode.length === CLDR_REGION_CODE_SIZE

Yup.addMethod(Yup.string, 'phone', )

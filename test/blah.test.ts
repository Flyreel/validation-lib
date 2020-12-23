import { validateInspection } from '../src/schema'
import { ValidCountry } from '../src/types'

describe('inspectionValidationSchema', () => {
  it('works', async () => {
    console.log(
      await validateInspection({
        phone: '2145976852',
        state: 'TX',
        city: 'Dallas',
        first_name: 'Ahmed',
        zip_code: '00000',
        country: ValidCountry.CA
      })
    )

    console.log(
      await validateInspection({
        phone: '2145976852',
        state: 'NB',
        city: 'Dallas',
        first_name: 'CanadianAhmed',
        zip_code: '566',
        country: ValidCountry.US
      })
    )

    expect(1 + 1).toEqual(2)
  })
})

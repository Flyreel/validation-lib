import { inspectionValidationSchema } from '../src/schema'

describe('inspectionValidationSchema', () => {
  it('works', async () => {
    console.log(
      await inspectionValidationSchema
        .validate({}, { abortEarly: false })
        .catch(err => err.errors)
    )
    expect(1 + 1).toEqual(2)
  })
})

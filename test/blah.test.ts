import { inspectionValidationSchema } from '../src/createInspection'

describe('inspectionValidationSchema', () => {
  it('works', () => {
    console.log(inspectionValidationSchema.__isYupSchema__)
    expect(1 + 1).toEqual(2)
  })
})

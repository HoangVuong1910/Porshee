/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEnityError } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

describe('isAxiosError', () => {
  it('isAxiosError return boolean value', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEnityError', () => {
  it('isAxiosUnprocessableEntityError return boolean value', () => {
    expect(isAxiosUnprocessableEnityError(new Error())).toBe(false)

    expect(
      isAxiosUnprocessableEnityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)

    expect(
      isAxiosUnprocessableEnityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})

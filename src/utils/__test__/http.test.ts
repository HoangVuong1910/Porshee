import { describe, it, expect, beforeEach } from 'vitest'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { Http } from '../http'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

describe('HTTP Axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODdhYjVjYmI2NTk3MDMzNjYxMWYzNSIsImVtYWlsIjoiYWR2QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDgtMjhUMDk6MDk6NDQuMTU1WiIsImlhdCI6MTcyNDgzNjE4NCwiZXhwIjoxNzI0ODM2MTg1fQ.S2-wKeWhJk8WH3lErrdu8SQ5jYVdIXfOzmtCfL_DmZM'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODdhYjVjYmI2NTk3MDMzNjYxMWYzNSIsImVtYWlsIjoiYWR2QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDgtMjhUMDk6MDk6NDQuMTU1WiIsImlhdCI6MTcyNDgzNjE4NCwiZXhwIjoxNzI0OTIyNTg0fQ.hjvq8z44U32KAXsH6YMydmtQu-YOfzp9o4F4hzEaenM'

  it('should return status OK when fetching products', async () => {
    const res = await http.get('/products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('should return status OK when the user is authenticated', async () => {
    await http.post('/login', {
      email: 'adv@gmail.com',
      password: '123123'
    })
    const res = await http.get('/me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('should return status OK and new access token when refesh token', async () => {
    setAccessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('/me')
    console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})

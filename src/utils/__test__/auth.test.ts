import { describe, it, expect, beforeEach } from 'vitest'
import {
  clearDataLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS
} from '../auth'

// get access_token & refresh_token from your account
const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODdhYjVjYmI2NTk3MDMzNjYxMWYzNSIsImVtYWlsIjoiYWR2QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDgtMjdUMDk6MTk6NDUuMDU4WiIsImlhdCI6MTcyNDc1MDM4NSwiZXhwIjoxNzI0ODM2Nzg1fQ.wWXJ7vk0m1VS9kQppPVXyXLsSeK1WBI5YZLkM_kRjd4'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODdhYjVjYmI2NTk3MDMzNjYxMWYzNSIsImVtYWlsIjoiYWR2QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDgtMjdUMDk6MTk6NDUuMDU4WiIsImlhdCI6MTcyNDc1MDM4NSwiZXhwIjoxNzM4NTc0Mzg1fQ.P_9lZ7C0cj8GWzGg710CkwOr0fNiQ1KOn8xXUAbgm3o'

beforeEach(() => {
  localStorage.clear()
})

describe('setAccessTokenToLS', () => {
  it('access_token must be set to local storage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

/**
 * different toBe vs toEqual:
 * - toEqual thì có thể kiểm tra 2 object có bằng nhau
 * hay là không. Còn toBe thì không kiểm tra được. Cho
 * dù có giống hệt nhau về value bên trong, nhưng mà nó
 * khác tham chiếu thì nó là khác nhau
 */

describe('refresh_token', () => {
  it('refresh_token must be set to local storage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toEqual(refresh_token) // case String thì toBe hay toEqual là như nhau
  })
})

describe('clearDataLocalStorage', () => {
  it('clear all data: access_token, refresh_token', () => {
    setRefreshTokenToLS(refresh_token)
    setAccessTokenToLS(access_token)

    clearDataLocalStorage()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
  })
})

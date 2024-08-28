/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/named
import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenReponse } from 'src/types/auth.type'
import {
  clearDataLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL as string}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 ngày
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
      }
    })
    // xử lý nếu request có access token thì đính kèm vào authorization gửi lên server
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearDataLocalStorage()
        }
        // console.log(response)
        // console.log(url)
        return response
      },
      (error: AxiosError) => {
        // if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   const data: any | undefined = error.response?.data
        //   const message = data?.message || error.message
        //   console.log(error)
        //   toast(message)
        // }
        // if (error.response?.status === HttpStatusCode.Unauthorized) {
        //   clearDataLocalStorage()
        //   // window.location.reload()
        // }

        // Xử lý lỗi không phải lỗi 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Lỗi Unauthorized (401) có nhiều case như
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          console.log('check 401', error)
          const config = (error.response?.config as InternalAxiosRequestConfig) || {}
          const { url } = config
          // Trường hợp Access Token hết hạn và request đó không phải là của request refresh token
          // tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Giới hạn số lượng gọi handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dừng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Gọi lại request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  authorization: access_token
                }
              })
            })
          }

          // Còn những trường hợp còn lại như token không đúng, không truyền token, token hết hạn nhưng gọi refresh token bị fail
          // Thực hiện cho user logout bằng cách clear data trong localstorage

          clearDataLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }

        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        // trường hợp lôi là do refresh token hết hạn thì cho user logout bằng cách xóa data trong localstorage
        clearDataLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http

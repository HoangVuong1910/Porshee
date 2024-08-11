/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearDataLocalStorage, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import path from 'src/constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL as string}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
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
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearDataLocalStorage()
        }
        // console.log(response)
        // console.log(url)
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          console.log(error)
          toast(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearDataLocalStorage()
          // window.location.reload()
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http

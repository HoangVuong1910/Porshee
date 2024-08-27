/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Schema, getRules, schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEnityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        // console.log(data)
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEnityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              // setError(key as keyof FormData, {
              //                 message: formError[key as keyof FormData],
              //                 type: 'Server'
              //               })
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   setError,
  //   getValues,
  //   formState: { errors }
  // } = useForm<FormData>({
  //   resolver: yupResolver(loginSchema)
  // })

  // const loginAccountMutation = useMutation({
  //   mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
  // })

  // const onSubmit = handleSubmit((data) => {
  //   loginAccountMutation.mutate(data, {
  //     onSuccess: (data) => {
  //       console.log(data)
  //     },
  //     onError: (error) => {
  //       // set
  //       if (isAxiosUnprocessableEnityError<ResponseApi<FormData>>(error)) {
  //         const formError = error.response?.data.data
  //         if (formError) {
  //           Object.keys(formError).forEach((key) => {
  //             setError(key as keyof FormData, {
  //               message: formError[key as keyof FormData],
  //               type: 'Server'
  //             })
  //           })
  //         }
  //       }
  //     }
  //   })
  // })
  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name='description' content='Đăng nhập để mua hàng' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                name='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Email'
                // rules={rules.email}
              />

              <Input
                className='mt-2'
                name='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Password'
                // rules={rules.password}
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='[text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.register}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

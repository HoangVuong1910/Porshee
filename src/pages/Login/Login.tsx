/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { Schema, getRules, loginSchema, schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { loginAccount, registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEnityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import Input from 'src/components/Input'

type FormData = Omit<Schema, 'confirm_password'>
export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEnityError<ResponseApi<FormData>>(error)) {
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
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
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
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='[text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
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

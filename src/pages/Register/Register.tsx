/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, getRules, schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEnityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

// interface Formdata {
//   email: string
//   password: string
//   confirm_password: string
// }
type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        // set
        if (isAxiosUnprocessableEnityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          // if(formError){
          //   Object.keys(formError).forEach((key)=>{
          //     setError(key of Omit<FormData, 'confirm_password'>,{
          //       message: formError[key],
          //       type: 'Server'
          //     } )
          //   })
          // }
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  // console.log(errors)
  // const rules = getRules(getValues)
  return (
    <div className='bg-orange'>
      <div className='container'>
        {/* <div className='max-w-7xl mx-auto px-4'> */}
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                name='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Email'
                // rules={rules.email}
              />
              {/* <div className='mt-8'>
                <input
                  type='email'
                  // name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div> */}
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
              {/* <div className='mt-2'>
                <input
                  type='password'
                  // name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div> */}
              <Input
                className='mt-2'
                name='confirm_password'
                register={register}
                type='password'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                // rules={rules.confirm_password}
                autoComplete='on'
              />
              {/* <div className='mt-2'>
                <input
                  type='password'
                  // name='confirm_password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                  placeholder='Confirm Password'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div> */}
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng Ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='[text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

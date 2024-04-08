/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  className?: string
  name: string
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions | undefined
  errorMessage?: string
  autoComplete?: string
}

export const Input = ({
  className,
  name,
  type,
  placeholder,
  register,
  rules,
  errorMessage,
  autoComplete
}: InputProps) => {
  return (
    <div className={className}>
      <input
        type={type}
        // name='email'
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

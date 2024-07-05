/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // className?: string
  // name: string
  // type: React.HTMLInputTypeAttribute
  // placeholder?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions | undefined
  errorMessage?: string
  // autoComplete?: string
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  className,
  name,
  register,
  rules,
  errorMessage,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  ...rest
}: InputProps) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input
        // type={type}
        // name='email'
        className={classNameInput}
        // placeholder={placeholder}
        // autoComplete={autoComplete}
        // {...register(name, rules)}
        {...registerResult}
        {...rest}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputProps>(function InputNumberInner(
  {
    className,
    errorMessage,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // kiểm tra nếu giá trị nhập vào là số và có truyền sự kiện onChange thì mới cho thực hiện sự kiện onChange
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber

// export default function InputNumber({
//   className,
//   errorMessage,
//   classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm',
//   classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
//   onChange,
//   ...rest
// }: InputProps) {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value
//     // kiểm tra nếu giá trị nhập vào là số và có truyền sự kiện onChange thì mới cho thực hiện sự kiện onChange
//     if ((/^\d+$/.test(value) || value === '') && onChange) {
//       onChange(event)
//     }
//   }
//   return (
//     <div className={className}>
//       <input className={classNameInput} onChange={handleChange} {...rest} />
//       <div className={classNameError}>{errorMessage}</div>
//     </div>
//   )
// }

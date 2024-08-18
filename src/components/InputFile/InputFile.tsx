import React, { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import { maxUploadSize } from 'src/constants/file'
interface Props {
  onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0] // lấy ra file ảnh từ ng dùng chọn
    // validate kích thước và type của file image
    if (fileFromLocal && (fileFromLocal.size >= maxUploadSize || !fileFromLocal.type.includes('image'))) {
      toast.error('File vượt quá kích thước 1MB hoặc không đúng định dạng .JPEG,.PNG')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      ></input>
      <button
        className='flex h-10 items-center  rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}

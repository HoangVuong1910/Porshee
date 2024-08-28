// import React from 'react'

export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='relative inline-flex'>
        <div className='h-8 w-8 rounded-full bg-orange'></div>
        <div className='absolute left-0 top-0 h-8 w-8 animate-ping rounded-full bg-orange'></div>
        <div className='absolute left-0 top-0 h-8 w-8 animate-pulse rounded-full bg-orange'></div>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to='/'>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        {/* image  */}
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lt1954kl0og44a_tn'
            alt=''
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>

        <div className='p-2 overflow-hidden'>
          {/* title  */}
          <div className='min-h-[2rem] line-clamp-2 text-xs'>
            Áo thun cặp thêu chữ BÉEE cho nam nữ form rộng chất cotton mỏng nhẹ. Clothingforgirl x MaMie Studio
          </div>
          {/* price  */}
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>đ</span>
              <span>115.000</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>đ</span>
              <span>86.000</span>
            </div>
          </div>
          {/* rating  */}
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden ' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x='0'
                    y='0'
                    className='w-3 h-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                    ></polygon>
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x='0'
                  y='0'
                  className='w-3 h-3 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                  ></polygon>
                </svg>
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <span>Đã bán</span>
              <span className='ml-1'>5,66k</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

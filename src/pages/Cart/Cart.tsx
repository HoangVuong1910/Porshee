import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import Quantity from 'src/components/Quantity'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'

interface ExtendedPurchase extends Purchase {
  disabled: boolean // disabled item khi call api lúc onChange event tăng giảm sl sản phẩm
  checked: boolean // check & uncheck sp
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  // set data vào state
  useEffect(() => {
    setExtendedPurchases(
      purchasesInCart?.map((purchase) => ({
        ...purchase,
        disabled: false,
        checked: false
      })) || []
    )
  }, [purchasesInCart])

  // Xử lý onChange event checked item
  const handleChecked = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
      })
    )
  }
  // Xử lý chọn tất cả
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            {/* header  */}
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
              {/* header left  */}
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              {/* header right  */}
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            {/* content  */}
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='mb-5 first:mt-0 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 '
                >
                  {/* content left  */}
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleChecked(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`${path.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                            className='h-20 w-20 flex-shrink-0'
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='line-clamp-2'
                            >
                              {' '}
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* content right  */}
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      {/* content right product price  */}
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      {/* content price product quantity  */}
                      <div className='col-span-1'>
                        <Quantity
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      {/* content right product total price  */}
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      {/* content right product delete button  */}
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* sticky  */}
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col sm:flex-row sm:items-center rounded-sm  bg-white p-5 shadow border border-gray-100'>
          {/* sticky left  */}
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchases.length}){' '}
            </button>
            <button className='mx-3 border-none bg-none'>Xóa</button>
          </div>

          {/* sticky right  */}
          <div className='sm:ml-auto flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-0'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán (0 sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫138.000</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫102.000</div>
              </div>
            </div>
            <Button className='mt-5  flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

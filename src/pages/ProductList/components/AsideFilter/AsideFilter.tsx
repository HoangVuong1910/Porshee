import React from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { omit } from 'lodash'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars/RatingStars'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ObjectSchema } from 'yup'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>

/**
 *
 * Rule Validate
 * Nếu có price_min và price_max thì price_max  >= price_min
 * Hoặc có price_min thì không có price_max và ngược lại
 */
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { t } = useTranslation(['home', 'product'])
  const { category } = queryConfig
  // console.log(categories)
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    // watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>),
    shouldFocusError: false
  })
  // const valueForm = watch()
  // console.log(valueForm)
  console.log(errors)
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleResetAllFilters = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter'])).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold uppercase', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('aside filter.all categories')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300 '></div>
      <ul>
        {categories &&
          categories.map((categoryItem) => {
            const isActive = categoryItem._id === category
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2 ', { 'font-semibold text-orange': isActive })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                      <polygon points='4 3.5 0 0 0 7'></polygon>
                    </svg>
                  )}

                  {categoryItem.name}
                </Link>
              </li>
            )
          })}

        {/* <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Thời trang nữ
          </Link>
        </li> */}
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit='10'
            ></polyline>
          </g>
        </svg>
        {t('aside filter.filter search')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300 '></div>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ TỪ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                    classNameError='hidden'
                    // onChange={field.onChange}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    ref={field.ref}
                  ></InputNumber>
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    name='to'
                    placeholder='đ ĐẾN'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                    classNameError='hidden'
                    // onChange={field.onChange}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    value={field.value}
                    ref={field.ref}
                  ></InputNumber>
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300 '></div>
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300 '></div>
      <Button
        onClick={handleResetAllFilters}
        className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

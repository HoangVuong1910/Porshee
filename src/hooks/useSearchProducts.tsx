import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])
export default function useSearchProducts() {
  const queryConfig = useQueryConfig()

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()
  // xử lý submit form input search
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order']
        )
      : omit({
          ...queryConfig,
          name: data.name
        })
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}

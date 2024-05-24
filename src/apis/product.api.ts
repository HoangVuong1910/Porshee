import { SuccessResponse } from './../types/utils.type'
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import http from 'src/utils/http'

const url = '/products'

export const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(url, { params })
  },
  getDetailProduct(id: string) {
    return http.get<SuccessResponse<Product>>(`${url}/${id}`)
  }
}

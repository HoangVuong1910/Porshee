import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const url = '/categories'
const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(url)
  }
}

export default categoryApi

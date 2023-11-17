import axios, { type AxiosResponse } from 'axios'

export interface Product {
  id: number
  name_uz: string
  address: string
  cost: number
  product_type_id: number
  created_date: number
}

interface ApiClient {
  getProducts: () => Promise<AxiosResponse<Product[]>>
  createProduct: (product: Product) => Promise<AxiosResponse<void>>
  updateProduct: (product: Product) => Promise<AxiosResponse<void>>
  deleteProduct: (id: number) => Promise<AxiosResponse<void>>
}

const apiClient = axios.create({
  baseURL: 'http://94.158.54.194:9092',
  headers: {
    'Content-Type': 'application/json'
  }
})

const productApi: ApiClient = {
  getProducts: () => apiClient.get('/api/product'),
  createProduct: (product: Product) => apiClient.post('/api/product', product),
  updateProduct: (product: Product) => apiClient.put(`/api/product`, product),
  deleteProduct: (id: number) => apiClient.delete(`/api/product/${id}`)
}

export default productApi

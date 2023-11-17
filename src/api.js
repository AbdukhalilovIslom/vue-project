import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://94.158.54.194:9092',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getProducts() {
    return apiClient.get('/api/product')
  },

  createProduct(product) {
    return apiClient.post('/api/product', product)
  },

  updateProduct(product) {
    return apiClient.put(`/api/product`, product)
  },

  deleteProduct(id) {
    return apiClient.delete(`/api/product/${id}`)
  }
}

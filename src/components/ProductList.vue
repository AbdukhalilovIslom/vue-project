<template>
  <div>
    <h2>Add product</h2>
    <form @submit.prevent="submitForm">
      <label>Name:</label>
      <input v-model="newProduct.name_uz" required />
      <br />
      <label>Address:</label>
      <input v-model="newProduct.address" required />
      <br />
      <label>Cost:</label>
      <input v-model="newProduct.cost" required type="number" />
      <br />
      <button type="submit">create</button>
    </form>
  </div>
  <div v-if="editing">
    <h2>Add product</h2>
    <form @submit.prevent="submitEditForm">
      <label>Name:</label>
      <input v-model="editing.name_uz" required />
      <br />
      <label>Address:</label>
      <input v-model="editing.address" required />
      <br />
      <label>Cost:</label>
      <input v-model="editing.cost" required type="number" />
      <br />
      <button type="submit">Save</button>
    </form>
  </div>
  <div>
    <h2>Product List</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        <span>{{ product.name_uz }}</span>
        <span>{{ product.address }}</span>
        <span>{{ product.cost }}</span>
        <button @click="edit(product)">Edit</button>
        <button @click="deleteProduct(product.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      products: [],
      newProduct: {},
      editing: null,
      render: 0
    }
  },
  methods: {
    async fetchProducts() {
      const response = await api.getProducts()
      this.products = response.data
    },
    async submitForm() {
      const product = {
        name_uz: this.newProduct.name_uz,
        address: this.newProduct.address,
        cost: this.newProduct.cost,
        product_type_id: 0,
        created_date: Date.now()
      }
      await api.createProduct(product).then(() => {
        this.newProduct = {}
        this.render = Math.random()
      })
    },
    edit(product) {
      this.editing = Object.assign({}, product)
    },
    async submitEditForm() {
      await api.updateProduct(this.editing).then(() => {
        this.editing = null
        this.render = Math.random()
      })
    },
    async deleteProduct(id) {
      api.deleteProduct(id)
      this.products = this.products.filter((c) => c.id !== id)
    }
  },
  watch: {
    render() {
      console.log('asd')
      this.fetchProducts()
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

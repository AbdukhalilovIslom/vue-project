<template>
  <div class="home">
    <CreateProduct :handleRender="handleRender" />
    <div v-if="editing">
      <EditProduct :editing="editing" :handleRender="handleRender" :editClose="editClose" />
    </div>
    <div v-if="products.length !== 0" class="products__container">
      <ProductList :products="products" :edit="edit" :deleteProduct="deleteProduct" />
    </div>
    <div class="not__found" v-else>No products</div>
  </div>
</template>

<script lang="ts">
import api, { type Product } from '../api'
import CreateProduct from '@/components/CreateProduct.vue'
import EditProduct from '@/components/EditProduct.vue'
import ProductList from '@/components/ProductList.vue'

export default {
  data() {
    return {
      products: [] as Product[],
      newProduct: {} as Partial<Product>,
      editing: null as Product | null,
      render: 0
    }
  },
  components: {
    CreateProduct,
    EditProduct,
    ProductList
  },
  methods: {
    handleRender() {
      this.render = Math.random()
    },
    async fetchProducts() {
      const response = await api.getProducts()
      this.products = response.data
    },
    edit(product: Product) {
      this.editing = { ...product }
      console.log(this.editing)
    },
    editClose() {
      this.editing = null
    },
    async deleteProduct(id: number) {
      await api.deleteProduct(id).then(this.handleRender)
    }
  },
  mounted() {
    this.fetchProducts()
  },
  watch: {
    render() {
      this.fetchProducts()
    }
  }
}
</script>

<style src="../style/styles.css" scoped></style>

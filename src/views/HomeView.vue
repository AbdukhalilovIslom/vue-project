<template>
  <div class="home">
    <CreateProduct />
    <div v-if="editing">
      <EditProduct :editing="editing" :editClose="editClose" />
    </div>
    <div v-if="products.length !== 0" class="products__container">
      <ProductList :products="products" :edit="edit" />
    </div>
    <div class="not__found" v-else>No products</div>
  </div>
</template>

<script lang="ts">
import api, { type Product } from '../api'
import CreateProduct from '@/components/CreateProduct.vue'
import EditProduct from '@/components/EditProduct.vue'
import ProductList from '@/components/ProductList.vue'
import { useRender } from '../store/render'

export default {
  data() {
    return {
      products: [] as Product[],
      newProduct: {} as Partial<Product>,
      editing: null as Product | null,
      render: useRender()
    }
  },
  components: {
    CreateProduct,
    EditProduct,
    ProductList
  },
  methods: {
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
    }
  },
  mounted() {
    this.fetchProducts()
  },
  watch: {
    'render.render'() {
      this.fetchProducts()
    }
  }
}
</script>

<style src="../style/styles.css" scoped></style>

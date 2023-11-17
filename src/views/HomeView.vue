<template>
  <div class="home">
    <CreateProduct />
    <div v-if="editing">
      <EditProduct />
    </div>
    <div v-if="products.length !== 0" class="products__container">
      <ProductList :products="products" />
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
import { useEditing } from '@/store/editing'

export default {
  data() {
    return {
      products: [] as Product[],
      newProduct: {} as Partial<Product>,
      editing: useEditing(),
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

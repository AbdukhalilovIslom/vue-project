<template>
  <div class="add__product">
    <h3 class="add__product__title">Create your product</h3>
    <form class="add__product__form" @submit.prevent="submitForm">
      <span class="add__product__input"
        ><label>Name:</label>
        <input
          placeholder="Apple"
          class="add__product__input_i"
          v-model="newProduct.name_uz"
          required
      /></span>
      <span class="add__product__input"
        ><label>Address:</label>
        <input
          placeholder="USA"
          class="add__product__input_i"
          v-model="newProduct.address"
          required
      /></span>
      <span class="add__product__input"
        ><label>Cost:</label>
        <input
          placeholder="10"
          class="add__product__input_i"
          v-model="newProduct.cost"
          required
          type="number"
      /></span>
      <button class="add__product__form__btn" type="submit">Create</button>
    </form>
  </div>
</template>

<script lang="ts">
import api, { type Product } from '../api'
import { useRender } from '../store/render'

export default {
  data() {
    return {
      newProduct: {} as Partial<Product>,
      render: useRender()
    }
  },
  methods: {
    async submitForm() {
      const product: Product = {
        name_uz: this.newProduct.name_uz || '',
        address: this.newProduct.address || '',
        cost: this.newProduct.cost || 0,
        product_type_id: 0,
        created_date: Date.now()
      }

      await api.createProduct(product).then(() => {
        this.newProduct = {}
        this.render.reRender()
      })
    }
  }
}
</script>

<style src="../style/styles.css"></style>

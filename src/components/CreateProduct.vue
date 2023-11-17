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

<script setup lang="ts">
import { ref } from 'vue'
import api, { type Product } from '../api'

const { render } = defineProps(['render'])
const newProduct = ref<Partial<Product>>({})

async function submitForm() {
  const product: Product = {
    name_uz: newProduct.value.name_uz || '',
    address: newProduct.value.address || '',
    cost: newProduct.value.cost || 0,
    product_type_id: 0,
    created_date: Date.now()
  }

  await api.createProduct(product).then(() => {
    newProduct.value = {}
    render.value = Math.random()
  })
}
</script>

<style src="../style/styles.css"></style>

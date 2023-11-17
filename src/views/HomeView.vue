<template>
  <div class="home">
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
    <div v-if="editing" class="edit__popup">
      <div class="edit__inner">
        <img @click="editClose()" src="../assets/close.png" alt="" class="edit__close_icon" />
        <h2 class="edit__popup__title">Add product</h2>
        <form class="edit__popup__form" @submit.prevent="submitEditForm">
          <label>Name:</label>
          <input class="edit__popup__form__input" v-model="editing.name_uz" required />
          <br />
          <label>Address:</label>
          <input class="edit__popup__form__input" v-model="editing.address" required />
          <br />
          <label>Cost:</label>
          <input class="edit__popup__form__input" v-model="editing.cost" required type="number" />
          <br />
          <button class="edit__popup__form__btn" type="submit">Save</button>
        </form>
      </div>
    </div>
    <div v-if="products.length !== 0" class="products__container">
      <h2 class="products__title">Your products</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Cost</th>
            <th scope="col">Edit | Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name_uz }}</td>
            <td>{{ product.address }}</td>
            <td>${{ product.cost }}</td>
            <td>
              <button class="product__edit" @click="edit(product)">Edit</button>
              <button class="product__delete" @click="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="not__found" v-else>No products</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api, { type Product } from '../api'

const products = ref<Product[]>([])
const newProduct = ref<Partial<Product>>({})
const editing = ref<Product | null>(null)
const render = ref<number>(0)

async function fetchProducts() {
  const response = await api.getProducts()
  products.value = response.data
}

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

function edit(product: Product) {
  editing.value = { ...product }
}
function editClose() {
  editing.value = null
}
async function submitEditForm() {
  if (editing.value) {
    await api.updateProduct(editing.value).then(() => {
      editClose()
      render.value = Math.random()
    })
  }
}

async function deleteProduct(id: number) {
  await api.deleteProduct(id).then(() => (render.value = Math.random()))
}

onMounted(() => {
  fetchProducts()
})

watch(render, () => {
  fetchProducts()
})
</script>

<style src="../style/styles.css" scoped></style>

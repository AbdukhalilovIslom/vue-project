<template>
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
</template>

<script lang="ts">
import { type Product } from '@/api'
export default {
  props: {
    products: {
      type: Array as () => Product[],
      required: true
    },
    edit: {
      type: Function,
      required: true
    },
    deleteProduct: {
      type: Function,
      required: true
    }
  }
}
</script>

<style src="../style/styles.css" scoped></style>

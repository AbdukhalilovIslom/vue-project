<template>
  <h2 class="products__title">Your products</h2>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">Cost</th>
        <th scope="col">Created at</th>
        <th scope="col">Edit | Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name_uz }}</td>
        <td>{{ product.address }}</td>
        <td>${{ product.cost }}</td>
        <td>
          {{
            ('0' + new Date(product.created_date).getHours()).slice(-2) +
            ':' +
            ('0' + new Date(product.created_date).getMinutes()).slice(-2) +
            ':' +
            ('0' + new Date(product.created_date).getSeconds()).slice(-2)
          }}
        </td>
        <td>
          <button class="product__edit" @click="editing.edit(product)">Edit</button>
          <button class="product__delete" @click="deleteProduct(product.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import api, { type Product } from '@/api'
import { useRender } from '@/store/render'
import { useEditing } from '@/store/editing'

export default {
  data() {
    return {
      render: useRender(),
      editing: useEditing()
    }
  },
  props: {
    products: {
      type: Array as () => Product[],
      required: true
    }
  },
  methods: {
    async deleteProduct(id: number) {
      await api.deleteProduct(id).then(() => this.render.reRender())
    }
  }
}
</script>

<style src="../style/styles.css" scoped></style>

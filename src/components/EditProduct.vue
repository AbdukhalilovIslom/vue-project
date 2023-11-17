<template>
  <div v-if="editing" class="edit__popup">
    <div class="edit__inner">
      <img @click="editClose()" src="../assets/close.png" alt="" class="edit__close_icon" />
      <h2 class="edit__popup__title">Add product</h2>
      <form class="edit__popup__form" @submit.prevent="submitEditForm">
        <label>Name:</label>
        <input class="edit__popup__form__input" v-model="editingProduct.name_uz" required />
        <br />
        <label>Address:</label>
        <input class="edit__popup__form__input" v-model="editingProduct.address" required />
        <br />
        <label>Cost:</label>
        <input
          class="edit__popup__form__input"
          v-model="editingProduct.cost"
          required
          type="number"
        />
        <br />
        <button class="edit__popup__form__btn" type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import api, { type Product } from '../api'

export default {
  data() {
    return {
      editingProduct: { ...this.editing } as Product
    }
  },
  props: {
    handleRender: {
      type: Function,
      required: true
    },
    editClose: {
      type: Function,
      required: true
    },
    editing: {
      type: Object,
      required: false
    }
  },
  methods: {
    async submitEditForm() {
      if (this.editing) {
        await api.updateProduct(this.editingProduct).then(() => {
          this.editClose()
          this.handleRender()
        })
      }
    }
  },
  mounted() {
    console.log(this.editing)
  }
}
</script>

<style src="../style/styles.css" scoped></style>

<template>
  <div v-if="editing.editing" class="edit__popup">
    <div class="edit__inner">
      <img
        @click="editing.hanleClose()"
        src="../assets/close.png"
        alt=""
        class="edit__close_icon"
      />
      <h2 class="edit__popup__title">Add product</h2>
      <form class="edit__popup__form" @submit.prevent="submitEditForm">
        <label>Name:</label>
        <input class="edit__popup__form__input" v-model="editing.editing.name_uz" required />
        <br />
        <label>Address:</label>
        <input class="edit__popup__form__input" v-model="editing.editing.address" required />
        <br />
        <label>Cost:</label>
        <input
          class="edit__popup__form__input"
          v-model="editing.editing.cost"
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
import { useEditing } from '@/store/editing'
import api, { type Product } from '../api'
import { useRender } from '../store/render'

export default {
  data() {
    return {
      render: useRender(),
      editing: useEditing()
    }
  },
  methods: {
    async submitEditForm() {
      if (this.editing.editing) {
        await api.updateProduct(this.editing.editing).then(() => {
          this.editing.hanleClose()
          this.render.reRender()
        })
      }
    }
  }
}
</script>

<style src="../style/styles.css" scoped></style>

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/api'

export const useEditing = defineStore('editing', () => {
  const editing = ref()

  function hanleClose() {
    editing.value = undefined
  }

  function edit(product: Product) {
    editing.value = { ...product }
  }

  return { editing, hanleClose, edit }
})

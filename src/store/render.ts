import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRender = defineStore('render', () => {
  const render = ref(0)
  function reRender() {
    render.value = Math.random()
  }

  return { render, reRender }
})

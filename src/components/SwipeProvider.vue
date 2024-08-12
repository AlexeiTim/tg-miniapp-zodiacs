<template>
  <div class="screen" @touchstart="startTouch" @touchend="endTouch">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  (e: 'right-swipe'): void
}>()

const isMobile = ref(window.innerWidth <= 768)
const startX = ref(0)
const endX = ref(0)
const threshold = 75

function startTouch(event: TouchEvent) {
  startX.value = event.touches[0].clientX
}

function endTouch(event: TouchEvent) {
  endX.value = event.changedTouches[0].clientX

  if (endX.value - startX.value > threshold && isMobile.value) {
    emits('right-swipe')
  }
}
</script>

<style scoped>
.screen {
  min-height: 90vh;
}
</style>

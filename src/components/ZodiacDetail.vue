<template>
  <div class="content">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="horocope" class="horoscope-content">
      <BackButton @click="$emit('go-back')" text="Назад" class="back-button" />
      <div class="horoscope-text">{{ horocope.horoscope }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HoroscopeResponseDetail } from '@/types/horoscope'
import { BackButton } from 'vue-tg'

defineProps<{
  error: null | any
  horocope: HoroscopeResponseDetail | null
}>()

defineEmits<{
  (e: 'go-back'): void
}>()
</script>

<style scoped>
.content {
  margin-top: 20px;
  width: 100%;
  max-width: 900px;
}

.error {
  font-size: 16px;
  color: red;
}

.horoscope-content {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back-button {
  margin-bottom: 10px;
}

.horoscope-text {
  font-size: 16px;
  line-height: 1.5;
}
</style>

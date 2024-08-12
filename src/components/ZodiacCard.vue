<script setup lang="ts">
import ZodiacIcon from './ZodiacIcon.vue'

defineProps<{
  zodiac: {
    name: string
    dateRange: string
    value: string
  }
}>()
</script>

<template>
  <div class="card">
    <div class="content">
      <h3 class="name">{{ zodiac.name }}</h3>
      <p class="date-range">{{ zodiac.dateRange }}</p>
      <div class="icon-wrapper">
        <ZodiacIcon :sign="zodiac.value" class="icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: 100%;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  max-width: 300px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  flex-shrink: 0;
}

.content {
  flex: 1;
  padding: 4px;
  gap: 5px;
}

.name {
  font-size: 16px;
  font-weight: 600;
}

.date-range {
  font-size: 14px;
  color: #666;
}
</style>

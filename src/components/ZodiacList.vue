<template>
  <div class="grid-list">
    <ZodiacCard
      v-for="zodiac in zodiacs"
      :key="zodiac.value"
      :zodiac="zodiac"
      @click="emits('select-zodiac', zodiac)"
      class="zodiac-card"
    />
  </div>
</template>

<script setup lang="ts">
import type { Zodiac } from '@/App.vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ZodiacCard from './ZodiacCard.vue'
import type { HoroscopeSign } from '@/types/horoscope'

const emits = defineEmits<{
  (e: 'select-zodiac', zodiac: Zodiac): void
}>()

const { t, locale } = useI18n()

const zodiacKeys: HoroscopeSign[] = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces'
]

const zodiacs = ref<Zodiac[]>([])

function updateZodiacs() {
  zodiacs.value = zodiacKeys.map((key) => ({
    name: t(`zodiaks.${key}.name`),
    dateRange: t(`zodiaks.${key}.dateRange`),
    value: key
  }))
}

watch(locale, updateZodiacs, { immediate: true })
</script>

<style scoped>
.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.zodiac-card {
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.zodiac-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>

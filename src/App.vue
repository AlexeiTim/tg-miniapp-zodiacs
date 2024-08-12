<template>
  <BaseContainer>
    <SwipeProvider @right-swipe="goBack">
      <MainButton color="rgba(0, 0, 0, 0.3)" :text="t('switchLang')" @click="toggleLang" />
      <ZodiacList v-if="!horoscopeName" @select-zodiac="handleSelectZodica" />
      <ZodiacDetail v-else @go-back="goBack" :error="error" :horocope="horocope" />
      <BaseLoader :is-visible="isLoading" />
    </SwipeProvider>
  </BaseContainer>
</template>

<script setup lang="ts">
import { useWebApp, MainButton } from 'vue-tg'
import { useHoroscope } from './composables/useHoroscope'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { HoroscopeRequestData, HoroscopeSign } from './types/horoscope'
import BaseLoader from './components/BaseLoader.vue'
import ZodiacDetail from './components/ZodiacDetail.vue'
import ZodiacList from './components/ZodiacList.vue'
import SwipeProvider from './components/SwipeProvider.vue'
import BaseContainer from './components/BaseContainer.vue'

export interface Zodiac {
  name: string
  dateRange: string
  value: HoroscopeSign
}

const { horocope, isLoading, error, getHoroscope, unsetHoroscope } = useHoroscope()
const { t, locale } = useI18n()
const { initDataUnsafe } = useWebApp()

const lang = ref(initDataUnsafe.user?.language_code === 'ru' ? 'ru' : 'en')
const horoscopeName = ref<HoroscopeSign | null>(null)

function handleSelectZodica(zodiac: Zodiac) {
  horoscopeName.value = zodiac.value
  getHoroscope({
    sign: zodiac.value,
    language: lang.value === 'ru' ? 'original' : 'translated'
  })
}

function toggleLang() {
  locale.value = locale.value === 'ru' ? 'en' : 'ru'
  lang.value = lang.value === 'ru' ? 'en' : 'ru'
  if (!horoscopeName.value) return

  const data: HoroscopeRequestData = {
    sign: horoscopeName.value,
    language: lang.value === 'ru' ? 'original' : 'translated'
  }
  getHoroscope(data)
}

function goBack() {
  horoscopeName.value = null
  unsetHoroscope()
}
</script>

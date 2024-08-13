<template>
  <BaseContainer>
    <SwipeProvider @right-swipe="goBack">
      <MainButton :text="t('switchLang')" @click="toggleLang" />
      <ZodiacList v-if="!zodiac" @select-zodiac="handleSelectZodica" />
      <ZodiacDetail v-else @go-back="goBack" :text="zodiac.text" :error="error" />
      <BaseLoader :is-visible="isLoading" />
    </SwipeProvider>
  </BaseContainer>
</template>

<script setup lang="ts">
import { useWebApp, MainButton } from 'vue-tg'
import { useHoroscope } from './composables/useHoroscope'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { HoroscopeSign } from './types/horoscope'
import BaseLoader from './components/BaseLoader.vue'
import ZodiacDetail from './components/ZodiacDetail.vue'
import ZodiacList from './components/ZodiacList.vue'
import SwipeProvider from './components/SwipeProvider.vue'
import BaseContainer from './components/BaseContainer.vue'
import type { Language } from './types/languages'

export interface Zodiac {
  name: string
  dateRange: string
  value: HoroscopeSign
}

const { t, locale } = useI18n()
const { initDataUnsafe } = useWebApp()

const horoscopeName = ref<HoroscopeSign | null>(null)
const lang = ref<Language>(initDataUnsafe.user?.language_code === 'ru' ? 'ru' : 'en')
const { zodiac, isLoading, error, unsetZodiac, setZodiac } = useHoroscope(lang)

function handleSelectZodica(zodiac: Zodiac) {
  horoscopeName.value = zodiac.value
  setZodiac({ sign: zodiac.value })
}

function toggleLang() {
  const newLang: Language = locale.value === 'ru' ? 'en' : 'ru'
  locale.value = newLang
  lang.value = newLang
  if (!zodiac.value) return
  setZodiac({ sign: zodiac.value.sign })
}

function goBack() {
  horoscopeName.value = null
  unsetZodiac()
}
</script>

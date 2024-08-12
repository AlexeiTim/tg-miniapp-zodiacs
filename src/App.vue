<script setup lang="ts">
import { useWebApp, MainButton, Alert, useWebAppNavigation, BackButton } from 'vue-tg'
import { useHoroscope } from './composables/useHoroscope'
import { onMounted, onUnmounted, ref } from 'vue'
import type { HoroscopeSign } from './types/horoscope'

const { horocope, isLoading, error, getHoroscope, unsetHoroscope } = useHoroscope()
const { initDataUnsafe, initData } = useWebApp()
const data = useWebAppNavigation()
const zodiacs = ref<{ name: HoroscopeSign; dateRange: string }[]>([
  { name: 'aries', dateRange: 'March 21 - April 19' }, // Овен
  { name: 'taurus', dateRange: 'April 20 - May 20' }, // Телец
  { name: 'gemini', dateRange: 'May 21 - June 20' }, // Близнецы
  { name: 'cancer', dateRange: 'June 21 - July 22' }, // Рак
  { name: 'leo', dateRange: 'July 23 - August 22' }, // Лев
  { name: 'virgo', dateRange: 'August 23 - September 22' }, // Дева
  { name: 'libra', dateRange: 'September 23 - October 22' }, // Весы
  { name: 'scorpio', dateRange: 'October 23 - November 21' }, // Скорпион
  { name: 'sagittarius', dateRange: 'November 22 - December 21' }, // Стрелец
  { name: 'capricorn', dateRange: 'December 22 - January 19' }, // Козерог
  { name: 'aquarius', dateRange: 'January 20 - February 18' }, // Водолей
  { name: 'pisces', dateRange: 'February 19 - March 20' } // Рыбы
])

const lang = ref(initDataUnsafe.language_code === 'ru' ? 'ru' : 'en')

function testHandle() {
  getHoroscope({
    sign: 'aries',
    language: 'original'
  })
}

// Reactivity for user info
const userInfo = ref(null)
</script>

<template>
  <div>
    {{ initDataUnsafe }}
    <template v-if="!horocope">
      <MainButton color="rgba(0, 0, 0, 0.3)" text="Get User Info" @click="getUserInfo" />
      <button
        v-for="zodiac in zodiacs"
        :key="zodiac.name"
        @click="
          getHoroscope({
            sign: zodiac.name,
            language: 'original'
          })
        "
      >
        {{ zodiac.name }}
        {{ zodiac.dateRange }}
      </button>
    </template>
    <div>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-if="horocope">
        <BackButton @click="unsetHoroscope">Назад</BackButton>
        <div>Horoscope: {{ horocope.horoscope }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

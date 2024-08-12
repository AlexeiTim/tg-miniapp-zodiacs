import { HoroscopeSerivce } from '@/services/api/horoscope'
import type { HoroscopeRequestData, HoroscopeResponseDetail } from '@/types/horoscope'
import { ref } from 'vue'

export function useHoroscope() {
  const isLoading = ref(false)
  const error = ref<any>(null)
  const horocope = ref<HoroscopeResponseDetail | null>(null)

  function setHoroscope(horoscopeData: HoroscopeResponseDetail) {
    horocope.value = horoscopeData
  }

  function unsetHoroscope() {
    horocope.value = null
  }

  async function getHoroscope(data: HoroscopeRequestData) {
    isLoading.value = true
    error.value = null

    try {
      const response = await HoroscopeSerivce.getHoroscope(data)
      return (horocope.value = response.data)
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  return {
    getHoroscope,
    setHoroscope,
    unsetHoroscope,
    horocope,
    isLoading,
    error
  }
}

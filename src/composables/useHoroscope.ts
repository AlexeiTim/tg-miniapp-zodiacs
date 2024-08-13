import { HoroscopeSerivce } from '@/services/api/horoscope'
import type {
  HoroscopeLanguage,
  HoroscopeRequestData,
  HoroscopeResponseDetail,
  HoroscopeSign
} from '@/types/horoscope'
import { onMounted, ref, type Ref } from 'vue'

export function useHoroscope(lang: Ref<'ru' | 'en'>) {
  const isLoading = ref(false)
  const error = ref<any>(null)
  const horocope = ref<HoroscopeResponseDetail | null>(null)
  const horocopes = ref({
    ru: {},
    en: {}
  })
  const zodiacInfo = ref('')

  async function getAllHoroscopes() {
    isLoading.value = true
    error.value = null

    try {
      const horoscopesRuResponse = await HoroscopeSerivce.getHoroscope({
        language: 'original'
      })
      const horoscopesEnResponse = await HoroscopeSerivce.getHoroscope({
        language: 'translated'
      })
      horocopes.value.ru = horoscopesRuResponse.data
      horocopes.value.en = horoscopesEnResponse.data
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  function setHoroscope(horoscopeData: HoroscopeResponseDetail) {
    horocope.value = horoscopeData
  }

  function set1Horoscope({ sign, lang }: { sign: HoroscopeSign; lang: 'ru' | 'en' }) {
    const horoscopesLocal = horocopes.value[lang]
    zodiacInfo.value = horoscopesLocal.horoscopes[sign]
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

  onMounted(() => {
    getAllHoroscopes()
  })

  return {
    getHoroscope,
    setHoroscope,
    unsetHoroscope,
    set1Horoscope,
    zodiacInfo,
    horocope,
    isLoading,
    error
  }
}

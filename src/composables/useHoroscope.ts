import { HoroscopeSerivce } from '@/services/api/horoscope'
import type { HoroscopeResponseList, HoroscopeSign } from '@/types/horoscope'
import type { Language } from '@/types/languages'
import { onMounted, ref, type Ref } from 'vue'

export function useHoroscope(lang: Ref<'ru' | 'en'>) {
  const isLoading = ref(false)
  const error = ref<any>(null)
  const horocopes = ref<Record<Language, HoroscopeResponseList>>({
    ru: {
      horoscopes: {},
      language: 'translated'
    },
    en: {
      horoscopes: {},
      language: 'translated'
    }
  })
  const zodiac = ref<{ sign: HoroscopeSign; text: string } | null>(null)

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

  function unsetZodiac() {
    zodiac.value = null
  }

  function setZodiac({ sign }: { sign: HoroscopeSign }) {
    const zodiacText = horocopes.value[lang.value].horoscopes[sign]
    zodiac.value = {
      sign,
      text: zodiacText
    }
  }

  onMounted(() => {
    getAllHoroscopes()
  })

  return {
    setZodiac,
    unsetZodiac,
    zodiac,
    isLoading,
    error
  }
}

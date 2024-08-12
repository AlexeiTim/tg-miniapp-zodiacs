export interface HoroscopeRequestData {
  sign: HoroscopeSign
  language: HoroscopeLanguage
}

export type HoroscopeSign =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces'

export type HoroscopeLanguage = 'original' | 'translated'

export interface HoroscopeResponseDetail {
  language: HoroscopeLanguage
  horoscope: {
    aries: string
    taurus: string
    gemini: string
    cancer: string
    leo: string
    virgo: string
    libra: string
    scorpio: string
    sagittarius: string
    capricorn: string
    aquarius: string
    pisces: string
  }
}

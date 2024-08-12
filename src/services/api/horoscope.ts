import type { HoroscopeRequestData, HoroscopeResponseDetail } from '@/types/horoscope'
import axios, { type AxiosResponse } from 'axios'

export const HoroscopeSerivce = {
  getHoroscope(data: HoroscopeRequestData): Promise<AxiosResponse<HoroscopeResponseDetail>> {
    return axios({
      url: 'https://poker247tech.ru/get_horoscope/',
      method: 'POST',
      data
    })
  }
}

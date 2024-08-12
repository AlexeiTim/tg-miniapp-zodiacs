import './assets/main.css'

import { createApp } from 'vue'
import { VueTelegramPlugin } from 'vue-tg'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import messages from './i18n'

const i18n = createI18n({
  locale: 'ru', // Установите язык по умолчанию
  fallbackLocale: 'en', // Язык по умолчанию, если перевод отсутствует
  messages,
  legacy: false
})
const app = createApp(App)
app.use(i18n)
app.use(VueTelegramPlugin)
app.mount('#app')

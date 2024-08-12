import './assets/main.css'

import { createApp } from 'vue'
import { VueTelegramPlugin } from 'vue-tg'
import App from './App.vue'

const app = createApp(App)
app.use(VueTelegramPlugin)
app.mount('#app')

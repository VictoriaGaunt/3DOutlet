import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../style.css'
import { MotionPlugin } from '@vueuse/motion'
import { useActiveButton } from '@/stores/activeButton'

const app = createApp(App)

app.use(router)
app.use(MotionPlugin)
app.provide('activeButton', useActiveButton())

app.mount('#app')
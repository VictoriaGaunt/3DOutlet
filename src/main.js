import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { MotionPlugin } from '@vueuse/motion'
import { useActiveButton } from './stores/activeButton'

const app = createApp(App)
app.use(MotionPlugin)
app.provide('activeButton', useActiveButton())
app.mount('#app')
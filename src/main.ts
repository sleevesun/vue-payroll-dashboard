import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
// import Antd from 'ant-design-vue' // Removed for auto-import
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
// app.use(Antd) // Removed for auto-import
app.mount('#app')

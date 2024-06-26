import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/tailwind.css';
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

createApp(App).use(ElementPlus).mount('#app')

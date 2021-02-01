import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import httpPlugin from '@/plugins/http'
import '@/assets/styles/fonts.css'

// initProject(config as any)

// document.querySelector('.make-image').addEventListener('click', () => {
//   makeImage(window.layer)
// })


const app = createApp(App)

app.use(httpPlugin)

app
  .use(store, key)
  .use(router)
  .mount('#app')

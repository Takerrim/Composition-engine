import { Plugin } from 'vue'
import api from '@/api'

const httpPlugin: Plugin = {
  install(app) {
    app.config.globalProperties.$http = api
  }
}

export default httpPlugin

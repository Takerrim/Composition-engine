import { ComponentCustomProperties } from 'vue'
import http from '@/api'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $http: typeof http
  }
}

import ky from 'ky'

const api = ky.extend({
  prefixUrl: 'http://localhost:3000/api/v1/'
})

export default api

import { boot } from 'quasar/wrappers'
import httpClient from '../app/httpClient'

export default boot(({ app }) => {
  app.config.globalProperties.$axios = httpClient
})

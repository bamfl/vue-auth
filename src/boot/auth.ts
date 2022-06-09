import { boot } from 'quasar/wrappers'
import httpClient from '../app/httpClient'
import { IUserData } from 'src/types/types'

import { createAuth } from '@websanova/vue-auth'
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js'
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js'
import driverAuthBearer from './auth/drivers/driverAuthBearer';

export default boot(({ app, router }) => {
  const baseUrl = `${process.env.API_BASE_URL}`

  const auth = createAuth({
    plugins: {
      http: httpClient,
      router
    },
    drivers: {
      http: driverHttpAxios,
      auth: driverAuthBearer,
      router: driverRouterVueRouter
    },
    options: {
      registerData: {
        url: `${baseUrl}/register`,
        redirect: '/home',
        autoLogin: true
      },
      loginData: {
        url: `${baseUrl}/login`,
        method: 'POST',
        redirect: false,
        fetchUser: true,
        staySignedIn: true
      },
      logoutData: {
        url: `${baseUrl}/logout`,
        makeRequest: true,
        redirect: '/login'
      },
      authRedirect: '/login',
      fetchData: {
        url: `${baseUrl}/auth/me`,
        method: 'POST',
        enabled: true
      },
      refreshData: {
        url: `${baseUrl}/auth/refresh_token`,
        method: 'POST',
        interval: 30 /* Авто-рефреш каждые 30 минут, в 2 раза чаще чем жизнь токена */
      },
      parseIUserData: (data: IUserData) => {
        const user = data

        return user || {}
      }
    }
  })

  app.use(auth)
})

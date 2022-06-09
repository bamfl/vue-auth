import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // Авторизованный пользователь
  {
    path: '/',
    name: 'home',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/logout',
    name: 'logout',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/LogoutUser.vue') }
    ]
  },

  // Неавторизованный пользователь
  {
    path: '/login',
    name: 'login',
    meta: { auth: false },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/LoginUser.vue') }
    ]
  },
  {
    path: '/register',
    name: 'register',
    meta: { auth: false },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/RegisterUser.vue') }
    ]
  },

  // Route not found
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

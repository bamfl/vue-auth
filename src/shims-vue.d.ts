/* eslint-disable */

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js'
declare module '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js'
declare module '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js'
declare module '@websanova/vue-auth/src/v3.js'

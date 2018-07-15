import { createApp } from './app'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  console.log('deployed version 1.0.0')
  app.$mount('#app')
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    store.commit('RESOLVING_ROUTE', true)
  }
  next()
})

router.afterEach((to, from) => {
  store.commit('RESOLVING_ROUTE', false)
})

import EventBus from '@/event-bus.js';
import { createApp } from './app'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})

router.afterEach((to, from) => {
  if (to.name == 'ActiveStop') {
    if (!store.getters.stop(to.params.id).location) {
      store.dispatch('RETRIEVE_STOP', to.params.id).then(() => {
        EventBus.$emit('GO_TO_STOP', to.params.id)
      })
    } else  {
      store.dispatch('RETRIEVE_STOP', to.params.id)
      EventBus.$emit('GO_TO_STOP', to.params.id)
    }
  }


  if (to.name == 'ActiveRoute') {
    if (!store.getters.route(to.params.id).segments) {
      store.dispatch('RETRIEVE_ROUTE', to.params.id).then(() => {
        EventBus.$emit('GO_TO_ROUTE', to.params.id)
      })
    } else {
      store.dispatch('RETRIEVE_ROUTE', to.params.id)
      EventBus.$emit('GO_TO_ROUTE', to.params.id)
    }

  }
})

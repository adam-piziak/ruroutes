import store from '@/store'
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)
    context.meta = app.$meta()
    router.onReady(() => {
      context.rendered = () => {
        context.state = store.state
      }
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      store.commit('SET_MOBILE', context.mobile)

      context.rendered = () => {
        context.state = store.state
      }
      resolve(app)
    }, reject)
  })
}

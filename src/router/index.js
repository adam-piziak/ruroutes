import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

const RoutesPage = () => import('@/pages/RoutesPage.vue')
const StopsPage = () => import('@/pages/StopsPage.vue')
const DirectionsPage = () => import('@/pages/DirectionsPage.vue')
const SchedulePage = () => import('@/pages/SchedulePage.vue')

const ActiveStop = () => import('items/ActiveStop')

Vue.use(Router)
Vue.use(Meta)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'routes',
        component: RoutesPage
      },
      {
        path: '/stops',
        name: 'stops',
        component: StopsPage,
        children: [
          {
            path: ':id',
            name: 'ActiveStop',
            component: ActiveStop
          }
        ]
      },
      {
        path: '/directions',
        name: 'directions',
        component: DirectionsPage
      },
      {
        path: '/schedule',
        name: 'schedule',
        component: SchedulePage
      },
    ]
  })
}

import Vue from 'vue'
import { createStore } from '@/store'
import Router from 'vue-router'
import Meta from 'vue-meta'

const RoutesPage = () => import('@/pages/RoutesPage.vue')
const StopsPage = () => import('@/pages/StopsPage.vue')
const DirectionsPage = () => import('@/pages/DirectionsPage.vue')
const SchedulePage = () => import('@/pages/SchedulePage.vue')

Vue.use(Router)
Vue.use(Meta)

export function createRouter() {
   const router =  new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/routes'
      },
      {
        path: '/routes',
        name: 'routes',
        component: RoutesPage,
        children: [
          {
            path: ':id',
            name: 'ActiveRoute'
          }
        ]
      },
      {
        path: '/stops',
        name: 'stops',
        component: StopsPage,
        children: [
          {
            path: ':id',
            name: 'ActiveStop'
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

  return router
}

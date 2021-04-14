import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/layout'
/* Router Modules */
import nestedRouter from './modules/nested'
import errorRouter from './modules/error-page'
import tableRouter from './modules/table'
import chartRouter from './modules/chart'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ '@/components/Redirect/index'
          ),
      },
    ],
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },

  tableRouter,
  chartRouter,

  {
    path: '/form',
    component: Layout,
    name: 'Form',
    redirect: '/form/index',
    meta: {
      title: 'Form',
      icon: 'form',
    },
    children: [
      {
        path: 'index',
        name: 'BasicForm',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/views/form/index'),
        meta: { title: 'Basic Form' },
      },
      {
        path: 'advanced-form',
        name: 'AdvancedForm',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/views/form/advanced-form'),
        meta: { title: 'Advanced Form' },
      },
    ],
  },

  nestedRouter,
  errorRouter,

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "icon" */ '@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true },
      },
    ],
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/HaitaoWang555/vue3-admin-pro',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index'),
    hidden: true,
  },
  { path: '/:pathMatch(.*)*', redirect: '/error/404', hidden: true },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const history = createWebHashHistory()
const router = createRouter({
  history,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: constantRoutes,
})

export default router

export function resetRouter() {
  const newRouter = createRouter({
    history,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    },
    routes: constantRoutes,
  })
  router.matcher = newRouter.matcher // reset router
}

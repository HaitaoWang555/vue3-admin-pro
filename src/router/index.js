import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/layout'

const constantRoutes = [
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

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () =>
          import(/* webpackChunkName: "example" */ '@/views/table/index'),
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () =>
          import(/* webpackChunkName: "example" */ '@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/views/form/index'),
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
    },
    children: [
      {
        path: 'menu1',
        component: () =>
          import(/* webpackChunkName: "nested" */ '@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () =>
              import(
                /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-1'
              ),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
          },
          {
            path: 'menu1-2',
            component: () =>
              import(
                /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-2'
              ),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import(
                    /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-2/menu1-2-1'
                  ),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import(
                    /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-2/menu1-2-2'
                  ),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () =>
              import(
                /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-3'
              ),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' },
          },
        ],
      },
      {
        path: 'menu2',
        component: () =>
          import(/* webpackChunkName: "nested" */ '@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' },
      },
    ],
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/HaitaoWang555/vue3-admin-template',
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
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  { path: '/*', redirect: '/404', hidden: true },
]

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: constantRoutes,
})

export default router

export function resetRouter() {
  const newRouter = createRouter({
    history,
    routes: constantRoutes,
  })
  router.matcher = newRouter.matcher // reset router
}

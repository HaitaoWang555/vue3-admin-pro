/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'componentsPages',
  meta: {
    title: 'Components',
    icon: 'el-icon-files',
  },
  children: [
    {
      path: 'pro-dialog',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/pro-dialog-view.vue'
        ),
      name: 'pro-dialog',
      meta: { title: 'pro-dialog', noCache: true },
    },
    {
      path: 'tailwindcss',
      name: 'Tailwindcss',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/tailwindcss/index'
        ),
      meta: { title: 'Tailwindcss' },
    },
  ],
}

export default componentsRouter

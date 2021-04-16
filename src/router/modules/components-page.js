/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'componentsPages',
  meta: {
    title: 'Components Pages',
    icon: 'el-icon-files',
  },
  children: [
    {
      path: 'pro-dialog',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/pro-dialog-view'
        ),
      name: 'pro-dialog',
      meta: { title: 'pro-dialog', icon: 'el-icon-files', noCache: true },
    },
  ],
}

export default componentsRouter

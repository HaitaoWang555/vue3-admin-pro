/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const errorRouter = {
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  meta: {
    title: 'Error Pages',
    icon: '404',
  },
  children: [
    {
      path: '401',
      component: () =>
        import(/* webpackChunkName: "error" */ '@/views/error-page/401'),
      name: 'Page401',
      meta: { title: '401', noCache: true },
    },
    {
      path: '404',
      component: () =>
        import(/* webpackChunkName: "error" */ '@/views/error-page/404'),
      name: 'Page404',
      meta: { title: '404', noCache: true },
    },
  ],
}

export default errorRouter

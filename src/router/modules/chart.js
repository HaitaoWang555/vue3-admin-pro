/** When your routing charts is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: '/charts/complex-charts',
  name: 'charts',
  meta: {
    title: 'charts',
    icon: 'chart',
  },
  children: [
    {
      path: 'line-charts',
      component: () =>
        import(/* webpackChunkName: "charts" */ '@/views/charts/Line.vue'),
      name: 'LineCharts',
      meta: { title: 'line' },
    },
    {
      path: 'bar-charts',
      component: () =>
        import(/* webpackChunkName: "charts" */ '@/views/charts/Bar.vue'),
      name: 'BarCharts',
      meta: { title: 'bar' },
    },
    {
      path: 'pie-charts',
      component: () =>
        import(/* webpackChunkName: "charts" */ '@/views/charts/Pie.vue'),
      name: 'PieCharts',
      meta: { title: 'pie' },
    },
    {
      path: 'map-charts',
      component: () =>
        import(/* webpackChunkName: "charts" */ '@/views/charts/Map.vue'),
      name: 'MapCharts',
      meta: { title: 'map' },
    },
  ],
}
export default chartsRouter

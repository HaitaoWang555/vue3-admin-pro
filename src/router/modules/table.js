/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table',
  },
  children: [
    {
      path: 'inline-edit-table',
      component: () =>
        import(
          /* webpackChunkName: "table" */ '@/views/table/inline-edit-table.vue'
        ),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' },
    },
    {
      path: 'complex-table',
      component: () =>
        import(
          /* webpackChunkName: "table" */ '@/views/table/complex-table.vue'
        ),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' },
    },
  ],
}
export default tableRouter

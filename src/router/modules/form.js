/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout/index.vue'

const formRouter = {
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
        import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
      meta: { title: 'Basic Form' },
    },
    {
      path: 'advanced-form',
      name: 'AdvancedForm',
      component: () =>
        import(/* webpackChunkName: "form" */ '@/views/form/advanced-form.vue'),
      meta: { title: 'Advanced Form' },
    },
    {
      path: 'modal-form',
      name: 'ModalForm',
      component: () =>
        import(/* webpackChunkName: "form" */ '@/views/form/modal-form.vue'),
      meta: { title: 'Modal Form' },
    },
    {
      path: 'linkage-form',
      name: 'LinkageForm',
      component: () =>
        import(/* webpackChunkName: "form" */ '@/views/form/linkage-form.vue'),
      meta: { title: 'Linkage Form' },
    },
    {
      path: 'step-form',
      name: 'StepForm',
      component: () =>
        import(/* webpackChunkName: "form" */ '@/views/form/step-form.vue'),
      meta: { title: 'Step Form' },
    },
  ],
}

export default formRouter

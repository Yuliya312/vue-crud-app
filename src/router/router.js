import Vue from 'vue'
import Router from 'vue-router'

import vMainPage from '../components/v-main-page'
import vUserForm from '../components/v-user-form'


Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: vMainPage,
    },
    {
      path: '/user/:id?',
      name: 'vUserForm',
      props: true,
      component: vUserForm,
      // component: () => import('../components/v-user-form')
    },
  ],
  mode: 'history',
})

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router;

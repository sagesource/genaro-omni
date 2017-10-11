import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login-view',
      component: require('@/templates/LoginView').default
    },
    {
      path: '/index',
      name: 'index-view',
      component: require('@/templates/IndexView').default,
      children: [{
          path: '',
          component: require('@/templates/LoginView').default
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

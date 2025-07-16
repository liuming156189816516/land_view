import Vue from 'vue'
import Router from 'vue-router'
import circle from '@/pages/home/circle'
import index from '@/pages/home/index'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/circle',
      name: 'circle',
      component: circle
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})

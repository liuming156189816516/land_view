import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import square from '@/pages/home/square'
import circle from '@/pages/home/circle'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'circle',
      component: circle
    },

    {
      path: '/square',
      name: 'square',
      component: square
    },
    {
      path: '/circle',
      name: 'circle',
      component: circle
    }
  ]
})

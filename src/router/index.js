import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import heart from '@/pages/heart'
import about from '@/pages/aboutme'
import message from '@/pages/message'
import newstext from '@/pages/newstext'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/heart',
      name: 'heart',
      component: heart
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/newstext/:tid',
      name: 'newstext',
      component: newstext
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DesignOne from './views/DesignOne'
import DesignTwo from './views/DesignTwo'
import DesignThree from './views/DesignThree'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/design-one',
      name: 'DesignOne',
      component: DesignOne
    },
    {
      path: '/design-two',
      name: 'DesignTwo',
      component: DesignTwo
    },
    {
      path: '/design-three',
      name: 'DesignThree',
      component: DesignThree
    }
  ]
})

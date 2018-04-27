/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '../components/Home/Home'
import LandComponent from '../components/Home/Land'
import menuModule from 'vuex-store/modules/menu'
import LoginComponent from '../components/auth/login/Login'
import addLandComponent from '../components/agent/addLand'
import addUserComponent from '../components/agent/addUser'
import listLands from '../components/agent/listLands'
import listUser from '../components/agent/listUser'
import divideLand from '../components/agent/divideLand.vue'


Vue.use(Router)

const demoRoutes = []
if (process.env.NODE_ENV === 'development') {
  const VueComponentTree = require('vue-component-tree')

  demoRoutes.push(
    VueComponentTree.default(require.context('./..', true, /.demo.vue$/), '/demo')
  )
}

export default new Router(
  { mode: 'history',
    routes: [{
        path:'/',
        name:'home',
        component:HomeComponent},
      {
        path: '/agent/addUser',
        name: 'addLand',
        component: addUserComponent,
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') ==null || localStorage.getItem('connectedUserRole')!="admin"){
            next('/login')
          }
          else{
            next()

          }
        }
      },
      {
        path: '/agent/addLand',
        name: 'addUser',
        component: addLandComponent,
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') ==null || localStorage.getItem('connectedUserRole')!="admin"){
          next('/login')
          }
          else{
          next()

          }
        }
      },
      {
        path: '/agent/lands',
        name: 'listLands',
        component: listLands,
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') ==null || localStorage.getItem('connectedUserRole')!="Agent"){
            next('/login')
          }
          else{
            next()

          }
        }
  },
      {
        path: '/agent/users',
        name: 'listUser',
        component: listUser,
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') ==null || localStorage.getItem('connectedUserRole')!="Agent"){
            next('/login')
          }
          else{
            next()

          }
        }
      },
    {
      path:'/login',
      name:'login',
      component:LoginComponent
    },
    {
      path:"/land/:id",
      name:"land",
      component:LandComponent
    },
      {
        path:"/divideLand/:id",
        name:"divide",
        component:divideLand
      },
    {
      path: '*',
      redirect: { name: getDefaultRoute(menuModule.state.items).name }
    }

]})

function generateRoutesFromMenu(menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (item.children) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}

function getDefaultRoute(menu = []) {
  let defaultRoute

  menu.forEach((item) => {
    if (item.meta.default) {
      defaultRoute = item
    } else if (item.children) {
      let defaultChild = item.children.find((i) => i.meta.default)
      defaultRoute = defaultChild || defaultRoute
    }
  })

  return defaultRoute
}

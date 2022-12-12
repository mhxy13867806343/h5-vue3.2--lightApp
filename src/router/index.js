import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tabber from '../components/Tabber.vue'
const routes = [
  {
    path:'/',
    component:Tabber,
    redirect: '/home',
    children:[
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/hot',
        name: 'hot',
        component:  () => import(/* webpackChunkName: "about" */ '../views/Hot.vue')
      },
      {
        path: '/contacts',
        name: 'contacts',
        component:  () => import(/* webpackChunkName: "about" */ '../views/Contacts.vue')
      },
      {
        path: '/my',
        name: 'my',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/My.vue')
      }
    ]
  },
  {
    path: '/sendpublish',
    name: 'sendPublish',
    component : () => import(/* webpackChunkName: "about" */ '../views/sendPublish.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component : () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/zc',
    name: 'Reg',
    component : () => import(/* webpackChunkName: "about" */ '../views/Reg.vue')
  },
  {
    path: '/minformation',
    name: 'minformation',
    component : () => import(/* webpackChunkName: "about" */ '../views/MyInformation.vue')
  },
  {
    path: '/opinion',
    name: 'opinion',
    component : () => import(/* webpackChunkName: "about" */ '../views/Opinion.vue')
  },
  {
    path: '/versionNumber',
    name: 'versionNumber',
    component : () => import(/* webpackChunkName: "about" */ '../views/VersionNumber.vue')
  },
  {
    path: '/mlabel',
    name: 'mlabel',
    component : () => import(/* webpackChunkName: "about" */ '../views/MyLable.vue')
  },
  {

    path: '/mcenter',
    name: 'mcenter',
    component : () => import(/* webpackChunkName: "about" */ '../views/MyCenter.vue')
  },
  {

    path: '/mupwd',
    name: 'mupwd',
    component : () => import(/* webpackChunkName: "about" */ '../views/MyUpadPwd.vue')
  },
  {

    path: '/myCheckInRecords',
    name: 'myCheckInRecords',
    component : () => import(/* webpackChunkName: "about" */ '../views/MyCheckInRecords.vue')
  },
  {

    path: '/myiMore',
    name: 'myiMore',
    component : () => import(/* webpackChunkName: "about" */ '../views/MyInformatMore.vue')
  },
  {

    path: '/circleOfFriends',
    name: 'circleOfFriends',
    component : () => import(/* webpackChunkName: "about" */ '../views/CircleOfFriends.vue')
  },
  {

    path: '/circlesend',
    name: 'circlesend',
    component : () => import(/* webpackChunkName: "about" */ '../views/CircleOfFriendSend.vue')
  },
  {

    path: '/minrecording',
    name: 'minrecording',
    component : () => import(/* webpackChunkName: "about" */ '../views/Recording.vue')
  },
  {

    path: '/girlfriend',
    name: 'girlfriend',
    component : () => import(/* webpackChunkName: "about" */ '../views/Girlfriend.vue')
  },
  {

    path: '/addContacts',
    name: 'addContacts',
    component : () => import(/* webpackChunkName: "about" */ '../views/AddContacts.vue')
  },
  {

    path: '/logotype',
    name: 'logotype',
    component : () => import(/* webpackChunkName: "about" */ '../views/Logotype.vue')
  },
  {

    path: '/set',
    name: 'set',
    component : () => import(/* webpackChunkName: "about" */ '../views/MySet.vue')
  },
  {
    path: '/zcNum',
    name: 'zcNum',
    component : () => import(/* webpackChunkName: "about" */ '../views/SelectUdNum.vue')
  },
  {
    path: '/groupDetails',
    name: 'groupDetails',
    component : () => import(/* webpackChunkName: "about" */ '../views/GroupDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  const token=localStorage.getItem('token')
  if(to.path==='/home' ||to.path==='/hot'){
    next()
  }
  if(to.path==='/login'||to.path==='/opinion'||to.path==='/versionNumber'||to.path==='/zc'){
    if(!token) {
      next ()
      return
    }
    next ('/home')
  }
  if(!token){
    next('/login')
  }

  next()
})

export default router

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
    path: '/login',
    name: 'Login',
    component : () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/zc',
    name: 'Reg',
    component : () => import(/* webpackChunkName: "about" */ '../views/Reg.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  const token=localStorage.getItem('token')
  if(to.path==='/login'||to.path==='/zc'){
    next()
  }else{
    if(!token){
      next('/login')
    }else{
      next()
    }
  }
})

export default router

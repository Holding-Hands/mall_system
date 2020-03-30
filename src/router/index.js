import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/content/login/index.vue'
import Welcome from '../components/content/welcome/index.vue'
import Home from "../views/Home";
import Users from "../views/users/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome' , component: Welcome },
      { path: '/users' , component: Users }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from从哪个路径跳转过来
  // next() 放行 next('/login')强制跳转
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    next('/login')
  }
  return next()
});

export default router

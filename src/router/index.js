import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// Start with the login page if the user is not logged in(no token)
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // get token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Login from '../components/Login.vue'
import NavbarMasyarakat from '../components/layouts/NavbarMasyarakat.vue'
import Footer from '../components/layouts/Footer.vue'
import Home from '../components/Home.vue'
import InputPengaduan from '../components/InputPengaduan.vue'
import Detail from '../components/Detail.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: { default: Login, footer: Footer }
  },
  {
    path: '/',
    name: 'home',
    components: { default: Home, header: NavbarMasyarakat, footer: Footer },
    meta: {
      title: "Home",
    }
  },
  {
    path: '/input',
    name: 'inputpengaduan',
    components: { default: InputPengaduan, header: NavbarMasyarakat, footer: Footer },
    meta: {
      title: "InputPengaduan",
      requiresAuth: true
    }
  },
  {
    path: '/detail/:id_pengaduan',
    name: 'detail',
    components: {default: Detail},
    meta: {
      title: "Detail",
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router

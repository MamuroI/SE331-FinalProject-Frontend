import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import Layout from '@/views/patient/Layout.vue'
import Info from '@/views/patient/Info.vue'
import api from "@/services";
import GStore from '@/store'
import CommentList from '@/views/patient/CommentList'
import NetWorkError from '../views/NetworkError.vue';
import NotFound from '../views/NotFound.vue';
import Login from '@/views/LoginForm.vue'
import Register from '@/views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/patient',
    name: 'Layout',
    component: Layout,
    beforeEnter: () => {
      return api.getPatient(GStore.selectedPatient)
        .then((response) => {
          GStore.patientInfo = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              // <--- Return
              name: '404Resource',
              params: { resource: 'Patient Info page' }
            }
          } else {
            return { name: 'NetworkError' } // <--- Return
          }
        })
    },
    children: [
      {
        path: '',
        name: 'Info',
        component: Info
      },
      {
        path: '',
        name: 'CommentList',
        component: CommentList
      },
    ]
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkError
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router

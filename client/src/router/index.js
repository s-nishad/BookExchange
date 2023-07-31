import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import ExploreLayout from '../layouts/ExploreView.vue'
import LandingLayout from '../layouts/LandingView.vue'

import HomeView from '../views/Explore/HomeView.vue'
import ProfileView from '../views/Explore/ProfileView.vue'

import LoginView from '../views/Landing/LoginView.vue'
import RegisterView from '../views/Landing/RegisterView.vue'
import IndexView from '../views/Landing/IndexView.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: IndexView
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView
      },
    ],
    beforeEnter: (to, from, next) => {
      if (Cookies.get('token')) {
        window.location.href = '/explore'
      } else {
        next()
      }
    },
  },
  {
    path: '/explore',
    name: 'Explore',
    component: ExploreLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView

      }
    ],
    beforeEnter: (to, from, next) => {
      if (!Cookies.get('token')) {
        window.location.href = '/'
      } else {
        next()
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

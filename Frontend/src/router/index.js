import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginPage.vue'
import Home from '../views/HomePage.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component:Home
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "login",
      path: '/',
      component: () => import('../views/Login.vue'),
    },
    {
      name: "reg",
      path: '/reg',
      component: () => import('../views/Reg.vue'),
    },

    {
      name: "home",
      path: '/home',
      component: () => import('../views/Home.vue'),
    }

  ],
})

export default router

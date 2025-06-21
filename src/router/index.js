import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      name: "home",
      path: '/',
      component: () => import('../views/Home.vue'),
      children: [
        {
          name: "customer",
          path: 'customer',
          component: () => import('@/components/mange/Custom.vue'),
        },
        {
          name: "tony",
          path: "tony",
          component: () => import('@/components/mange/Tony.vue')
        },
        {
          name: "service",
          path: "service",
          component: () => import('@/components/mange/Service.vue')
        },
        {
          name: "booking",
          path: "booking",
          component: () => import('@/components/mange/Booking.vue')
        },
        {
          name: "lostfound",
          path: "lostfound",
          component: () => import('@/components/mange/LostFound.vue')
        },
        {
          name: "repair",
          path: "repair",
          component: () => import('@/components/mange/Repair.vue')
        }
      ]
    }

  ],
})

export default router

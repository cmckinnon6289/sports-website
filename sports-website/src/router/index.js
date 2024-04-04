import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/team/:id',
      name: 'team-view',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TeamView.vue')
    },
    {
      path: '/game/:id',
      name: 'game-view',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/school/:id',
      name: 'school-view',
      component: () => import('../views/SchoolView.vue')
    }
  ]
})

export default router

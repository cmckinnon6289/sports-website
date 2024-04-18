import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PermsService from '@/services/PermsService.js';
import store from '@/store';

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
      component: () => import('../views/TeamView.vue'),
      props: true
    },
    {
      path: '/game/:id',
      name: 'game-view',
      component: () => import('../views/GameView.vue'),
      props: true
    },
    {
      path: '/school/:id',
      name: 'school-view',
      component: () => import('../views/SchoolView.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin-view',
      component: () => import('../views/AdminView.vue'),
      beforeEnter(to, from, next) {
        const perms = PermsService.getUserPerms();
        if(store.getters.isLoggedIn && perms >= 1){
          console.log(perms);
          next()
        } else{
          console.log(`fail ${perms}`);
          next('/login')
        }
      }
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/ScheduleView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router

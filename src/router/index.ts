import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      name: 'main',
      component: MainView
   },
   {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ListView.vue')
   },
   {
      path: '/task/:id',
      name: 'task',
      component: () => import('@/views/TaskView.vue')
   }
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

export default router;
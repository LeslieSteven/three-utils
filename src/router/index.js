import { createRouter, createWebHistory } from 'vue-router';

export const pageRoutes = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: '404' }
  },
  {
    path: '/404',
    component: () => import('@/views/pages/404.vue'),
    name: '404',
    meta: { title: '404' }
  }
];

// 模块路由(基于主入口布局页面)
export const moduleRoutes = {
  path: '/',
  component: () => import('@/layouts/MainLayout.vue'),
  redirect: '/index',
  children: [
    {
      path: 'index',
      name: '首页',
      component: () => import('@/views/modules/demo/Index.vue')
    },
  ]
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...pageRoutes, moduleRoutes]
});

export default router;

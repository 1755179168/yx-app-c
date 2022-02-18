import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  redirect: '/category',
  component: () => import('@/views/Home/index.vue'),
  children: [{
    name: 'category',
    path: '/category',
    component: () => import('@/views/category/index.vue'),
    meta: {
      tabB: 1,
    },
  },
  {
    name: 'card',
    path: '/card',
    component: () => import('@/views/card/index.vue'),
    meta: {
      tabB: 2,
    },
  },
  ],
}, {
  name: 'search',
  path: '/search',
  component: () => import('@/views/category/search.vue'),
}, {
  name: 'searchDetail',
  path: '/searchDetail/:id',
  component: () => import('@/views/searchx.vue'),
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.afterEach((to) => {
  store.commit('setTab', to.meta.tabB);
});
export default router;

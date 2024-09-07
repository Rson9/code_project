import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import News from '../views/News.vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
  ]
})

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next()
})
router.afterEach((to, from, next) => {
  Nprogress.done();
})
export default router

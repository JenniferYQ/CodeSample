/**
 * 路由配置文件
 * 定义应用的路由规则
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FormPage from '../views/FormPage.vue'
import FormPage2 from '../views/FormPage2.vue'

// 定义路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/form',
    name: 'FormPage',
    component: FormPage
  },
  {
    path: '/form2',
    name: 'FormPage2',
    component: FormPage2
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
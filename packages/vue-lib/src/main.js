import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/**
 * 创建并挂载Vue应用
 * 集成路由功能
 */
createApp(App)
  .use(router)
  .mount('#app')
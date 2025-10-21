<template>
  <div class="container">
    <header>
      <h1>Vue 表单渲染器</h1>
      <nav>
        <router-link to="/">首页</router-link> | 
        <router-link to="/form">表单示例</router-link>
        <router-link to="/form2">表单示例2</router-link>
      </nav>
    </header>
    
    <main>
      <!-- 路由视图 -->
      <router-view />
    </main>
  </div>
</template>

<script>
/**
 * Vue应用主组件
 * 集成路由视图
 */
export default {
  name: 'App',
  methods:{
    debounce(fn, delay =500) {
      let timer;
      return function (...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, delay);
      }
    }
  }
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  margin-bottom: 30px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

nav {
  padding: 15px 0;
}

nav a {
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
  font-weight: 500;
}

nav a.router-link-active {
  color: #409eff;
  font-weight: bold;
}

main {
  margin-top: 20px;
}
</style>
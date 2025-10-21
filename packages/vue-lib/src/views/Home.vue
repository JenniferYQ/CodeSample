<template>
  <div class="home">
    <h1>Vue 表单渲染器示例</h1>
    <p>这是一个基于配置自动生成表单的渲染器组件</p>
    <div class="actions">
      <router-link to="/form" class="btn">查看表单示例</router-link>
    </div>
  </div>
</template>

<script>
/**
 * 首页组件
 */
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px 20px;
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.actions {
  margin-top: 30px;
}

.btn {
  display: inline-block;
  background-color: #409eff;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #66b1ff;
}
</style>
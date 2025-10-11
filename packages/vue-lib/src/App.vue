<template>
  <div class="container">
    <h1>Vue 库</h1>
    <p>这是Blog monorepo中的Vue库</p>
  </div>
</template>

<script>
/**
 * Vue应用主组件
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
  },
  // 网络错误，http错误，状态码错误； 添加token，请求拦截器；响应拦截器；response
  // 1 两数之和 给定整数数组和target 

/**
 * @param {number[]} nums 输入的整数数组
 * @param {number} target 目标和
 * @return {number[]} 返回两个数的下标
 */
twoSum(nums, target) {
  // 使用Map存储遍历过的数字及其下标
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    // 计算当前数字需要配对的另一个数字
    const complement = target - nums[i];
    
    // 如果Map中存在这个配对数字，说明找到了答案
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    // 将当前数字及其下标存入Map
    map.set(nums[i], i);
  }
  
  // 如果没有找到答案，返回空数组
  return [];
}
  // 2 
  //  
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
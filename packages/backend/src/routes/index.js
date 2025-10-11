/**
 * API路由主文件
 * 集中管理所有API路由
 */
const express = require('express');
const router = express.Router();

// 导入各个模块的路由
const postsRoutes = require('./posts');

// 注册路由
router.use('/posts', postsRoutes);

// API状态检查
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date()
  });
});

module.exports = router;
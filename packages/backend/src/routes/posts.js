/**
 * 文章相关路由
 * 处理博客文章的CRUD操作
 */
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// 获取所有文章
router.get('/', postsController.getAllPosts);

// 获取单个文章
router.get('/:id', postsController.getPostById);

// 创建文章
router.post('/', postsController.createPost);

// 更新文章
router.put('/:id', postsController.updatePost);

// 删除文章
router.delete('/:id', postsController.deletePost);

module.exports = router;
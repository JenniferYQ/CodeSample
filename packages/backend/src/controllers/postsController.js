/**
 * 文章控制器
 * 处理文章相关的业务逻辑
 */
const Post = require('../models/Post');

/**
 * 获取所有文章
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 根据ID获取单个文章
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '文章不存在'
      });
    }
    
    // 增加浏览次数
    post.viewCount += 1;
    await post.save();
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 创建新文章
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, summary, author, tags, category, isPublished } = req.body;
    
    const post = await Post.create({
      title,
      content,
      summary,
      author,
      tags,
      category,
      isPublished
    });
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 更新文章
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, summary, author, tags, category, isPublished } = req.body;
    
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '文章不存在'
      });
    }
    
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        summary,
        author,
        tags,
        category,
        isPublished,
        updatedAt: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 删除文章
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '文章不存在'
      });
    }
    
    await post.deleteOne();
    
    res.json({
      success: true,
      message: '文章已删除'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * 文章数据模型
 * 定义博客文章的数据结构和验证规则
 */
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '请提供文章标题'],
    trim: true,
    maxlength: [100, '标题不能超过100个字符']
  },
  content: {
    type: String,
    required: [true, '请提供文章内容'],
    trim: true
  },
  summary: {
    type: String,
    trim: true,
    maxlength: [200, '摘要不能超过200个字符']
  },
  author: {
    type: String,
    default: 'anonymous',
    trim: true
  },
  tags: [String],
  category: {
    type: String,
    default: '未分类'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * 更新时间中间件
 * 在保存文档前自动更新updatedAt字段
 */
PostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Post', PostSchema);
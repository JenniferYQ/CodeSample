/**
 * 评论数据模型
 * 定义博客评论的数据结构和验证规则
 */
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, '请提供评论者姓名'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '请提供评论者邮箱'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      '请提供有效的邮箱地址'
    ]
  },
  content: {
    type: String,
    required: [true, '请提供评论内容'],
    trim: true,
    maxlength: [500, '评论不能超过500个字符']
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
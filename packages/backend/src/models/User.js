/**
 * 用户数据模型
 * 定义用户的数据结构和验证规则
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '请提供用户名'],
    unique: true,
    trim: true,
    maxlength: [50, '用户名不能超过50个字符']
  },
  email: {
    type: String,
    required: [true, '请提供邮箱'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      '请提供有效的邮箱地址'
    ]
  },
  password: {
    type: String,
    required: [true, '请提供密码'],
    minlength: [6, '密码至少需要6个字符'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  bio: {
    type: String,
    maxlength: [200, '个人简介不能超过200个字符']
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
 * 密码加密中间件
 * 在保存用户前对密码进行加密
 */
UserSchema.pre('save', async function(next) {
  // 只有在密码被修改时才重新加密
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // 生成盐值
    const salt = await bcrypt.genSalt(10);
    // 加密密码
    this.password = await bcrypt.hash(this.password, salt);
    // 更新时间
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * 验证密码方法
 * @param {string} enteredPassword - 用户输入的密码
 * @returns {Promise<boolean>} - 返回密码是否匹配
 */
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
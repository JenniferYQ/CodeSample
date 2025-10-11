/**
 * 数据库连接配置
 * 负责建立与MongoDB的连接并处理连接事件
 */
const mongoose = require('mongoose');

/**
 * 连接数据库
 * @returns {Promise} 返回连接Promise
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB连接成功: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB连接错误: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
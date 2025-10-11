/**
 * 后端应用入口文件
 * 初始化Express应用，配置中间件，连接数据库，注册路由
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// 加载环境变量
dotenv.config();

// 连接数据库
connectDB();

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 配置中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 导入路由
const apiRoutes = require('./routes');

// 注册路由
app.use('/api', apiRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({
    message: 'Blog后端API服务',
    status: 'running'
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;
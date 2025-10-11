import React from 'react'
import ReactDOM from 'react-dom/client'
import BlogApp from './BlogApp' // 导入博客应用组件
import './index.css'

/**
 * 渲染React应用到DOM
 * 修改为渲染博客应用组件
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogApp /> {/* 使用博客应用组件替换原应用 */}
  </React.StrictMode>
)
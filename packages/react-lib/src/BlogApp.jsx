import React, { useState, useEffect } from 'react';

/**
 * 博客应用组件 - 展示博客文章列表并与后端API交互
 * @returns {JSX.Element} 博客文章列表UI
 */
const BlogApp = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * 从后端API获取博客文章数据
     */
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        if (!response.ok) {
          throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('获取文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="blog-container">
      <h1>博客文章</h1>
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} className="post-item">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <div className="post-meta">
              <span>作者: {post.author}</span>
              <span>日期: {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogApp;
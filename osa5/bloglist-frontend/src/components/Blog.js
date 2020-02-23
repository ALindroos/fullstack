import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = {display: showInfo ? '' : 'none' }

  const toggleVisibility = () => {
    setShowInfo(!showInfo)
  }

  const likeBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes + 1),
      user: blog.user
    }
    updateBlog(blog.id, blogObject)
  }
  
  return (
      <div style={blogStyle}>
        <b onClick={toggleVisibility}>{blog.title}</b> {blog.author}
        <button onClick={toggleVisibility}>
          {showInfo ? 'hide' : 'show' } 
        </button>
          <div style={showWhenVisible}>
            {blog.url}<br />
            likes:{blog.likes}
            <button onClick={likeBlog}>
              like
            </button><br />
            added by: {blog.user.name}
          </div>
      </div>
  )
}

export default Blog
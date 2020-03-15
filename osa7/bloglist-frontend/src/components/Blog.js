import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [ownBlog, setOwnBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: showInfo ? '' : 'none' }
  const showRemove = { display: ownBlog ? '' : 'none' }

  const toggleVisibility = () => {
    setShowInfo(!showInfo)
    if (user.id === blog.user.id) {
      setOwnBlog(true)
    }
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

  const delBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove ${blog.title} ?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <b onClick={toggleVisibility}>{blog.title}</b> {blog.author}
      <button id='info-button' onClick={toggleVisibility}>
        {showInfo ? 'hide' : 'show' }
      </button>
      <div className='blogInfo' style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes:{blog.likes}
          <button id='like-button' onClick={likeBlog}>
            like
          </button><br />
        </div>
        <div>
          <button id='remove-button' style={showRemove} onClick={delBlog}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
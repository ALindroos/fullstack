import React, { useState } from 'react'
import { like, remove } from '../reducers/BlogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [ownBlog, setOwnBlog] = useState(false)

  const dispatch = useDispatch()

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

  const likeBlog = (blog) => {
    dispatch(like(blog.id, blog))
  }

  const delBlog = ( id ) => {
    if (window.confirm(`Remove ${blog.title} ?`)) {
      dispatch(remove(id))
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
          <button id='like-button' onClick={() => likeBlog(blog)}>
            like
          </button><br />
        </div>
        <div>
          <button id='remove-button' style={showRemove} onClick={() => delBlog(blog.id)}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog

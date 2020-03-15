import React from 'react'
import Blog from './Blog'


const BlogForm = ({ blogs, user, updateBlog, removeBlog }) => {
  return(
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id} blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default BlogForm
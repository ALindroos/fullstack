import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'


const BlogForm = () => {

  const blogs = useSelector(state => state.blogs)
  blogs.sort((a, b) => (b.likes - a.likes))

  return(
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id} blog={blog}
        />
      )}
    </div>
  )
}

export default BlogForm
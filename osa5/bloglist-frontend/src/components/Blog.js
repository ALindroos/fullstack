import React from 'react'

const Blog = ({ blog }) => {
  
  return (
      <div>
        <p><b>{blog.title}</b> {blog.author}</p>
      </div>
  )
}

export default Blog
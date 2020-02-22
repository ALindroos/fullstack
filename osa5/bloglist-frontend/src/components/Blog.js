import React from 'react'

const Blog = ({ blog }) => {
  
  return (
      <ul className='blog'>
        <h2>{blog.title}</h2>
        <li>Author: {blog.author}</li>
        <li>link: {blog.url}</li>
        <li>Likes: {blog.likes}</li>
        <li>Added by: {blog.user.username}</li>
      </ul>
  )
}

export default Blog
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { like } from '../reducers/BlogReducer'


const SingleBlog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(u => u.id === id)


  const likeBlog = (blog) => {
    dispatch(like(blog.id, blog))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes: {blog.likes}
        <button id='like-button' onClick={() => likeBlog(blog)}>
          like
        </button>
      </div>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default SingleBlog


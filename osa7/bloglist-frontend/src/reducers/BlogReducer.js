import blogService from '../services/blogs'

export const allBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'ALL',
      data: blogs
    })
  }
}

export const create = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const like = (id, blog) => {
  return async dispatch => {
    await blogService.update(id, blog)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: { id }
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  default: return state
  }
}


export default blogReducer
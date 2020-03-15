import blogService from '../services/blogs'

export const allBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'ALL_BLOGS',
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
    await blogService.like(id, blog)
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
  case 'CREATE':
    return [...state, action.data]
  case 'ALL_BLOGS':
    return action.data
  case 'LIKE':
    const likeId = action.data.id
    const likedBlog = state.find(b => b.id === likeId)
    return state.map(b =>
      b.id !== likeId ? b : likedBlog
    )
  case 'REMOVE':
    const delId = action.data.id
    return state.filter(b => b.id !== delId)
  default: return state
  }
}


export default blogReducer
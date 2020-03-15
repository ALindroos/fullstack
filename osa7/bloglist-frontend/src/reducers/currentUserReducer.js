import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = null

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const init = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'INIT',
      data: user
    }
  }
  return null
}

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return null
    case 'LOGIN':
      return action.data
    case 'INIT':
      return action.data
    default: return state
  }
}

export default currentUserReducer
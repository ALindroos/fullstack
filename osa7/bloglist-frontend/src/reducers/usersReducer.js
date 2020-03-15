import userService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch({
      type: 'ALL',
      data: users
    })
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'ALL':
    return action.data
  default: return state
  }
}

export default usersReducer
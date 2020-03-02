
const initiaState = null
let timeoutId

export const setNotification = (content, delay) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET',
      content: content
    })
    timeoutId = setTimeout(() => {
      dispatch(nullNotification())
    }, delay * 1000)
  }
}

export const nullNotification = () => {
  return {
    type: 'NULL'
  }
}


const notificationReducer = (state = initiaState, action) => {
  switch (action.type) {
    case 'SET': 
      return (
        action.content
      )
    case 'NULL':
      return null
    default: return state
  }
}

export default notificationReducer
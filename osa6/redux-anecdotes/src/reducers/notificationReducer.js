
const initiaState = null

export const setNotification = (head, content) => {
  return {
    type: 'SET',
    content: `${head} '${content}'`
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
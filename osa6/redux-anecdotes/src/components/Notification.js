import React from 'react'
import { useSelector } from 'react-redux'
import { nullNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
    setTimeout(() => {
      dispatch(nullNotification())
    }, 5000)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
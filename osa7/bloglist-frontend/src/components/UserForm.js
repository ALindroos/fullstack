import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/currentUserReducer'

const UserForm = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logout())
  }

  const user = useSelector(state => state.currentUser)

  return (
    <>
      {user.name} logged in
      <button id="logout-button" onClick={handleLogout}>
          logout
      </button>
    </>
  )
}

export default UserForm
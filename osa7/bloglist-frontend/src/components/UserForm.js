import React from 'react'

const UserForm = ({ user, handleLogout }) => {
  return (
    <div>
      {user.name} logged in
      <button id="logout-button" onClick={handleLogout}>
          logout
      </button> 
    </div>
  )
}

export default UserForm
import React from 'react'

const UserForm = ({ user, handleLogout }) => {
  return (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>
          logout
      </button> 
    </div>
  )
}

export default UserForm
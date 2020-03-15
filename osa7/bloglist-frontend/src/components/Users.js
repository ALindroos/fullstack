import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)
  users.sort((a, b) => (b.blogs.length - a.blogs.length))

  return (
    <div>
      <h2>Users</h2>
      <h4>blogs created</h4>
      {users.map(user =>
        <div key={user.id}>
          {user.name} {user.blogs.length}
        </div>
      )}
    </div>
  )
}

export default Users
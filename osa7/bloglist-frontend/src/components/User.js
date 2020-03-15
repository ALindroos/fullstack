import React, { useEffect, useState } from 'react'
import userService from '../services/users'




const Users = () => {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    const initUsers = async () => {
      const users = await userService.getUsers()
      setUsers(users)
    }
    initUsers()
  })

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
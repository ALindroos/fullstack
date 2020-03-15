import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserForm from './components/UserForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Users from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './reducers/usersReducer'
import { allBlogs } from './reducers/BlogReducer'
import { init } from './reducers/currentUserReducer'


const App = () => {
  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(allBlogs())
    dispatch(init())
  },[])

  const user = useSelector(state => state.currentUser)

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <UserForm />
      <BlogForm />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateForm />
      </Togglable>
      <Users />
    </div>
  )
}


export default App
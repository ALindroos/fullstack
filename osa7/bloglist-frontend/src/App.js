import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserForm from './components/UserForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './reducers/usersReducer'
import { allBlogs } from './reducers/BlogReducer'
import { init } from './reducers/currentUserReducer'
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom'
import User from './components/User'


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
    <Router>
      <UserForm />
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/'>
          <BlogForm />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateForm />
          </Togglable>
          <Users />
        </Route>
      </Switch>
    </Router>
  )
}


export default App
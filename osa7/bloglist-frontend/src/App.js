import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserForm from './components/UserForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Users from './components/User'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    const initBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => (b.likes - a.likes)))
    }
    initBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortByLikes = ( sortable ) => {
    setBlogs(sortable.sort((a,b) => (b.likes - a.likes)))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = async (BlogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(BlogObject)
      setBlogs(blogs.concat(newBlog))
    } catch(exception) {
      console.log(exception)
    }
  }

  const updateBlog = async (id, BlogObject) => {
    try {
      const updBlog = await blogService.update(id, BlogObject)
      const bloglist = blogs.map(b => b.id !== updBlog.id ? b : updBlog)
      sortByLikes(bloglist)
      setBlogs(bloglist)
    } catch(exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch(exception) {
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          onUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          onPasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <UserForm user={user} handleLogout={handleLogout} />
      <BlogForm
        blogs={blogs} user={user}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
      />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateForm
          createBlog={createBlog}
        />
      </Togglable>
      <Users />
    </div>
  )
}


export default App
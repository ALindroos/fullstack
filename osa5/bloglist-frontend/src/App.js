import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserForm from './components/UserForm'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const initBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
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

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const BlogObject = {
        title: title,
        author: author,
        url: url,
      }
      const newBlog = await blogService.create(BlogObject)

      console.log(newBlog)
      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))

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
      <BlogForm blogs={blogs} user={user} />
      <CreateForm
        handleCreate={handleCreate}
        title={title}
        onTitleChange={({ target }) => setTitle(target.value)}
        author={author}
        onAuthorChange={({ target }) => setAuthor(target.value)}
        url={url}
        onUrlChange={({ target }) => setUrl(target.value)}  
      />
    </div>
  )
}

export default App
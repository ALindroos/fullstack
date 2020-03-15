import React, { useState } from 'react'
import { create } from '../reducers/BlogReducer'
import { useDispatch } from 'react-redux'

const CreateForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    setTitle('')
    setAuthor('')
    setUrl('')

    dispatch(create(newBlog))
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button id="create-button" type="submit">add blog</button>
      </div>
    </form>
  )
}

export default CreateForm

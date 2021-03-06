import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ createBlog }) => {

  CreateForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
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
        <button id="create-button" type="submit" type="post">add blog</button>
      </div>
    </form>
  )
}

export default CreateForm

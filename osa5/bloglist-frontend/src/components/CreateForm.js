import React, { useState } from 'react'

const CreateForm = ({ createBlog }) => {

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
          name="Title" 
          onChange={({ target }) => setTitle(target.value)} 
        />
      </div>
      <div>
        author:
        <input 
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)} 
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit" type="post">add blog</button>
      </div>
    </form>
  )
}

export default CreateForm
import React from 'react'

const CreateForm = ({ 
  handleCreate, title, onTitleChange,
  author, onAuthorChange,
  url, onUrlChange }) => {
    
  return(
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          type="text" 
          value={title}
          name="Title" 
          onChange={onTitleChange} 
        />
      </div>
      <div>
        author:
        <input 
          type="text"
          value={author}
          name="Author"
          onChange={onAuthorChange} 
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={onUrlChange}
        />
      </div>
      <div>
        <button type="submit" type="post">add blog</button>
      </div>
    </form>
  )
}

export default CreateForm

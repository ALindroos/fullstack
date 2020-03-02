import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnectdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(content))
    dispatch(setNotification(`Created: '${content}'`, 5))
  }

  return (
    <form onSubmit={addAnectdote}>
      <h2>create new</h2>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm

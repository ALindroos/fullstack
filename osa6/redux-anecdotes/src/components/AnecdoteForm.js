import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnectdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.create(content)
    props.setNotification(`Created: '${content}'`, 5)
  }

  return (
    <form onSubmit={addAnectdote}>
      <h2>create new</h2>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
  )
}

const mapDispatchToProps = {
  setNotification,
  create
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm

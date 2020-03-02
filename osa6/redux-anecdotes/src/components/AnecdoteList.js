import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  //Filter all ancdotes by what inputted in filter field
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(a =>
      a.content.toLowerCase().includes(state.filter)))
      
  //Sort given anecdotes by votes (descending)
  anecdotes.sort((a,b) => (b.votes - a.votes))

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id, anecdote))
    dispatch(setNotification(`Voted: '${anecdote.content}'`, 5))
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
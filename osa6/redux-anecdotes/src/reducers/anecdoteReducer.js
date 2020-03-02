import anecdoteService from '../services/anecdotes'

export const create = (content) => {
  console.log('create', content)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (id, anecdote) => {
  console.log('vote', id)
  return async dispatch => {
    await anecdoteService.voteAnecdote(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecToVote = state.find(a => a.id === id)
      return state.map(anec => 
        anec.id !== id ? anec : anecToVote
      )
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default anecdoteReducer
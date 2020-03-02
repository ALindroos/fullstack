import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0}
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const voteAnecdote = async (id, anecdote) => {
  const updAnecdote = anecdote
  updAnecdote.votes = anecdote.votes + 1
  const response = await axios.put(`${baseUrl}/${id}`, updAnecdote)
  return response.data

} 

export default { 
  getAll, 
  createAnecdote,
  voteAnecdote
}
import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { ALL_BOOKS } from './Books'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`
const UPD_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name, 
      setBornTo: $born
    ) {
      name,
      born
    }
  }
`

const Authors = (props) => {
  const [ author, setAuthor ] = useState("")
  const [ born, setBorn ] = useState("")
  const [ editAuthor ] = useMutation(UPD_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS}]
  })
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: author, born: parseInt(born) }})

    setAuthor("")
    setBorn("")
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <h2>Set Birthyear</h2>
        <div>
          name
          <select value={author} onChange={({ target }) => setAuthor(target.value)}>
            <option>---</option>
            {authors.map(a => 
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            )}
          </select>
        </div>
        <div>
          born
          <input value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
        </form>

    </div>
  )
}

export default Authors
export { ALL_AUTHORS }
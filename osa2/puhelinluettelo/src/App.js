import React, { useState, useEffect } from 'react'
import axios from 'axios'




const Number = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => 
        <Number key={person.name} person={person} />
      )}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}> 
      <div>
        name:
        <input value={props.newName} onChange={props.onNameChange} />
      </div>
      <div>
        number:
        <input value={props.newNumber} onChange={props.onNumberChange} />
      </div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Filter = ({ onChange }) => {
  return (
    <div>
      filter with
      <input onChange={onChange} />
    </div>
  )  
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(p => p.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const PersonObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(PersonObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(newFilter))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        newName={newName} onNameChange={handleNameChange}
        newNumber={newNumber} onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App
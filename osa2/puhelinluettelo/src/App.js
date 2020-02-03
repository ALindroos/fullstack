import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Number = ({ person, delPerson }) => {
  return (
    <p>
      {person.name} 
      {person.number}
      <button onClick={delPerson}>delete</button>
    </p>
  )
}

const Persons = ({ persons, delPerson }) => {
  return (
    <div>
      {persons.map((person) => 
        <Number 
          key={person.name} 
          person={person} 
          delPerson={() => delPerson(person)} />
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
    personService
      .getAll()
      .then(initialPersosn => {
        setPersons(initialPersosn)
      })
  }, [])

  const updatePerson = (personObject, person) => {
    if (window.confirm(
      `${person.name} is already added to phonebook. 
      Update number?`)) {

        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(p => p.name === personObject.name).length > 0) {
      updatePerson(personObject, (persons.find(p => p.name === personObject.name)))
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const delPerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
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
      <Persons 
        persons={personsToShow}
        delPerson={delPerson}  
      />
    </div>
  )
}

export default App
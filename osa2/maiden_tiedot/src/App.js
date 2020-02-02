import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Filter = ({ onChange }) => {
  return (
    <div>
      find countries
      <input onChange={onChange} />
    </div>
  )  
}

const ListCountry = ({ country }) => {
  return (
    <div>
      {country.name}
      <button onClick={() => console.log('click')}>show</button>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        Capital: {country.capital}<br />
        Population: {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(l =>
          <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={country.flag} 
        width='600' height='400'
        alt='flag' />
    </div>
  )
} 

const Results = ({ resultCountries }) => {
  console.log(resultCountries.length)

  if (resultCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if (resultCountries.length > 1) {
    return (
      <div>
        {resultCountries.map(c => 
          <ListCountry key={c.name} country={c}/>
        )}
      </div>
    )
  }
  if (resultCountries.length === 1) {
    return (
      <div>
        <Country country={resultCountries[0]} />
      </div>
    )
  }
  return(<div>No matching country</div>)
}


const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const resultCountries = countries.filter(c => c.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <Filter onChange={handleFilterChange} />
      <Results resultCountries={resultCountries} />
    </div>
  )
}

export default App;

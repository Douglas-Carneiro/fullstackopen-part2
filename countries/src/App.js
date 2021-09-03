import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/Search'
import SearchResults from './components/SearchResults'

function App() {
  const [countries, setCountries] = useState([])
  const [ query, setQuery ] = useState('')
  
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleQueryChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }
  
  return (
    <div>
      <Search value={query} eventHandler={handleQueryChange} />
      <SearchResults database={countries} searchQuery={query} />
    </div>
  );
}

export default App;

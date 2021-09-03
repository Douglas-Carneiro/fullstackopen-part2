import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/person'

const Header = ({text}) => (
  <h2>{text}</h2>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()

    if ((newNumber === '') || (newName === '')) {
      alert('Fill all the fields!')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const person = persons.find(person => person.name === newName)
        const id = person.id

        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          }).catch(error => {
            console.log(error)
            setMessage(
              `Information of ${newPerson.name} has already been removed from the server`
            )
            setStatus('error')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
          })
      }
     
      return
    }

    if (persons.find(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setMessage(
          `Added ${returnedPerson.name}`
        )
        setStatus('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(returnedPersons => {
        console.log('Returned persons: ',returnedPersons)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleQueryChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Notification message={message} status={status}/>
      <Filter query={query} eventHandler={handleQueryChange}/>

      <Header text='Add a new' />
      <PersonForm handleSubmit={addPerson} nameValue={newName} numberValue={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} />

      <Header text='Numbers' />
      <Persons contactInfo={persons} searchQuery={query} removeFunction={removePerson}/>
    </div>
  )
}

export default App
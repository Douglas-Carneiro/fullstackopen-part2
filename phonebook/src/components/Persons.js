import React from 'react'

const Person = ({name, number, handleDelete}) => {
    return (
        <p>{name} {number} <button onClick={handleDelete}>delete</button></p>
    )
}

const Persons = ({contactInfo, searchQuery, removeFunction}) => {
    return (
        <div>
            {contactInfo.map(person => {
                if (person.name.toUpperCase().includes(searchQuery.toUpperCase())){
                    return <Person key={person.name} name={person.name} number={person.number} handleDelete={() => removeFunction(person.id)}/>
                }
                return ''
            })
            }
      </div>
    )
}

export default Persons
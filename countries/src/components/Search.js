import React from 'react'

const Search = ({query, eventHandler}) => {
    return (
        <div>
            Find countries: <input value={query} onChange={eventHandler}/>
        </div>
    )
}

export default Search;
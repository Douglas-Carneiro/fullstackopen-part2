import React from 'react'

const Filter = ({query, eventHandler}) => {
    return (
        <div>
            filter shown with: <input value={query} onChange={eventHandler}/>
        </div>
    )
}

export default Filter;
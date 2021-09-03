import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WeatherInfo = ({query}) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    const hook = () => {
        console.log('effect')
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`)
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
          })
      }
      
      useEffect(hook, [])
    
    console.log('Weather data: ', weather)
    if (weather.current) {
        return (
            <div>
                <h2>Weather in {query} </h2>
                <p><strong>Temperature:</strong> {weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons[0]} alt="Weather Icon" />
                <p><strong>Wind:</strong> {weather.current.wind_speed} mph, direction: {weather.current.wind_dir}</p>
            </div>
        )
    }
    else {
        console.log('Weather data: ', weather.current ? 'Contain data': 'No data')
        return <p>Check weather data</p>
    }
}

const Country = ({name, capital, population, languages, flag}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h2>Spoken languages:</h2>
            <ul>
                {languages.map(language => 
                    <li key={language.name}>{language.name}</li>    
                )}
            </ul>
            <img style={{width: "100px"}} src={flag} alt="flag" />
        </div>
    )
}

const ShowCountryInfo = (country) => {
    console.log(country);
    return (
        <>
            <Country name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag} />
        </>
    )
}

const SearchResults = ({database, searchQuery}) => {
    const result = database.filter(country => country.name.includes(searchQuery))
    
    console.log('Result: ', result)

    if (result.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (result.length <= 10 && result.length > 1) {
        return (
            <div>
                {result.map(country => {
                       return(
                            <>
                                <p key={country.name}>{country.name}</p>
                                <button onClick={ShowCountryInfo(country)}>
                                    Show
                                </button>
                            </>
                        ) 
                        }  
                )}
            </div>
        )
    }
    else if (result.length === 1) {
        const country = result[0]

        return (
            <>
                <Country name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag} />
                <WeatherInfo query={country.capital} />
            </>
        )
    }
    else return ''
}

export default SearchResults
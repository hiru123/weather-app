import { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import { fetchWeather } from './api/weather.js'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)
    setWeather(null)
    try {
      const data = await fetchWeather(city)
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1 className="app-title">🌤 Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="loading">Fetching weather...</p>}
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard data={weather} />}
    </div>
  )
}

export default App

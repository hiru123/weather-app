function WeatherCard({ data }) {
  const {
    name,
    sys,
    main,
    weather,
    wind,
  } = data

  const condition = weather[0]
  const tempC = Math.round(main.temp)
  const feelsLike = Math.round(main.feels_like)

  return (
    <div className="weather-card">
      <div className="weather-location">
        <h2>{name}, {sys.country}</h2>
      </div>
      <div className="weather-main">
        <span className="weather-icon-emoji">{condition.icon}</span>
        <div className="weather-temp">{tempC}°C</div>
      </div>
      <p className="weather-description">{condition.description}</p>
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{feelsLike}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

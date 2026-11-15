// Uses two completely free, no-key-required APIs:
//   Geocoding: https://geocoding-api.open-meteo.com
//   Weather:   https://api.open-meteo.com

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

// WMO weather interpretation codes → label + emoji
const WMO_CODES = {
  0:  { label: 'Clear sky',          icon: '☀️' },
  1:  { label: 'Mainly clear',       icon: '🌤️' },
  2:  { label: 'Partly cloudy',      icon: '⛅' },
  3:  { label: 'Overcast',           icon: '☁️' },
  45: { label: 'Foggy',              icon: '🌫️' },
  48: { label: 'Icy fog',            icon: '🌫️' },
  51: { label: 'Light drizzle',      icon: '🌦️' },
  53: { label: 'Drizzle',            icon: '🌦️' },
  55: { label: 'Heavy drizzle',      icon: '🌧️' },
  61: { label: 'Light rain',         icon: '🌧️' },
  63: { label: 'Rain',               icon: '🌧️' },
  65: { label: 'Heavy rain',         icon: '🌧️' },
  71: { label: 'Light snow',         icon: '🌨️' },
  73: { label: 'Snow',               icon: '❄️' },
  75: { label: 'Heavy snow',         icon: '❄️' },
  80: { label: 'Rain showers',       icon: '🌦️' },
  81: { label: 'Heavy showers',      icon: '⛈️' },
  95: { label: 'Thunderstorm',       icon: '⛈️' },
  99: { label: 'Hail storm',         icon: '⛈️' },
}

/**
 * Fetch current weather for a city name.
 * No API key required.
 * @param {string} city
 * @returns {Promise<object>} Normalised weather object
 */
export async function fetchWeather(city) {
  // Step 1: geocode the city name → lat/lon
  const geoRes = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  )
  if (!geoRes.ok) throw new Error('Failed to reach geocoding service.')

  const geoData = await geoRes.json()
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`City "${city}" not found. Please check the name and try again.`)
  }

  const { latitude, longitude, name, country, country_code } = geoData.results[0]

  // Step 2: fetch current weather using lat/lon
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'surface_pressure',
      'weather_code',
    ].join(','),
    wind_speed_unit: 'ms',
    timezone: 'auto',
  })

  const weatherRes = await fetch(`${WEATHER_URL}?${params}`)
  if (!weatherRes.ok) throw new Error('Failed to reach weather service.')

  const weatherData = await weatherRes.json()
  const c = weatherData.current
  const wmo = WMO_CODES[c.weather_code] ?? { label: 'Unknown', icon: '🌡️' }

  // Return a shape similar to what WeatherCard expects
  return {
    name,
    sys: { country: country_code ?? country },
    main: {
      temp:        c.temperature_2m,
      feels_like:  c.apparent_temperature,
      humidity:    c.relative_humidity_2m,
      pressure:    Math.round(c.surface_pressure),
    },
    wind: { speed: c.wind_speed_10m },
    weather: [{ description: wmo.label, icon: wmo.icon, isEmoji: true }],
  }
}

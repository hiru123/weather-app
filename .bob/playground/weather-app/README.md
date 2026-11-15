# Weather App

A React weather app powered by the [OpenWeatherMap API](https://openweathermap.org/api).

## Features
- Search weather by city name
- Shows temperature, feels-like, humidity, wind speed, and pressure
- Weather icon from OpenWeatherMap
- Clean glassmorphism UI

## Getting Started

### 1. Clone / open the project

```bash
cd weather-app
npm install
```

### 2. Add your API key

Open `src/api/weather.js` and replace `YOUR_API_KEY` with your free key:

```js
const API_KEY = 'your_actual_key_here'
```

> Get a free key at https://openweathermap.org/api (free tier covers current weather).

### 3. Run the dev server

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

## Project Structure

```
weather-app/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx           # React entry point
    ├── App.jsx            # Root component (state + layout)
    ├── App.css            # Component styles
    ├── index.css          # Global styles
    ├── api/
    │   └── weather.js     # OpenWeatherMap API fetch
    └── components/
        ├── SearchBar.jsx  # City search form
        ├── WeatherCard.jsx# Weather results display
        └── ErrorMessage.jsx
```

## Build for production

```bash
npm run build
```

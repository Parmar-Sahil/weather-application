import { useEffect, useState } from 'react'
import clear_icon from './assets/clear.png'
import cloud_icon from './assets/cloud.png'
import drizzle_icon from './assets/drizzle.png'
import humidity_icon from './assets/humidity.png'
import rain_icon from './assets/rain.png'
import search_icon from './assets/search.png'
import snow_icon from './assets/snow.png'
import wind_icon from './assets/wind.png'

function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }

  const fetchWeather = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()

      if (data.cod !== 200) {
        setWeatherData(null)
        return
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      console.error("Error fetching weather:", error)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [city])

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather(city)
    }
  }

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6 text-center">
    <h1 className="text-3xl font-semibold text-gray-800 mb-4">🌤 Weather App</h1>

    <div className="flex items-center gap-2 mb-6 w-full max-w-md">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 px-4 py-2 rounded-md border border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md"
      > 
        <img src={search_icon} alt="Search" className="w-5 h-5" />
      </button>
    </div>

    {weatherData ? (
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-700 mb-2">{weatherData.location}</h2>
        <img src={weatherData.icon} alt="Weather Icon" className="w-24 h-24 mx-auto mb-2" />
        <h1 className="text-4xl font-bold text-blue-700">{weatherData.temp}°C</h1>

        <div className="flex justify-around mt-6">
          <div className="flex flex-col items-center">
              <div className="bg-blue-200 p-2 rounded-full">
                <img src={humidity_icon} alt="Humidity" className="w-6 h-6" />
              </div>
              <p className="text-gray-600">{weatherData.humidity}%</p>
              <p className="text-xs text-gray-500">Humidity</p>
              </div>

          <div className="flex flex-col items-center">
          <div className="bg-blue-200 p-2 rounded-full">
            <img src={wind_icon} alt="Wind" className="w-6 h-6" />
          </div>
          <p className="text-gray-600">{weatherData.windSpeed} m/s</p>
          <p className="text-xs text-gray-500">Wind</p>
          </div>

        </div>
      </div>
    ) : (
      <p className="text-gray-600 mt-4">🔍 Enter a city to view weather data</p>
    )}
  </div>
)

}

export default App

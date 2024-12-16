import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  
  const fetchWeather = async () => {
    const API_KEY = "f9d1fb3301c58e52e85e96ccce0cc79a";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(URL);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1 className="title">Weather App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
          />
          <button onClick={fetchWeather} className="search-button">
            Get Weather
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {weather && (
    <div className="weather-info">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <p>🌡️ Temperature: {weather.main.temp}°C</p>
        <p>🌥️ Weather: {weather.weather[0].description}</p>
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
        <p>🎭 Feels Like: {weather.main.feels_like}°C</p>
        <p>📈 Pressure: {weather.main.pressure} hPa</p>
        <p>🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        <p>🔭 Visibility: {weather.visibility / 1000} km</p>
        <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
    </div>
)}
      </div>
    </div>
  );
};

export default WeatherApp;

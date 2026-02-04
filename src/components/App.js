import React, { useState } from "react";

const API_KEY = "YOUR_API_KEY_HERE";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const search = async (e) => {
    if (e.key === "Enter") {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      );

      const data = await response.json();
      setWeather(data);
      setQuery("");
    }
  };

  const kelvinToFahrenheit = (k) => ((k - 273.15) * 9) / 5 + 32;

  return (
    <div className="app">
      <input
        type="text"
        className="search"
        placeholder="Enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={search}
      />

      {weather && weather.main && (
        <div className="weather">
          <div className="city">{weather.name}</div>

          <div className="temperature">
            {Math.round(kelvinToFahrenheit(weather.main.temp))}°F
          </div>

          <div className="description">
            {weather.weather[0].description}
          </div>

          <div className="icon">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

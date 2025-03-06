import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('http://localhost:3001/weather');
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Houston Weather</h1>
      <div className="weather-container">
        {weather && (
          <>
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main?.temp} °F</p>
            <p>Condition: {weather.weather?.[0].description}</p>
            <p>Feels Like: {weather.main?.feels_like} °F</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
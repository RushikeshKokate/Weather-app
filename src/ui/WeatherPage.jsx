import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './WeatherPage.css';

const WeatherPage = () => {
  const { name } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [img, setImg] = useState('');   
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'bcd251d1b4f4fc22366a74f3dd4c1683';  
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`
        );
        const data = response.data;
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure,
          visibility: data.visibility,
          timezone: data.timezone
        });
        setError(null);
        
         
        const description = data.weather[0].description.toLowerCase();
        switch (description) {
          case 'overcast clouds':
            setImg('https://openweathermap.org/img/wn/04d.png');
            break;
          case 'clear sky':
            setImg('https://openweathermap.org/img/wn/01d@2x.png');
            break;
          case 'few clouds':
            setImg('https://openweathermap.org/img/wn/02n.png');
            break;
          case 'scattered clouds':
            setImg('https://openweathermap.org/img/wn/03d@2x.png');
            break;
          case 'broken clouds':
            setImg('https://openweathermap.org/img/wn/04d@2x.png');
            break;
          case 'shower rain':
            setImg('https://openweathermap.org/img/wn/09d@2x.png');
            break;
          case 'rain':
            case 'light rain':
            setImg('https://openweathermap.org/img/wn/10d@2x.png');
            break;
          case 'thunderstorm':
            setImg('https://openweathermap.org/img/wn/11d@2x.png');
            break;
          case 'snow':
            setImg('https://openweathermap.org/img/wn/13d@2x.png');
            break;
          case 'mist':
            setImg('https://openweathermap.org/img/wn/50d@2x.png');
            break;
          default:
            console.log("No matching weather description.");
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [name]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!weather) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="weather-page">
      <h1>Weather in {name}</h1>
      <img src={img} alt="Weather icon"/>
      <h2>Temperature: {weather.temperature}°C</h2>
      <h3>Description: {weather.description}</h3>
      <h3>Humidity: {weather.humidity}%</h3>
      <h3>Wind Speed: {weather.windSpeed} m/s</h3>
      <h3>Pressure: {weather.pressure} hPa</h3>
      <h3>Visibility: {weather.visibility}</h3>
      <h3>Time Zone: {weather.timezone}</h3>
    </div>
  );
};

export default WeatherPage;

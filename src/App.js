import React, { useState } from 'react';
import { Container, Typography, Alert, Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import TemperatureChart from './components/TemperatureChart';
import FavoriteCities from './components/FavoriteCities';
import axios from 'axios';

const WEATHERBIT_API_KEY = '6eed3258f48648639b86841d1c263ec2	'; 

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchWeatherData = async (city) => {
    setError(null);
    setWeatherData(null);
    setForecastData(null);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=87397d56b2606be7f0e1fceee11de430`
      );
      setWeatherData(weatherResponse.data);

      const { coord } = weatherResponse.data;
      const forecastResponse = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coord.lat}&lon=${coord.lon}&days=7&key=${WEATHERBIT_API_KEY}`
      );
      setForecastData(forecastResponse.data);

      setTabValue(0); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error fetching weather data. Please try again later.');
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: '20px' }}>
        Weather Dashboard
      </Typography>
      <Tabs
        value={tabValue} 
        onChange={handleTabChange} 
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : "off"}
        sx={{ minHeight: 'auto' }} // Ensure tabs are small on mobile
      >
        <Tab 
          label="Weather Dashboard" 
          sx={{ fontSize: '1.1rem', marginRight: 2 }} 
        />
        <Tab 
          label="Favorite Cities" 
          sx={{ fontSize: '1.1rem', marginRight: 2 }} 
        />
      </Tabs>
      <Box mt={3}>
        {tabValue === 0 && (
          <Box>
            <SearchBar setWeatherData={fetchWeatherData} />
            {error && <Alert severity="error">{error}</Alert>}
            {weatherData && (
              <Box mt={3}>
                <CurrentWeather weather={weatherData} />
              </Box>
            )}
            {forecastData && (
              <Box mt={3}>
                <Forecast forecast={forecastData} />
                <TemperatureChart forecast={forecastData} />
              </Box>
            )}
          </Box>
        )}
        {tabValue === 1 && (
          <Box mt={3}>
            <FavoriteCities setWeatherData={fetchWeatherData} setTabValue={setTabValue} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;

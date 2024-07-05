import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import { WbSunny, Opacity, Air, Cloud, Favorite, FavoriteBorder } from '@mui/icons-material';
import { styled } from '@mui/system';

const CurrentWeather = ({ weather }) => {
  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px', 
  });

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(fav => fav.id === weather.id);
    setIsFavorite(isAlreadyFavorite);
  }, [weather]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(fav => fav.id === weather.id);

    if (!isAlreadyFavorite) {
      favorites.push({ id: weather.id, name: weather.name });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      alert(`${weather.name} added to favorite City!`);
    } else {
      const updatedFavorites = favorites.filter(fav => fav.id !== weather.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      alert(`${weather.name} removed from favorite City!`);
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5">{weather.name}</Typography>
          <IconButton onClick={toggleFavorite}>
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FlexContainer>
              <WbSunny style={{ marginRight: '8px', marginTop: '2px' }} />
              <Typography variant="body1">
                Temperature: {weather.main.temp}°C
              </Typography>
            </FlexContainer>
            <FlexContainer>
              <Opacity style={{ marginRight: '8px', marginTop: '2px' }} />
              <Typography variant="body1">
                Humidity: {weather.main.humidity}%
              </Typography>
            </FlexContainer>
          </Grid>
          <Grid item xs={6}>
            <FlexContainer>
              <Air style={{ marginRight: '8px', marginTop: '2px' }} />
              <Typography variant="body1">
                Wind Speed: {weather.wind.speed} m/s
              </Typography>
            </FlexContainer>
            <FlexContainer>
              <Cloud style={{ marginRight: '8px', marginTop: '2px' }} />
              <Typography variant="body1">
                Condition: {weather.weather[0].description}
              </Typography>
            </FlexContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;

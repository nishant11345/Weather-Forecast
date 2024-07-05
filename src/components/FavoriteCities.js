import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Paper, Typography, Box } from '@mui/material';

const FavoriteCities = ({ setWeatherData, setTabValue }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleSelectCity = (city) => {
    setWeatherData(city);
    setTabValue(0); 
  };

  return (
    <Box mt={4}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6">Favorite Cities</Typography>
        {favorites.length > 0 ? (
          <List>
            {favorites.map((city) => (
              <ListItem button key={city.id} onClick={() => handleSelectCity(city)}>
                <ListItemText primary={city.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No favorite cities added.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default FavoriteCities;

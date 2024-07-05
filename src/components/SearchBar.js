import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText, Paper, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchBar = ({ setWeatherData }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (searchQuery) => {
    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${searchQuery}&type=like&appid=87397d56b2606be7f0e1fceee11de430`
        );
        if (response.data.list && response.data.list.length > 0) {
          setSuggestions(response.data.list);
          setError(null);
        } else {
          setSuggestions([]);
          setError('No city found. Please check the city name.');
        }
      } catch (error) {
        setSuggestions([]);
        setError('Error fetching city suggestions. Please try again later.');
      }
    } else {
      setSuggestions([]);
      setError(null);
    }
  };

  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setError(null); 
    handleSearch(searchQuery);
  };

  const handleIconClick = () => {
    handleSearch(query);
  };

  const handleSelectCity = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=87397d56b2606be7f0e1fceee11de430`
      );
      if (response.data) {
        setWeatherData(response.data);
        setQuery('');
        setSuggestions([]);
        setError(null);
      } else {
        setError('Error fetching weather data. Please try again later.');
      }
    } catch (error) {
      setError('Error fetching weather data. Please try again later.');
    }
  };

  return (
    <Box mb={4}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: '8px',
          boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            value={query}
            onChange={handleChange}
            fullWidth
            placeholder="Search City"
            sx={{
              borderRadius: '8px',
              '& fieldset': { border: 'none' },
              '& input': { padding: '10px 12px' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleIconClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        {suggestions.length > 0 && !error && (
          <Paper elevation={1} sx={{ maxHeight: 200, overflow: 'auto', mt: 1 }}>
            <List>
              {suggestions.map((city) => (
                <ListItem button key={city.id} onClick={() => handleSelectCity(city)}>
                  <ListItemText primary={city.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default SearchBar;

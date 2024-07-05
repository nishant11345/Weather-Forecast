import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { WbSunny, Cloud } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows ? theme.shadows[4] : '0px 3px 6px rgba(0,0,0,0.1)',
  },
  marginTop: "40px",
}));

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
});

const Forecast = ({ forecast }) => {
  return (
    <Grid container spacing={5}>
      {forecast.data.map((day, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6">{new Date(day.valid_date).toLocaleDateString()}</Typography>
              <FlexContainer>
                <WbSunny style={{ marginRight: '8px', marginTop: '2px' }} /> 
                <Typography>
                  Temperature: {day.temp}°C
                </Typography>
              </FlexContainer>
              <FlexContainer>
                <WbSunny style={{ marginRight: '8px', marginTop: '2px' }} /> 
                <Typography>
                  Min Temp: {day.min_temp}°C
                </Typography>
              </FlexContainer>
              <FlexContainer>
                <WbSunny style={{ marginRight: '8px', marginTop: '2px' }} /> 
                <Typography>
                  Max Temp: {day.max_temp}°C
                </Typography>
              </FlexContainer>
              <FlexContainer>
              <Cloud style={{ marginRight: '8px', marginTop: '2px' }} /> 
              <Typography>
             
                Weather: {day.weather.description}
              </Typography>
              </FlexContainer>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecast;

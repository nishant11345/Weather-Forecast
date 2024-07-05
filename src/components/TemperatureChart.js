import React, { useEffect, useRef } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Chart from 'chart.js/auto';

const TemperatureChart = ({ forecast }) => {
  const chartRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    let chartInstance = null;

    const buildChart = () => {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: forecast.data.map(day => day.valid_date),
          datasets: [
            {
              label: 'Max Temperature (°C)',
              data: forecast.data.map(day => day.max_temp),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.1
            },
            {
              label: 'Min Temperature (°C)',
              data: forecast.data.map(day => day.min_temp),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '7-Day Temperature Trend',
              font: {
                size: isMobile ? 16 : 20 
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return `${value} °C`;
                },
                font: {
                  size: isMobile ? 12 : 10 
                }
              }
            },
            x: {
              ticks: {
                maxRotation: 0, 
                autoSkip: true,
                maxTicksLimit: isMobile ? 4 : 7, 
                font: {
                  size: isMobile ? 12 : 14 
                }
              }
            }
          }
        }
      });
    };

    if (chartRef.current && forecast) {
      buildChart();
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };
  }, [forecast, isMobile]);

  return (
    <Box mt={4} width="100%" height={isMobile ? 400 : 500}>
      <canvas ref={chartRef} />
    </Box>
  );
};

export default TemperatureChart;

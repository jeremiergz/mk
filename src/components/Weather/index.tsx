import { Box, makeStyles, Typography } from '@material-ui/core';
import { useWeather } from 'components/providers/WeatherProvider';
import React from 'react';

const useStyles = makeStyles({
  background: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 4,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    willChange: 'opacity',
  },
});

const Weather: React.FC = () => {
  const { name, weather, ...rest } = useWeather();
  const currentWeather = weather && weather[0];
  return (
    <Box textAlign="left">
      <Typography variant="h4">{name}</Typography>
      {currentWeather && <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`} width={128} />}
    </Box>
  );
};

Weather.displayName = 'Weather';

export default Weather;

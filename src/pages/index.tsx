import { Box, Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import Clock from 'components/Clock';
import { useSettings } from 'components/providers/SettingsProvider';
import { useWallpapers } from 'components/providers/WallpapersProvider';
import { useWeather } from 'components/providers/WeatherProvider';
import Wallpapers from 'components/Wallpapers';
import Weather from 'components/Weather';
import { NextPage } from 'next';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      display: 'grid',
      gridGap: theme.spacing(3),
      gridTemplateColumns: 'repeat(12, 1fr)',
      marginTop: theme.spacing(6),
    },
    hidden: {
      opacity: 0,
    },
    main: {
      opacity: 1,
      padding: theme.spacing(12),
    },
    paper: {
      backgroundColor: theme.palette.warning.main,
    },
  }),
);

const IndexPage: NextPage = () => {
  const classes = useStyles();
  const { isInitialized: hasSettingsInitialized } = useSettings();
  const { isInitialized: hasWallpapersInitialized } = useWallpapers();
  const { isInitialized: hasWeatherInitialized } = useWeather();
  const isInitialized = [hasSettingsInitialized, hasWallpapersInitialized, hasWeatherInitialized].every(v => v);
  const mainClasses = [classes.main, !isInitialized && classes.hidden].filter(x => x).join(' ');
  return (
    <Container className={mainClasses} component="main" maxWidth={false}>
      <Wallpapers />
      <Box className={classes.grid}>
        <Box gridColumn="span 6">
          <Weather />
        </Box>
        <Box gridColumn="span 6">
          <Clock />
        </Box>
      </Box>
    </Container>
  );
};

IndexPage.displayName = 'IndexPage';

export default IndexPage;

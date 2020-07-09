import Compose from '@kobionic/react-compose';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import AuthProvider from 'components/providers/AuthProvider';
import LocationProvider from 'components/providers/LocationProvider';
import SettingsProvider from 'components/providers/SettingsProvider';
import WallpapersProvider from 'components/providers/WallpapersProvider';
import WeatherProvider from 'components/providers/WeatherProvider';
import App from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import theme from 'theme';

class CustomApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Compose
        components={[
          { component: ThemeProvider, props: { theme } },
          { component: SnackbarProvider, props: { anchorOrigin: { horizontal: 'center', vertical: 'top' } } },
          AuthProvider,
          SettingsProvider,
          LocationProvider,
          WallpapersProvider,
          WeatherProvider,
        ]}
      >
        <Head>
          <title>MK | マジック鏡</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color={theme.palette.primary.main} />
          <meta name="msapplication-TileColor" content={theme.palette.primary.main} />
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </Compose>
    );
  }
}

export default CustomApp;

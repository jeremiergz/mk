import { useLocation } from 'components/providers/LocationProvider';
import { useSnackbar } from 'notistack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WEATHER_FETCH_ERROR } from 'utils/messages';
import { apiFetch } from 'utils/web';

type WeatherContext = API.Weather.GETResponse & { isInitialized: boolean };
const WeatherContext = createContext<WeatherContext>({ isInitialized: false } as WeatherContext);

const WeatherProvider: React.FC = ({ children }) => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [weather, setWeather] = useState<API.Weather.GETResponse>({} as API.Weather.GETResponse);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (location) {
      const {
        coords: { latitude: lat, longitude: lon },
      } = location;
      apiFetch(`/weather?lat=${lat}&lon=${lon}`)
        .then((data: API.Weather.GETResponse) => setWeather(data))
        .catch(() => enqueueSnackbar(WEATHER_FETCH_ERROR, { variant: 'error' }))
        .finally(() => setIsInitialized(true));
    }
  }, [location]);
  return <WeatherContext.Provider value={{ ...weather, isInitialized }}>{children}</WeatherContext.Provider>;
};

WeatherProvider.displayName = 'WeatherProvider';

/**
 * Returns the Weather context.
 */
function useWeather() {
  return useContext(WeatherContext);
}

export { useWeather };
export default WeatherProvider;

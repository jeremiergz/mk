import { useSnackbar } from 'notistack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WALLPAPERS_FETCH_ERROR } from 'utils/messages';
import { apiFetch } from 'utils/web';

const WallpapersContext = createContext<{ isInitialized: boolean; wallpapers: API.Wallpapers.GETResponse['images'] }>({
  isInitialized: false,
  wallpapers: [],
});

const WallpapersProvider: React.FC = ({ children }) => {
  const [wallpapers, setWallpapers] = useState<API.Wallpapers.GETResponse['images']>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    apiFetch('/wallpapers')
      .then((data: API.Wallpapers.GETResponse) => setWallpapers(data.images))
      .catch(() => enqueueSnackbar(WALLPAPERS_FETCH_ERROR, { variant: 'error' }))
      .finally(() => setIsInitialized(true));
  }, []);
  return <WallpapersContext.Provider value={{ isInitialized, wallpapers }}>{children}</WallpapersContext.Provider>;
};

WallpapersProvider.displayName = 'WallpapersProvider';

/**
 * Returns the Wallpapers context.
 */
function useWallpapers() {
  return useContext(WallpapersContext);
}

export { useWallpapers };
export default WallpapersProvider;

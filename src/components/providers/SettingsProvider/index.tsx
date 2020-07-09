import useDebounce from 'hooks/useDebounce';
import { useSnackbar } from 'notistack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SETTINGS_FETCH_ERROR, SETTINGS_UPDATE_ERROR } from 'utils/messages';
import { apiFetch } from 'utils/web';

type SettingsContext = API.Settings.GETResponse & {
  isInitialized: boolean;
  updateSetting: (setting: Record<string, any>) => void;
};
const SettingsContext = createContext<SettingsContext>({ isInitialized: false } as SettingsContext);

const SettingsProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [settings, setSettings] = useState<API.Settings.GETResponse>({} as API.Settings.GETResponse);
  const debouncedSettings = useDebounce(settings, 1000);
  const [isInitialized, setIsInitialized] = useState(false);
  const updateSetting = (setting: Record<string, any>) => setSettings({ ...settings, ...setting });
  useEffect(() => {
    if (isInitialized) {
      apiFetch('/settings', { body: settings, method: 'PUT' }).catch(() =>
        enqueueSnackbar(SETTINGS_UPDATE_ERROR, { variant: 'error' }),
      );
    }
  }, [debouncedSettings]);
  useEffect(() => {
    apiFetch('/settings')
      .then((data: API.Settings.GETResponse) => setSettings(data))
      .catch(() => enqueueSnackbar(SETTINGS_FETCH_ERROR, { variant: 'error' }))
      .finally(() => setIsInitialized(true));
  }, []);
  return (
    <SettingsContext.Provider value={{ ...settings, isInitialized, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.displayName = 'SettingsProvider';

/**
 * Returns the Settings context.
 */
function useSettings() {
  return useContext(SettingsContext);
}

export { useSettings };
export default SettingsProvider;

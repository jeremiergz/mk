import { useSnackbar } from 'notistack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { OS_FETCH_ERROR } from 'utils/messages';
import { apiFetch } from 'utils/web';

type OSContext = API.OS.GETResponse & { isInitialized: boolean };
const OSContext = createContext<OSContext>({ isInitialized: false } as OSContext);

const OSProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, error } = useSWR<API.OS.GETResponse>('/os', apiFetch, { refreshInterval: 15000 });
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (data) setIsInitialized(true);
  }, [data]);
  useEffect(() => {
    if (error) enqueueSnackbar(OS_FETCH_ERROR, { variant: 'error' });
  }, [error]);
  return <OSContext.Provider value={{ ...data, isInitialized }}>{children}</OSContext.Provider>;
};

OSProvider.displayName = 'OSProvider';

/**
 * Returns the OS context.
 */
function useOS() {
  return useContext(OSContext);
}

export { useOS };
export default OSProvider;

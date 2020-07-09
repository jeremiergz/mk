import React, { createContext, useContext, useEffect, useState } from 'react';

const LocationContext = createContext<Position>(null);

const LocationProvider: React.FC = ({ children }) => {
  const [position, setPosition] = useState<Position>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  }, []);
  return <LocationContext.Provider value={position}>{children}</LocationContext.Provider>;
};

LocationProvider.displayName = 'LocationProvider';

/**
 * Returns the Location context.
 */
function useLocation() {
  return useContext(LocationContext);
}

export { useLocation };
export default LocationProvider;

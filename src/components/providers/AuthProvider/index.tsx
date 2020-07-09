import router from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from 'utils/web';

type AuthContext = {
  isInitialized: boolean;
  jwt: string;
  setJWT: (jwt: string) => void;
  setUser: (user: Models.User) => void;
  user: Models.User;
};
const AuthContext = createContext<AuthContext>({
  isInitialized: false,
  jwt: null,
  setJWT: () => null,
  setUser: () => null,
  user: null,
});

const AuthProvider: React.FC = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [jwt, setJWT] = useState<string>(null);
  const [user, setUser] = useState<Models.User>(null);
  useEffect(() => {
    apiFetch('/auth/me')
      .then(({ jwt, user }: API.Auth.Me.GETResponse) => {
        setJWT(jwt);
        setUser(user);
      })
      .catch(() => {})
      .finally(() => setIsInitialized(true));
  }, []);
  return <AuthContext.Provider value={{ isInitialized, jwt, setJWT, setUser, user }}>{children}</AuthContext.Provider>;
};

AuthProvider.displayName = 'AuthProvider';

/**
 * Returns the Auth context.
 */
function useAuth({ redirectIfFound = false, redirectTo = null }: useAuthProps = {}) {
  const { isInitialized, user } = useContext(AuthContext);
  const hasUser = !!user;
  useEffect(() => {
    if (!redirectTo || !isInitialized) return;
    if ((redirectTo && !redirectIfFound && !hasUser) || (redirectIfFound && hasUser)) {
      router.push(redirectTo);
    }
  }, [hasUser, isInitialized, redirectIfFound, redirectTo]);
  return useContext(AuthContext);
}

export type useAuthProps = {
  redirectIfFound?: boolean;
  redirectTo?: string;
};
export { useAuth };
export default AuthProvider;

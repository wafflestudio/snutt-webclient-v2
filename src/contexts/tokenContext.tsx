import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import { authService } from '@/usecases';
type TokenContext = {
  token: string | null;
  saveToken: (token: string, permanent: boolean) => void;
  clearToken: () => void;
};

const tokenContext = createContext<TokenContext | null>(null);

export const TokenContextProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [token, setToken] = useState(authService.getToken());

  const { Provider } = tokenContext;

  const value = useMemo((): TokenContext => {
    return {
      token,
      saveToken: (token, permanent) => {
        setToken(token);
        authService.saveToken(token, permanent);
      },
      clearToken: () => {
        setToken(null);
        authService.clearToken();
      },
    };
  }, [token]);

  return <Provider value={value}>{children}</Provider>;
};

export const useTokenContext = () => {
  const value = useContext(tokenContext);
  if (value === null) throw new Error('TokenContextProvider not provided');
  return value;
};

import { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';

import { serviceContext } from '@/contexts/ServiceContext';
import { useGuardContext } from '@/hooks/useGuardContext';

type TokenContext = {
  token: string | null;
  saveToken: (token: string, permanent: boolean) => void;
  clearToken: () => void;
};

const tokenContext = createContext<TokenContext | null>(null);

export const TokenContextProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { authService } = useGuardContext(serviceContext);
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
  }, [token, authService]);

  return <Provider value={value}>{children}</Provider>;
};

export const useTokenContext = () => {
  const value = useContext(tokenContext);
  if (value === null) throw new Error('TokenContextProvider not provided');
  return value;
};

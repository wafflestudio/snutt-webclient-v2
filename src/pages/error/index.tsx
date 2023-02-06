import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

import { truffleClient } from '@/clients/truffle';

export const ErrorPage = () => {
  const error = useRouteError();

  useEffect(() => {
    truffleClient.capture(new Error(JSON.stringify(error)));
  }, [error]);

  return <div>Error</div>;
};

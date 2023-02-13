import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { TokenContextProvider } from '@/contexts/tokenContext';
import { Login } from '@/pages/login';
import { Main } from '@/pages/main';
import { MyPage } from '@/pages/mypage';
import { SignUp } from '@/pages/signup';

import { truffleClient } from './clients/truffle';
import { ErrorDialog } from './components/error-dialog';
import { useErrorDialog } from './hooks/useErrorDialog';
import { ErrorPage } from './pages/error';

const router = createBrowserRouter([
  {
    children: [
      { path: '/', element: <Main /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/mypage', element: <MyPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const { message, isOpen, onClose } = useErrorDialog();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            console.log(error);
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            onError: (err) => truffleClient.capture(new Error(JSON.stringify(err))),
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <RouterProvider router={router} />
        <GlobalStyles />
        <ErrorDialog message={message} onClose={onClose} isOpen={isOpen} />
      </TokenContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    background: rgb(247, 248, 249);
    margin: 0;
  }
`;

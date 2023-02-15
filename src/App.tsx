import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { truffleClient } from '@/clients/truffle';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { ErrorPage } from '@/pages/error';
import { Login } from '@/pages/login';
import { Main } from '@/pages/main';
import { MyPage } from '@/pages/mypage';
import { SignUp } from '@/pages/signup';
import { get } from '@/utils/object/get';

import { useTokenContext } from './contexts/tokenContext';
import { NotFoundPage } from './pages/not-found';

const router = createBrowserRouter([
  {
    children: [
      { path: '/', element: <Main /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/*', element: <NotFoundPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const { clearToken } = useTokenContext();
  const [isWrongTokenDialogOpen, setWrongTokenDialogOpen] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => get(error, ['errcode']) === 8194 && setWrongTokenDialogOpen(true),
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            onError: (err) => truffleClient.capture(new Error(JSON.stringify(err))),
            retry: false,
          },
        },
      }),
  );

  const onClickLogout = () => {
    clearToken();
    setWrongTokenDialogOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ReactQueryDevtools />
      <Dialog open={isWrongTokenDialogOpen}>
        <Dialog.Title>인증정보가 올바르지 않아요</Dialog.Title>
        <Dialog.Content>다시 로그인해 주세요</Dialog.Content>
        <Dialog.Actions>
          <Button data-testid="wrong-token-dialog-logout" onClick={onClickLogout}>
            로그아웃하기
          </Button>
        </Dialog.Actions>
      </Dialog>
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

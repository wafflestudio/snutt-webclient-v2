import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Login } from '@/pages/login';
import { Main } from '@/pages/main';
import { MyPage } from '@/pages/mypage';
import { SignUp } from '@/pages/signup';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/mypage', element: <MyPage /> },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: rgb(247, 248, 249);
    margin: 0;
  }
`;

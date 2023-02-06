import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { TokenContextProvider } from '@/contexts/tokenContext';
import { Login } from '@/pages/login';
import { Main } from '@/pages/main';
import { MyPage } from '@/pages/mypage';
import { SignUp } from '@/pages/signup';

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
  return (
    <TokenContextProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
    </TokenContextProvider>
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

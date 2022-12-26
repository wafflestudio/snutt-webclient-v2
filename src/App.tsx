import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from './pages/login';
import { Main } from './pages/main';
import { MyPage } from './pages/mypage';
import { SignUp } from './pages/signup';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/mypage', element: <MyPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

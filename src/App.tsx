import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./pages/main";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { MyPage } from "./pages/mypage";
import { createGlobalStyle } from "styled-components";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/mypage", element: <MyPage /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyles />
    </>
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

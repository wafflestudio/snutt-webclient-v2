import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./pages/main";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { MyPage } from "./pages/mypage";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/mypage", element: <MyPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

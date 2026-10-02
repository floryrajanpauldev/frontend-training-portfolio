import { createBrowserRouter, RouterProvider } from "react-router";

import AuthenticateLayout from "./AuthenticateLayout";
import Home from "./Home";
import UserList from "./UserList";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticateLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "users",
        element: <UserList />
      }
    ]
  },

  // Public route — NOT inside AuthenticateLayout
  {
    path: "/login",
    element: <Login />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
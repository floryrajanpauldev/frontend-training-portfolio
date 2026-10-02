import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./Login";
import Benefits from "./Benefits";
import UserList, { loader as userLoader } from "./UserList";
import Recipes, { loader as recipesLoader } from "./Recipes";
import { requireAuth } from "./utils";

const router = createBrowserRouter([
  {
    path: "/benefits",
    element: <Benefits />,
    loader: async () => {
      await requireAuth();
      return null;
    }
  },

  {
    path: "/users",
    element: <UserList />,
    loader: userLoader
  },

  {
    path: "/recipes",
    element: <Recipes />,
    loader: recipesLoader
  },

  // Public route
  {
    path: "/login",
    element: <Login />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router";

import Layout from "./Layout";
import Home from "./Home";

import RecipesLoader, {
  loader as recipesLoader
} from "./RecipesLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route
        path="recipes"
        element={<RecipesLoader />}
        loader={recipesLoader}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
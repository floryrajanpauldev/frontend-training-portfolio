import {
    createBrowserRouter,
    RouterProvider
} from "react-router";

import Recipes, {
    loader as recipesLoader
} from "./Recipes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Recipes />,
        loader: recipesLoader
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router";

import Login, {
    action as loginAction
} from "./Login";

function Home() {
    return <h1>Home Page</h1>;
}

function Users() {
    return <h1>Users Page</h1>;
}

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                    action={loginAction}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;

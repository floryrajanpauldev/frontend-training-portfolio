
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router";

import Login from "./Login";
import Benefits from "./Benefits";
import ErrorPage from "./ErrorPage";
import { userLoggedIn } from "./utils";

function Home() {
  return (
    <>
      <h1>Home</h1>

      <nav>
        <Link to="/benefits">Go to Benefits</Link>
      </nav>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />
        <Route path="/users" element={<Users />} />
        
        <Route
          path="/benefits"
          element={<Benefits />}
          loader={userLoggedIn}
          errorElement={<ErrorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

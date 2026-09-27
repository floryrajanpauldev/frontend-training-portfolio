
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router";

import Profile from "./NavigateComponent";
import authLoader from "./RedirectLoader";

function Home() {
  return (
    <>
      <h1>Home</h1>

      <Link to="/profile">Go to Profile</Link>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Component-level redirect example */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Loader-level redirect example */}
        <Route
          path="/loader-profile"
          element={<h1>Loader Profile</h1>}
          loader={authLoader}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

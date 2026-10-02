import { BrowserRouter, Routes, Route, Link } from "react-router";
import ResourceLayout from "./ResourceLayout";
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/resources">Resources</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Home</h2>} />

        <Route path="/resources" element={<ResourceLayout />}>
          <Route index element={<UsersList />} />
          <Route path="user/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

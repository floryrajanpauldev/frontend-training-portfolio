import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <Link to="profile">Profile</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function Profile() {
  return <h2>Profile</h2>;
}

function Settings() {
  return <h2>Settings</h2>;
}

function NestedRoutesExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default NestedRoutesExample;
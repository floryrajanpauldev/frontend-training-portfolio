import { BrowserRouter, Link, Routes, Route, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link>{" | "}
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </>
  );
}

function DashboardHome() { return <h2>Dashboard Home</h2>; }
function Profile() { return <h2>Profile</h2>; }
function Settings() { return <h2>Settings</h2>; }

export default function IndexRouteExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

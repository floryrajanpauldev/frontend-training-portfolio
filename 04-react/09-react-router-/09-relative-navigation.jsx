import { BrowserRouter, Link, Routes, Route, Outlet, useParams } from "react-router-dom";

function UserLayout() {
  return <Outlet />;
}

function UserList() {
  return <h2>User List (select a user from your real list)</h2>;
}

function UserDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>User Details: {id}</h2>
      <Link to=".." relative="path">Back to UserList</Link>
    </div>
  );
}

export default function RelativeNavigationExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="users" element={<UserLayout />}>
          <Route index element={<UserList />} />
          <Route path=":id" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

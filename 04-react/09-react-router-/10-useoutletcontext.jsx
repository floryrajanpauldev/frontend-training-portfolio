import { BrowserRouter, Routes, Route, Outlet, Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ResourceLayout() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUserList(data));
  }, []);

  return <Outlet context={userList} />;
}

function UserList() {
  const userList = useOutletContext();

  return (
    <>
      <h2>User List</h2>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            <Link to={String(user.id)}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function UserDetails() {
  const userList = useOutletContext();
  const { id } = useParams();

  const userDetails = userList.find((user) => user.id === Number(id));

  if (!userDetails) return <p>Loading user...</p>;

  return (
    <div>
      <h2>{userDetails.name}</h2>
      <p>{userDetails.email}</p>
      <Link to=".." relative="path">Back to UserList</Link>
    </div>
  );
}

export default function UseOutletContextExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="resources" element={<ResourceLayout />}>
          <Route index element={<UserList />} />
          <Route path=":id" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

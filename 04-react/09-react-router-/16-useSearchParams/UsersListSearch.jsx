import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

function UsersListSearch() {
  const [userList, setUserList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const usernameFilter = searchParams.get("username") || "";
  const [username, setUsername] = useState(usernameFilter);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUserList(data));
  }, []);

  const filteredUserList = usernameFilter
    ? userList.filter(
        (user) =>
          user.username.toLowerCase() === usernameFilter.toLowerCase()
      )
    : userList;

  useEffect(() => {
    const params = {};
    if (username) params.username = username;
    setSearchParams(params);
  }, [username, setSearchParams]);

  return (
    <div>
      <h2>Users Search</h2>

      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Search username"
      />

      <p>
        <Link to="?username=bret">Bret</Link>{" "}
        <Link to="?username=kamren">Kamren</Link>{" "}
        <button onClick={() => setSearchParams({})}>Clear</button>
      </p>

      {filteredUserList.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  );
}

export default UsersListSearch;

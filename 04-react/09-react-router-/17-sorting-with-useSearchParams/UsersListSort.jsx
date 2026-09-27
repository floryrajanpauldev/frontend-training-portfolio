
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

function UsersListSort() {
  const [users, setUsers] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const username = searchParams.get("username") || "";
  const sort = searchParams.get("sort") || "asc";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("username", value);
    } else {
      params.delete("username");
    }

    setSearchParams(params);
  };

  const handleSort = (event) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", event.target.value);

    setSearchParams(params);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(username.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return sort === "asc"
      ? a.username.localeCompare(b.username)
      : b.username.localeCompare(a.username);
  });

  return (
    <div>
      <h1>Users</h1>

      <input
        type="text"
        placeholder="Search by username"
        value={username}
        onChange={handleSearch}
      />

      <select value={sort} onChange={handleSort}>
        <option value="asc">Username A-Z</option>
        <option value="desc">Username Z-A</option>
      </select>

      <ul>
        {sortedUsers.map((user) => (
          <li key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersListSort;


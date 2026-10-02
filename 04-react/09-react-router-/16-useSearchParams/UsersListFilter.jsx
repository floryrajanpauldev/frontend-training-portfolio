
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

function UsersListFilter() {
  const [users, setUsers] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const username = searchParams.get("username") || "";

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

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(username.toLowerCase())
  );

  const handleSearch = (event) => {
    const value = event.target.value;

    if (value) {
      setSearchParams({
        username: value
      });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <h1>Users</h1>

      <input
        type="text"
        placeholder="Search by username"
        value={username}
        onChange={handleSearch}
      />

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersListFilter;


import { useState } from "react";
import axios from "axios";

function AxiosGet() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      // ------------------------------------
      // 1. Axios GET shorthand
      // ------------------------------------

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
        {
          params: {
            name: searchQuery,
          },
        }
      );

      // ------------------------------------
      // 2. Axios configurable syntax
      // ------------------------------------
      /*
      const response = await axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/users",
        params: {
          name: searchQuery,
        },
      });
      */

      setUsers(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Axios GET Request</h2>

      <input
        type="text"
        placeholder="Enter user name"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AxiosGet;
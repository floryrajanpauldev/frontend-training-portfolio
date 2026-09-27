
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

function UsersListPagination() {
  const [users, setUsers] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const usersPerPage = 3;

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

  const startIndex = (page - 1) * usersPerPage;

  const currentUsers = users.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const totalPages = Math.ceil(
    users.length / usersPerPage
  );

  const goToPage = (newPage) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    setSearchParams(params);
  };

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {currentUsers.map((user) => (
          <li key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>

      <button
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        Previous
      </button>

      <span>
        {" "}Page {page} of {totalPages}{" "}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default UsersListPagination;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function CombinedSearchSortPagination() {
  const [userList, setUserList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const username = searchParams.get("username") || "";
  const sort = searchParams.get("sort") || "asc";
  const page = Number(searchParams.get("page")) || 1;
  const usersPerPage = 3;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUserList(data));
  }, []);

  let result = username
    ? userList.filter(
        (user) =>
          user.username.toLowerCase() === username.toLowerCase()
      )
    : userList;

  result = [...result].sort((a, b) =>
    sort === "asc"
      ? a.username.localeCompare(b.username)
      : b.username.localeCompare(a.username)
  );

  const totalPages = Math.max(1, Math.ceil(result.length / usersPerPage));
  const currentPage = Math.min(page, totalPages);

  const paginatedUsers = result.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const updateParams = (changes) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null) params.delete(key);
      else params.set(key, String(value));
    });

    setSearchParams(params);
  };

  return (
    <div>
      <h2>Search + Sort + Pagination</h2>

      <input
        value={username}
        placeholder="Username"
        onChange={(event) =>
          updateParams({ username: event.target.value, page: 1 })
        }
      />

      <select
        value={sort}
        onChange={(event) =>
          updateParams({ sort: event.target.value, page: 1 })
        }
      >
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>

      <button onClick={() => setSearchParams({})}>Clear</button>

      {paginatedUsers.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}

      <button
        disabled={currentPage === 1}
        onClick={() => updateParams({ page: currentPage - 1 })}
      >
        Previous
      </button>

      <span> Page {currentPage} of {totalPages} </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => updateParams({ page: currentPage + 1 })}
      >
        Next
      </button>
    </div>
  );
}

export default CombinedSearchSortPagination;

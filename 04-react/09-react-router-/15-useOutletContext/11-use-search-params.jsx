import { useEffect, useState } from "react";
import { BrowserRouter, Link, useSearchParams } from "react-router-dom";

const users = [
  { id: 1, username: "Bret" },
  { id: 2, username: "Antonette" },
  { id: 3, username: "Samantha" },
  { id: 4, username: "Karianne" },
  { id: 5, username: "Kamren" },
  { id: 6, username: "Leopoldo_Corkery" },
  { id: 7, username: "Elwyn.Skiles" },
  { id: 8, username: "Maxime_Nienow" },
  { id: 9, username: "Delphine" },
  { id: 10, username: "Moriah.Stanton" },
];

function UserListSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const usernameFilter = searchParams.get("username") || "";
  const sortFilter = searchParams.get("sort") || "asc";
  const pageFilter = Number(searchParams.get("page")) || 1;

  const [username, setUsername] = useState(usernameFilter);
  const [sort, setSort] = useState(sortFilter);

  const usersPerPage = 3;

  useEffect(() => {
    const params = {};
    if (username) params.username = username;
    if (sort) params.sort = sort;
    if (pageFilter > 1) params.page = pageFilter;

    setSearchParams(params);
  }, [username, sort, pageFilter, setSearchParams]);

  const filteredUserList = usernameFilter
    ? users.filter((user) =>
        user.username.toLowerCase().includes(usernameFilter.toLowerCase())
      )
    : users;

  const sortedUserList = [...filteredUserList].sort((a, b) =>
    sort === "asc"
      ? a.username.localeCompare(b.username)
      : b.username.localeCompare(a.username)
  );

  const totalPages = Math.max(1, Math.ceil(sortedUserList.length / usersPerPage));
  const currentPage = Math.min(pageFilter, totalPages);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = sortedUserList.slice(startIndex, startIndex + usersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setSearchParams({
        ...(username && { username }),
        sort,
        page: String(currentPage + 1),
      });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setSearchParams({
        ...(username && { username }),
        sort,
        page: String(currentPage - 1),
      });
    }
  };

  const clearFilters = () => {
    setSearchParams({});
    setUsername("");
    setSort("asc");
  };

  return (
    <div>
      <h1>User List</h1>

      <input
        type="text"
        name="username"
        value={username}
        placeholder="Search username"
        onChange={(event) => setUsername(event.target.value)}
      />

      <select value={sort} onChange={(event) => setSort(event.target.value)}>
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>

      <div>
        <Link to="?username=Bret">Bret</Link>{" | "}
        <Link to="?username=Kamren">Kamren</Link>{" | "}
        <Link to=".">Clear URL Filter</Link>
      </div>

      <div>
        <button onClick={() => setSearchParams({ username: "Bret" })}>Bret</button>
        <button onClick={() => setSearchParams({ username: "Kamren" })}>Kamren</button>
        <button onClick={clearFilters}>Clear Filter</button>
      </div>

      <ul>
        {paginatedUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>

      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default function UseSearchParamsExample() {
  return (
    <BrowserRouter>
      <UserListSearchParams />
    </BrowserRouter>
  );
}

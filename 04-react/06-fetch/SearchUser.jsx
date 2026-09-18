import React, { useEffect, useState } from "react";

function SearchUser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchData([]);
      return;
    }

    fetch(
      `https://jsonplaceholder.typicode.com/users?name_like=${searchQuery}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to search users");
        }

        return response.json();
      })
      .then((data) => {
        setSearchData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery]);

  return (
    <>
      <h2>Search Users</h2>

      <input
        type="search"
        name="search"
        placeholder="Search user details"
        value={searchQuery}
        onChange={handleInputChange}
      />

      {searchData.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </>
  );
}

export default SearchUser;

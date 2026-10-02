import React, { useEffect, useState } from "react";

function SearchUserDebounce() {
  // Step 1: Store the search input and API response
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  // Step 2: Update searchQuery whenever the user types
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Step 6: Make the API call after the debounce delay
  const fetchSearchApi = () => {
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
        console.log("API call:", searchQuery);
        setSearchData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Step 3: Run whenever searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchData([]);
      return;
    }

    // Step 4: Wait 500 milliseconds before calling the API
    const timer = setTimeout(() => {
      fetchSearchApi();
    }, 500);

    // Step 5: Cancel the previous timer if the user types again
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <>
      <h2>Search Users - Debouncing</h2>

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

export default SearchUserDebounce;

/*
Debouncing sequence:

User types
  ↓
searchQuery changes
  ↓
useEffect runs
  ↓
500ms timer starts
  ↓
User types again
  ↓
Cleanup runs
  ↓
Previous timer is cancelled
  ↓
New timer starts
  ↓
User stops typing
  ↓
API call runs after 500ms

If the user types "John" continuously within 500ms between keystrokes,
only one API call is made for "John".
*/

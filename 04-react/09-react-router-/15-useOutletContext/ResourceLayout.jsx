import { Outlet } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

function ResourceLayout() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUserList(response.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Resources</h1>
      <Outlet context={userList} />
    </div>
  );
}

export default ResourceLayout;

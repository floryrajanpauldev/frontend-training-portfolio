import { Link, useOutletContext } from "react-router";

function UsersList() {
  const userList = useOutletContext();

  return (
    <div>
      <h2>Users</h2>
      {userList.map((user) => (
        <p key={user.id}>
          <Link to={`user/${user.id}`}>{user.name}</Link>
        </p>
      ))}
    </div>
  );
}

export default UsersList;

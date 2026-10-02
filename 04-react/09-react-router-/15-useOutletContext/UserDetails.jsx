import { Link, useOutletContext, useParams } from "react-router";

function UserDetails() {
  const userList = useOutletContext();
  const { id } = useParams();

  const userDetails = userList.find(
    (user) => user.id === Number(id)
  );

  if (!userDetails) return <p>User not found.</p>;

  return (
    <div>
      <h2>{userDetails.name}</h2>
      <p>Username: {userDetails.username}</p>
      <p>Email: {userDetails.email}</p>
      <Link to=".." relative="path">Back to User List</Link>
    </div>
  );
}

export default UserDetails;

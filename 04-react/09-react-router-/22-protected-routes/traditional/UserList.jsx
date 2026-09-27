import { useLoaderData } from "react-router";
import { requireAuth } from "./utils";

export async function loader() {
await requireAuth();

const response = await fetch(
"https://jsonplaceholder.typicode.com/users"
);

if (!response.ok) {
throw new Error("Failed to fetch users");
}

return response.json();
}

function UserList() {
const users = useLoaderData();

return ( <div> <h2>User List</h2>


  {users.map((user) => (
    <p key={user.id}>{user.name}</p>
  ))}
</div>


);
}

export default UserList;

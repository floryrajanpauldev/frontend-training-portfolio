import { useState } from 'react';

function UpdateUsers() {
  const userList = [
    { id: 1, name: 'Jane', city: 'London' },
    { id: 2, name: 'John', city: 'Paris' },
    { id: 3, name: 'Mary', city: 'New York' },
  ];

  const [users, setUsers] = useState(userList);

  function handleUpdateName(id, newName) {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === id
          ? { ...user, name: newName }
          : user
      )
    );
  }

  return (
    <div>
      <h2>Updating One Object Inside an Array</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.city}
          </li>
        ))}
      </ul>
      <button onClick={() => handleUpdateName(1, 'Alice')}>
        Change Jane to Alice
      </button>
    </div>
  );
}

export default UpdateUsers;

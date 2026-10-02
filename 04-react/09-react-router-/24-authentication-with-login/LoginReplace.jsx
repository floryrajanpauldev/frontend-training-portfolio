
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginReplace() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const handleSubmit = (event) => {
    event.preventDefault();

    // In a real application, the API call
    // would happen here.

    console.log("Login successful");

    // Replace the Login history entry
    // with the Users page.
    navigate("/users", { replace: true });
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginReplace;

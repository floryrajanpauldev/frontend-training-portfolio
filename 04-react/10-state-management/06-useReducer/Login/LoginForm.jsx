
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Frontend validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setUserData(data);
        setError(null);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {isLoggedIn && userData ? (
        <h3>
          Welcome {userData.firstName} {userData.lastName}
        </h3>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Login</button>
        </form>
      )}
    </>
  );
}

export default LoginForm;

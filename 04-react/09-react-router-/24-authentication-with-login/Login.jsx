
import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "./utils";

function Login() {
  const [formValue, setFormValue] = useState({
    username: "emilys",
    password: "emilyspass",
  });

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    setIsError(false);

    loginUser(formValue)
      .then((data) => {
        console.log(data);

        // Save the access token
        localStorage.setItem(
          "accessToken",
          data.accessToken
        );

        // Navigate after successful login
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  return (
    <>
      <h2>Enter Login Details</h2>

      {isError && <p>Login failed. Please try again.</p>}

      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">Username</label>

          <input
            id="username"
            type="text"
            name="username"
            value={formValue.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;


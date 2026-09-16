import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formValue, setFormValue] = useState({});
  const [isError, setIsError] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setIsError(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!password.includes('@')) {
      setIsError(true);
      return;
    }

    setIsError(false);
    setFormValue({ username, password });
    setUsername('');
    setPassword('');
  }

  return (
    <div>
      <h2>Login Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-username">User Name:</label>
          <input
            id="login-username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {isError && <div className="error-message">Invalid password</div>}
        <button type="submit">Login</button>
      </form>

      <h3>Submitted Form Values</h3>
      <pre>{JSON.stringify(formValue, null, 2)}</pre>
    </div>
  );
}

export default Login;

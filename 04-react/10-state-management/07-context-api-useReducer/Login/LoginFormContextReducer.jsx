import { useContext } from "react";
import { LoginContextReducer } from "./LoginContextReducer";

function LoginFormContextReducer() {
const { state, dispatch } = useContext(LoginContextReducer);

async function handleLoginSubmit(event) {
event.preventDefault();


if (state.password.length < 6) {
  dispatch({
    type: "loginFailure",
    payload: "Password must be at least 6 characters",
  });
  return;
}

try {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: state.username,
      password: state.password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    dispatch({
      type: "loginFailure",
      payload: data.message || "Login failed",
    });
    return;
  }

  dispatch({
    type: "loginSuccess",
    payload: data,
  });
} catch (error) {
  dispatch({
    type: "loginFailure",
    payload: "Something went wrong. Please try again.",
  });
}


}

if (state.isLoggedIn) {
return ( <div> <h2>
Welcome {state.userData.firstName} {state.userData.lastName} </h2> </div>
);
}

return ( <div> <h2>Login</h2>


  <form onSubmit={handleLoginSubmit}>
    <div>
      <label>Username:</label>
      <input
        type="text"
        value={state.username}
        onChange={(event) =>
          dispatch({
            type: "setUsername",
            payload: event.target.value,
          })
        }
      />
    </div>

    <div>
      <label>Password:</label>
      <input
        type="password"
        value={state.password}
        onChange={(event) =>
          dispatch({
            type: "setPassword",
            payload: event.target.value,
          })
        }
      />
    </div>

    <button type="submit">Login</button>
  </form>

  {state.error && <p>{state.error}</p>}
</div>


);
}

export default LoginFormContextReducer;

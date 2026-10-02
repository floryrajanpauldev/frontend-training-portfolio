
import { useReducer } from "react";

const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  userData: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };

    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };

    case "loginSuccess":
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        error: null,
      };

    case "loginFailure":
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        error: action.payload,
      };

    default:
      return state;
  }
}

function LoginFormReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Front-end validation
    if (state.password.length < 6) {
      dispatch({
        type: "loginFailure",
        payload: "Password must be at least 6 characters",
      });

      return;
    }

    try {
      const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: state.username,
            password: state.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: "loginSuccess",
          payload: data,
        });
      } else {
        dispatch({
          type: "loginFailure",
          payload: data.message || "Login failed",
        });
      }
    } catch (error) {
      dispatch({
        type: "loginFailure",
        payload: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      {state.isLoggedIn && state.userData ? (
        <h3>
          Welcome {state.userData.firstName}{" "}
          {state.userData.lastName}
        </h3>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="username">Username:</label>

            <input
              id="username"
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
            <label htmlFor="password">Password:</label>

            <input
              id="password"
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

          {state.error && (
            <p style={{ color: "red" }}>
              {state.error}
            </p>
          )}

          <button type="submit">Login</button>
        </form>
      )}
    </>
  );
}

export default LoginFormReducer;

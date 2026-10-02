import { createContext, useReducer } from "react";

export const LoginContextReducer = createContext();

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

export function LoginContextReducerProvider({ children }) {
const [state, dispatch] = useReducer(reducer, initialState);

return (
<LoginContextReducer.Provider value={{ state, dispatch }}>
{children}
</LoginContextReducer.Provider>
);
}

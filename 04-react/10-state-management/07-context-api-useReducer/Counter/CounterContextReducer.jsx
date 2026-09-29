import { createContext, useReducer } from "react";

export const CounterContextReducer = createContext();

const initialState = {
count: 0,
increment: 2,
decrement: 2,
};

function reducer(state, action) {
switch (action.type) {
case "increment":
return {
...state,
count: state.count + state.increment,
};


case "decrement":
  return {
    ...state,
    count: state.count - state.decrement,
  };

case "reset":
  return {
    ...state,
    count: 0,
  };

default:
  return state;


}
}

export function CounterContextReducerProvider({ children }) {
const [state, dispatch] = useReducer(reducer, initialState);

return (
<CounterContextReducer.Provider value={{ state, dispatch }}>
{children}
</CounterContextReducer.Provider>
);
}

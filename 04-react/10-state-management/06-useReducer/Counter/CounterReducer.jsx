
import { useReducer } from "react";

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

function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Counter: {state.count}</h2>

      <button onClick={() => dispatch({ type: "increment" })}>
        Increment
      </button>

      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrement
      </button>

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </div>
  );
}

export default CounterReducer;

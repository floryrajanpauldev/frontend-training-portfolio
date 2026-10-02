import { useContext } from "react";
import { CounterContextReducer } from "./CounterContextReducer";

function HomeContextReducer() {
const { state, dispatch } = useContext(CounterContextReducer);

return ( <div> <h2>Counter: {state.count}</h2>


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

export default HomeContextReducer;

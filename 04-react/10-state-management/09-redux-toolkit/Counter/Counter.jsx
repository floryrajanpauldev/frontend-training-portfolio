import { useDispatch, useSelector } from "react-redux";

import {
  increment,
  decrement,
  incrementByAmount,
} from "./counterSlice";

import { updateName } from "./userSlice";

function Counter() {
  const dispatch = useDispatch();

  // Access state from the store
  const count = useSelector((state) => state.counter.value);
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Redux Toolkit Counter</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>

      <hr />

      <h2>User Name: {user.name}</h2>

      <button onClick={() => dispatch(updateName("Jane Marsh"))}>
        Update Name
      </button>
    </div>
  );
}

export default Counter;
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCountVal) => prevCountVal + 1);
  };

  const handleDecrement = () => {
    setCount((prevCountVal) => prevCountVal - 1);
  };

  const handleIncrementBy = (value) => {
    setCount((prevCountVal) => prevCountVal + value);
  };

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={handleIncrement}>
        Increment
      </button>

      <button onClick={handleDecrement}>
        Decrement
      </button>

      <button onClick={() => handleIncrementBy(5)}>
        Increment by 5
      </button>
    </div>
  );
}

export default Counter;
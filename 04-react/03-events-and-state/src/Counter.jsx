import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount((previousCount) => previousCount + 1);
  }

  function handleDecrement() {
    setCount((previousCount) => previousCount - 1);
  }

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default Counter;

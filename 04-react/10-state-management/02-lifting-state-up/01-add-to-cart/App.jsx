import { useState } from "react";
import Product from "./Product";
import DisplayCart from "./DisplayCart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Add to Cart</h1>

      <Product setCount={setCount} />

      <DisplayCart count={count} />
    </>
  );
}

export default App;
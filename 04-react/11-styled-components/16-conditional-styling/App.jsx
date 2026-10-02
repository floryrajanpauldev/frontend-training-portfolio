import { ProductPrice } from "./styled-css";

const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 50,
  },
  {
    id: 2,
    name: "Monitor",
    price: 150,
  },
  {
    id: 3,
    name: "Mouse",
    price: 100,
  },
];

function App() {
  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name}: </span>

          <ProductPrice $price={product.price}>
            ${product.price}
          </ProductPrice>
        </div>
      ))}
    </div>
  );
}

export default App;
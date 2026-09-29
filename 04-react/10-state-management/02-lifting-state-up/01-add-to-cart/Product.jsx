import AddToCartButton from "./AddToCartButton";

function Product({ setCount }) {
  return (
    <div>
      <h2>Product</h2>

      <p>Product is washable paints</p>

      <AddToCartButton setCount={setCount} />
    </div>
  );
}

export default Product;
function AddToCartButton({ setCount }) {
  const handleAddToCart = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
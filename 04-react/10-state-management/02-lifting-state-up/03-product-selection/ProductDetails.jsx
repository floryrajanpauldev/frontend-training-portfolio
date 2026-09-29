function ProductDetails({ selectedProduct }) {
  if (!selectedProduct) {
    return (
      <div>
        <h2>Product Details</h2>
        <p>Please select a product.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Product Details</h2>

      <h3>{selectedProduct.title}</h3>

      <p>{selectedProduct.description}</p>

      <p>Price: ${selectedProduct.price}</p>

      <p>Category: {selectedProduct.category}</p>

      <p>Brand: {selectedProduct.brand}</p>
    </div>
  );
}

export default ProductDetails;
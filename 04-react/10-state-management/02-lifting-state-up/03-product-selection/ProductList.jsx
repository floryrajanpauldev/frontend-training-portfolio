function ProductList({ productList, onProductChange }) {
  return (
    <div>
      <h2>Product List</h2>

      <select onChange={onProductChange}>
        <option value="">Choose a product</option>

        {productList.map((product) => (
          <option key={product.id} value={product.id}>
            {product.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductList;
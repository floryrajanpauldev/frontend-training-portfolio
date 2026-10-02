import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import { fetchProducts } from "./utils.js";

function App() {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async () => {
    const productsData = await fetchProducts();
    setProductList(productsData);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleProductChange = (event) => {
    const productID = parseInt(event.target.value);

    const optionSelectedProduct = productList.find(
      (p) => p.id === productID
    );

    setSelectedProduct(optionSelectedProduct);
  };

  return (
    <div>
      <h1>Product Selection</h1>

      <ProductList
        productList={productList}
        onProductChange={handleProductChange}
      />

      <ProductDetails selectedProduct={selectedProduct} />
    </div>
  );
}

export default App;
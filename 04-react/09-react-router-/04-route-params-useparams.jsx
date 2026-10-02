import { BrowserRouter, Link, Routes, Route, useParams } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();
  return <h2>Product ID: {productId}</h2>;
}

function ProductLinks() {
  return (
    <>
      <Link to="/products/101">Product 101</Link><br />
      <Link to="/products/202">Product 202</Link>
    </>
  );
}

export default function RouteParamsExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductLinks />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

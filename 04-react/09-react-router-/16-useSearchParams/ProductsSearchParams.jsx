import { useSearchParams } from "react-router";

const products = [
  { id: 1, title: "MacBook Air", category: "electronics", brand: "Apple", price: 999 },
  { id: 2, title: "iPhone 16", category: "electronics", brand: "Apple", price: 799 },
  { id: 3, title: "Galaxy Phone", category: "electronics", brand: "Samsung", price: 699 },
  { id: 4, title: "Running Shoes", category: "shoes", brand: "Nike", price: 120 },
];

function ProductsSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const sort = searchParams.get("sort") || "";

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category
      ? product.category === category
      : true;

    const matchesBrand = brand
      ? product.brand === brand
      : true;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  const updateParam = (name, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(name, value);
    else params.delete(name);

    setSearchParams(params);
  };

  return (
    <div>
      <h2>Products</h2>

      <input
        value={search}
        placeholder="Search products"
        onChange={(event) => updateParam("search", event.target.value)}
      />

      <select
        value={category}
        onChange={(event) => updateParam("category", event.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="shoes">Shoes</option>
      </select>

      <select
        value={brand}
        onChange={(event) => updateParam("brand", event.target.value)}
      >
        <option value="">All Brands</option>
        <option value="Apple">Apple</option>
        <option value="Samsung">Samsung</option>
        <option value="Nike">Nike</option>
      </select>

      <select
        value={sort}
        onChange={(event) => updateParam("sort", event.target.value)}
      >
        <option value="">Sort</option>
        <option value="price-asc">Price Low to High</option>
        <option value="price-desc">Price High to Low</option>
      </select>

      <button onClick={() => setSearchParams({})}>Clear</button>

      {sortedProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>
            {product.brand} | {product.category} | ${product.price}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProductsSearchParams;

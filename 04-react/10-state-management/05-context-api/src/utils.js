export const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products;
};


export const addProduct = async (product) => {
    const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error("Failed to add product");
    }

    return response.json();
};
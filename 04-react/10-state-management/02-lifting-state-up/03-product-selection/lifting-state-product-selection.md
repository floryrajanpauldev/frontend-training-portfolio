# Lifting State Up - Product Selection

## Scenario

In this example, we have:

* `ProductList` - displays a dropdown containing products.
* `ProductDetails` - displays the details of the selected product.
* `App` - the common parent that manages the shared state and related logic.

The component structure is:

```text
                    App
                  /     \
                 /       \
        ProductList    ProductDetails
             |
             ↓
       Product dropdown
```

`ProductList` and `ProductDetails` are sibling components.

The user selects a product from `ProductList`, but the selected product needs to be displayed in `ProductDetails`.

Therefore, we lift the state up to their common parent, `App`.

---

## Step 1: Fetch Products

We create a `fetchProducts()` function in `utils.js`.

The function fetches product data from:

```text
https://dummyjson.com/products
```

The API returns product information, including a `products` array.

Our utility function returns that array.

---

## Step 2: Manage the Product List in App

Since `App` is the common parent, we can keep the product list state in `App`:

```jsx
const [productList, setProductList] = useState([]);
```

We also fetch the products from `App`:

```jsx
const getProducts = async () => {
  const productsData = await fetchProducts();
  setProductList(productsData);
};
```

The API call is made when `App` mounts:

```jsx
useEffect(() => {
  getProducts();
}, []);
```

Now `App` owns the product list.

---

## Step 3: Pass the Product List to ProductList

The product list is passed to `ProductList` through props:

```jsx
<ProductList productList={productList} />
```

`ProductList` can then use the array to create the dropdown options.

```jsx
<select>
  <option value="">Choose a product</option>

  {productList.map((product) => (
    <option key={product.id} value={product.id}>
      {product.title}
    </option>
  ))}
</select>
```

Each option uses the product's `id` as its value.

---

## Step 4: Handle Product Selection in App

We also move the product selection handler to `App`.

```jsx
const handleProductChange = (event) => {
  const productID = parseInt(event.target.value);

  const optionSelectedProduct = productList.find(
    (p) => p.id === productID
  );

  setSelectedProduct(optionSelectedProduct);
};
```

Here:

1. We get the selected product ID from the `<select>`.
2. We convert the value from a string to a number using `parseInt()`.
3. We use `find()` to locate the complete product object.
4. We store the selected product in `selectedProduct` state.

---

## Step 5: Pass the Handler to ProductList

`App` passes the handler to `ProductList`:

```jsx
<ProductList
  productList={productList}
  onProductChange={handleProductChange}
/>
```

`ProductList` attaches the handler to the `<select>`:

```jsx
<select onChange={onProductChange}>
```

When the user selects a product, the event is sent back to the handler in `App`.

---

## Step 6: Store the Selected Product

`App` owns the selected product state:

```jsx
const [selectedProduct, setSelectedProduct] = useState(null);
```

When the user selects a product:

```jsx
setSelectedProduct(optionSelectedProduct);
```

The selected product is now stored in `App`.

---

## Step 7: Pass the Selected Product to ProductDetails

Finally, `App` passes the selected product to `ProductDetails`:

```jsx
<ProductDetails selectedProduct={selectedProduct} />
```

`ProductDetails` can then display the selected product information.

---

# Complete Data Flow

```text
                     App
                      |
        ┌─────────────┴─────────────┐
        ↓                           ↓
   productList               selectedProduct
        |                           |
        ↓                           ↓
 ProductList                ProductDetails
        |
        ↓
   <select>
        |
   User selects
        |
        ↓
 handleProductChange()
        |
        ↓
 Find selected product
        |
        ↓
 setSelectedProduct()
        |
        ↓
        App
        |
        ↓
 ProductDetails
```

---

# Why Are We Lifting State Up?

`ProductList` and `ProductDetails` are sibling components.

The selected product needs to move from `ProductList` to `ProductDetails`.

Instead of trying to communicate directly between sibling components, we move the state and related logic to their common parent, `App`.

`App` now:

* Owns `productList`.
* Fetches the products.
* Owns `selectedProduct`.
* Owns `handleProductChange`.
* Passes `productList` to `ProductList`.
* Passes `handleProductChange` to `ProductList`.
* Passes `selectedProduct` to `ProductDetails`.

---

# Important Concept

Lifting state up is not limited to moving only the `useState()` declaration.

When appropriate, we can also move the **state-related logic and handler functions** to the common parent.

In this example, `App` owns:

```jsx
const [productList, setProductList] = useState([]);

const [selectedProduct, setSelectedProduct] = useState(null);
```

and the related logic:

```jsx
const getProducts = async () => {
  const productsData = await fetchProducts();
  setProductList(productsData);
};

const handleProductChange = (event) => {
  const productID = parseInt(event.target.value);

  const optionSelectedProduct = productList.find(
    (p) => p.id === productID
  );

  setSelectedProduct(optionSelectedProduct);
};
```

This keeps the shared state and its related logic in the common parent.

---

# Key Takeaway

> **When sibling components need to share state, move the state to their closest common parent.**

The parent can then pass:

* State/data down to child components.
* Handler functions down to child components.
* Updated state to other child components.

In this example:

```text
App
 ↓
owns the state and logic
 ↓
ProductList → user selects a product
 ↓
App updates selectedProduct
 ↓
ProductDetails displays the selected product
```

This is the third example of **Lifting State Up**.

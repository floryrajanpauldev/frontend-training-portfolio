# Route Parameters and useParams

A route parameter represents a dynamic part of the URL.

```jsx
<Route path="/products/:productId" element={<ProductDetails />} />
```

For `/products/101`:

```jsx
const { productId } = useParams();
```

`productId` is `"101"` because URL parameters are strings.

Route parameters are useful when a page needs to identify a particular resource.

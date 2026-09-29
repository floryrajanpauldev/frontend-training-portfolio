import { useContext } from "react";
import ProductContext from "./store/ProductContext";

const ProductDetails = () => {
    const { products } = useContext(ProductContext);

    return (
        <div>
            <h2>Product Details</h2>

            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductDetails;
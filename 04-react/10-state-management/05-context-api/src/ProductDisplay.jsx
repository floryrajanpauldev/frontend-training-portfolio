import { useContext } from "react";
import ProductContext from "./store/ProductContext";

const ProductDisplay = () => {
    const { products } = useContext(ProductContext);

    return (
        <div>
            <h2>Product Display</h2>

            {products.map((product) => (
                <p key={product.id}>
                    {product.title}
                </p>
            ))}
        </div>
    );
};

export default ProductDisplay;
import { useContext, useState } from "react";
import ProductContext from "./store/ProductContext";

const AddProduct = () => {
    const { addProduct } = useContext(ProductContext);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProduct = {
            title,
            price: Number(price)
        };

        await addProduct(newProduct);

        setTitle("");
        setPrice("");
    };

    return (
        <div>
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </div>

                <button type="submit">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
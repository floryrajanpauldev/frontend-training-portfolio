import { createContext, useEffect, useState } from "react";
import { fetchProducts, addProduct as addProductAPI } from "../utils";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };

        getProducts();


        
    }, []);

    const addProduct = async (newProduct) => {
        try {
            const product = await addProductAPI(newProduct);

            setProducts((previousProducts) => [
                ...previousProducts,
                product
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const contextValue = {
        products,
        addProduct
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
import { NameProvider } from "./store/indexContext";
import { CounterProvider } from "./store/CounterContext";

import Home from "./Home";
import CounterDisplay from "./CounterDisplay";
import CounterButtons from "./CounterButtons";

import { ProductProvider } from "./store/ProductContext";
import ProductDisplay from "./ProductDisplay";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct";

const App = () => {
    return (
        <ProductProvider>

            <NameProvider>
                <CounterProvider>
                    <Home />

                    <CounterDisplay />
                    <CounterButtons />
                    <AddProduct />
                    <ProductDisplay />
                    <ProductDetails />
                </CounterProvider>
            </NameProvider>
        </ProductProvider>

    );
};

export default App;
import { ShoppingCartProvider } from "./ShoppingCartContextReducer";
import ShoppingCartContextReducerDemo from "./ShoppingCartContextReducerDemo";

function App() {
return ( <ShoppingCartProvider> <ShoppingCartContextReducerDemo /> </ShoppingCartProvider>
);
}

export default App;

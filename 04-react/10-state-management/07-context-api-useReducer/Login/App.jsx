import { LoginContextReducerProvider } from "./LoginContextReducer";
import LoginFormContextReducer from "./LoginFormContextReducer";

function App() {
return ( <LoginContextReducerProvider> <LoginFormContextReducer /> </LoginContextReducerProvider>
);
}

export default App;

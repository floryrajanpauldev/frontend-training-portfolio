import { CounterContextReducerProvider } from "./CounterContextReducer";
import HomeContextReducer from "./HomeContextReducer";

function App() {
return ( <CounterContextReducerProvider> <HomeContextReducer /> </CounterContextReducerProvider>
);
}

export default App;

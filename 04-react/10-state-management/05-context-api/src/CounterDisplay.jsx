import { useContext } from "react";
import CounterContext from "./store/CounterContext";

const CounterDisplay = () => {
    const { count } = useContext(CounterContext);

    return (
        <div>
            <h2>Counter</h2>
            <p>Count: {count}</p>
        </div>
    );
};

export default CounterDisplay;
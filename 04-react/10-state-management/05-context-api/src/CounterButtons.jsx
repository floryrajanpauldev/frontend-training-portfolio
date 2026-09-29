import { useContext } from "react";
import CounterContext from "./store/CounterContext";

const CounterButtons = () => {
    const { incrementCount, decrementCount } = useContext(CounterContext);

    return (
        <div>
            <button onClick={incrementCount}>
                Increment
            </button>

            <button onClick={decrementCount}>
                Decrement
            </button>
        </div>
    );
};

export default CounterButtons;
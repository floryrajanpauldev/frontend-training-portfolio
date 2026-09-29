import { createContext, useState } from "react";

const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount((previousValue) => previousValue + 1);
    };

    const decrementCount = () => {
        setCount((previousValue) => previousValue - 1);
    };

    const allValues = {
        count,
        incrementCount,
        decrementCount
    };

    return (
        <CounterContext.Provider value={allValues}>
            {children}
        </CounterContext.Provider>
    );
};

export default CounterContext;
import { useDispatch, useSelector } from "react-redux";

import {
    increment,
    decrement,
    incrementByAmount
} from "./Action/action";

function Counter() {
    const count = useSelector((state) => state.counter.count);

    const dispatch = useDispatch();

    return (
        <>
            <h2>Counter</h2>

            <h3>{count}</h3>

            <button onClick={() => dispatch(increment())}>
                Increment
            </button>

            <button onClick={() => dispatch(decrement())}>
                Decrement
            </button>

            <button onClick={() => dispatch(incrementByAmount(5))}>
                Increment by 5
            </button>
        </>
    );
}

export default Counter;
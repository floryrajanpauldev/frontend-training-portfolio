export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const INCREMENT_BY_AMOUNT = "INCREMENT_BY_AMOUNT";

export const increment = () => ({
    type: INCREMENT
});

export const decrement = () => ({
    type: DECREMENT
});

export const incrementByAmount = (amount) => ({
    type: INCREMENT_BY_AMOUNT,
    payload: amount
});
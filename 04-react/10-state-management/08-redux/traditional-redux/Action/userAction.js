export const SET_USER = "SET_USER";

export const setUser = (name) => ({
    type: SET_USER,
    payload: {
        name
    }
});
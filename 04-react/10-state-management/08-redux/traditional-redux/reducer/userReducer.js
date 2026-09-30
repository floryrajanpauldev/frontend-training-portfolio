import { SET_USER } from "../Action/userAction";

const initialState = {
    name: "Guest"
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                name: action.payload.name
            };

        default:
            return state;
    }
};
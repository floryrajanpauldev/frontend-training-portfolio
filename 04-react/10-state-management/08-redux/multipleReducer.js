import { combineReducers } from "redux";

import { counterReducer } from "./reducer/counterReducer";
import { userReducer } from "./reducer/userReducer";

const multipleReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
});

export default multipleReducer;
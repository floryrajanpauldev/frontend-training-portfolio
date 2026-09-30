import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import multipleReducer from "./traditional-redux/multipleReducer";

const store = createStore(multipleReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducers/index.js";

const store = configureStore(
	{ reducer },
	compose(applyMiddleware(thunk)),
	typeof window === "object" &&
		typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: (f) => f,
);

export default store;

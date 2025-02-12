import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import postReducer from "./postSlice";

const store = configureStore({
    reducer: {
        auth: userReducer,
        post: postReducer,
    }
})

export default store;

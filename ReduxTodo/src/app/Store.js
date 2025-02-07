import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../Feature/Todo/TodoSlice";

export const Store = configureStore({
    reducer: reducers,
})

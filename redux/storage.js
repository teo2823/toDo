import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import imageSlice from "./imageSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    image: imageSlice,
  },
});

import productReducer from "./product";
import usersReducer from "./users";
import categoryReducer from "./category";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  product: productReducer,
  users: usersReducer,
  category: categoryReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    categoryRequeted: (state) => {
      state.isLoading = true;
    },
    categoryReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    categoryRequestFild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: categoryReducer, actions } = categorySlice;
export const { categoryRequeted, categoryReceved, categoryRequestFild } =
  actions;

export default categoryReducer;

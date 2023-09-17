import { createSlice } from "@reduxjs/toolkit";
import httpService from "../services/http.service";
import { isDate } from "../utils/date";
import productService from "../services/product.service";

const productSlice = createSlice({
  name: "products",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    productsRequeted: (state) => {
      state.isLoading = true;
    },
    productsReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    productsRequestFild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: productReducer, actions } = productSlice;
const { productsRequeted, productsReceved, productsRequestFild } = actions;

export const loadProductsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().product;
  if (isDate(lastFetch)) {
    dispatch(productsRequeted);
    try {
      const { list } = await productService.fetchAll();
      dispatch(productsReceved(list));
    } catch (error) {
      dispatch(productsRequestFild(error.message));
    }
  }
};
export const getProducts = () => (state) => state.product.entities;
export const getProductsStatus = () => (state) => state.product.isLoading;

export default productReducer;

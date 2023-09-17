/* eslint-disable react/prop-types */

import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import { generetaAuthError } from "../utils/generateAuthError";
import history from "../utils/history";
import authServises from "../services/auth.serves";

const initialState = localStorageService.getAccessToken()
  ? {
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
    }
  : {
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      console.log(action);
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const { authRequestFailed, authRequestSuccess, userLoggedOut } = actions;

const authRequested = createAction("users/authRequested");
// const userUpdateFailed = createAction("users/userUpdateFailed");
// const userUpdateRequested = createAction("users/userUpdateRequested");

export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authServises.login({ email, password });

      localStorageService.setTokens(data);
      dispatch(
        authRequestSuccess({ userId: data.userId, user: data.exitingUser })
      );
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authServises.register(payload);
    localStorageService.setTokens(data);
    console.log("signUp", data);
    dispatch(authRequestSuccess({ userId: data.userId, user: data.newUser }));
    history.push("/");
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUser = () => (state) => state.users.auth?.user;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReducer;

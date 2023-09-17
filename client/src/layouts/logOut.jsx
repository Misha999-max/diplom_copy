/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { logOut } from "../store/users";
import { useDispatch } from "react-redux";
const LogOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  return <h1>Loading</h1>;
};

export default LogOut;

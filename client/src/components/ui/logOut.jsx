import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/users";

const LogOut = () => {
  const dispatch = useDispatch();
  dispatch(logOut());
  return <h1>Loading</h1>;
};

export default LogOut;

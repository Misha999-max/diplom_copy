/* eslint-disable react/prop-types */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRoute;

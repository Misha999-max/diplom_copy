/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import "./App.css";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/main";
import ContactPage from "./components/page/contact";
import AddressPage from "./components/page/address";
import NotFaundPage from "./components/page/notFaund";
import HeaderComponent from "./components/header";
import Login from "./layouts/login";
import AppLoader from "./components/ui/hoc/appLoader";
import Card from "./components/carts";

import ProtectedRoute from "./components/common/protectedRoute";
import BasketUserPage from "./components/page/basketUserPage";
import LogOut from "./components/ui/logOut";
import Footer from "./components/footer";

function App() {
  return (
    <AppLoader>
      <HeaderComponent />
      <Switch>
        <ProtectedRoute path="/main/:userId?" component={MainPage} />
        <Route path="/basketUser" component={BasketUserPage} />
        <Route path="/cartItem/:itemId?" component={Card} />
        <Route path="/contakt" component={ContactPage} />
        <Route path="/Address/:id?" component={AddressPage} />
        <Route path="/login/:id?" component={Login} />
        <Route path="/logout" component={LogOut} />
        <Route path="/" exact component={MainPage} />
        <Route component={NotFaundPage} />
      </Switch>
      <Footer />
    </AppLoader>
  );
}

export default App;

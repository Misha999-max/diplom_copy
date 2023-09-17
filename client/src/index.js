/* eslint-disable react/prop-types */

import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "./store/createStore";
import history from "./utils/history";
import { Router } from "react-router-dom/cjs/react-router-dom.min";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router history={history}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);

reportWebVitals();

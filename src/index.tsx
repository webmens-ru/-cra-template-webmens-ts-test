import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { OpenSans, ResetStyles } from "@webmens-ru/ui_lib";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ResetStyles />
      <OpenSans/>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { GlobalStyles } from "./assets/globalStyle";
import { ResetStyles } from "@webmens-ru/ui_lib"


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ResetStyles />
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

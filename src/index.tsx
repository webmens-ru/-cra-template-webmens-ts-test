import { ResetStyles } from "@webmens-ru/ui_lib";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import { PRINT_FRAME_NAME } from "./app/utils/print";
import { GlobalStyles } from "./assets/globalStyle";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ResetStyles />
      <GlobalStyles />
      <App />
      <iframe name={PRINT_FRAME_NAME} title={PRINT_FRAME_NAME} src="about:blank" frameBorder="0" />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

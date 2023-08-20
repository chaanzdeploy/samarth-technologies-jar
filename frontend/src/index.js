import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import { SnackbarProvider } from "notistack";
import reportWebVitals from "./reportWebVitals";
import { NOTIFICATIONS_STACK_SIZE } from "./utils/constants";

ReactDOM.render(
  // <React.StrictMode>
    <SnackbarProvider maxSnack={NOTIFICATIONS_STACK_SIZE}>
      <App />
    </SnackbarProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

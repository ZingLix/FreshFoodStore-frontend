import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, BrowserRouter } from "react-router-dom";
import App from "./App";
import { createBrowserHistory } from "history";
import "./index.css";

export const bhistory = createBrowserHistory();
ReactDOM.render(
  <Router history={bhistory}>
    <App />
  </Router>,
  document.getElementById("root") as HTMLElement
);

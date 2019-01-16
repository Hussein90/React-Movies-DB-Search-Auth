import React from "react";
import ReactDOM from "react-dom";
import Demo from "./demo";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./fire";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <CssBaseline />
      <Demo />
    </React.Fragment>
  </BrowserRouter>,
  document.querySelector("#root")
);

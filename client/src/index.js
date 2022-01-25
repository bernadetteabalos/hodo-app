import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/css/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentUserProvider from "./providers/UserProvider";
import { BrowserRouter as Router } from "react-router-dom";
import NavProvider from "./providers/NavProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CurrentUserProvider>
        <NavProvider>
          <App />
        </NavProvider>
      </CurrentUserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

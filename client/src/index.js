import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/css/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentUserProvider from "./providers/UserProvider";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

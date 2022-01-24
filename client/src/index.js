import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/css/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentUserProvider from "./providers/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

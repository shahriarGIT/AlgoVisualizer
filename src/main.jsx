import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ControlProvider from "./Context/controller-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ControlProvider>
    <App />
  </ControlProvider>
);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
  </Router>
);

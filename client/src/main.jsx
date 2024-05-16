import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Modal from "react-modal";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

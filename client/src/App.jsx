import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import axios from "axios";

if (import.meta.env.VITE_ENV === "production") {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
} else {
  axios.defaults.baseURL = import.meta.env.VITE_LOCALBASE_URL;
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route index path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;

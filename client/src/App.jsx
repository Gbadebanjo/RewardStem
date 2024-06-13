import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import axios from "axios";
import Transaction from "./pages/Transaction";
import VehicleTypeForm from './pages/VehicleTypeForm';
import VehicleTypeList from './pages/VehicleTypeList';
import VehicleForm from './pages/VehicleForm';
import Zone from './pages/Zone';
import AdminDashboard from './pages/AdminDashboard';

if (import.meta.env.VITE_ENV === "production") {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
} else {
  axios.defaults.baseURL = import.meta.env.VITE_LOCALBASE_URL;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/vehicleform" element={<VehicleTypeForm />} />
        <Route path="/form" element={<VehicleForm />} />
        <Route path="/list" element={<VehicleTypeList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  padding-left: 5px;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 14px;
`;

const Inputfield = styled.input`
  border-radius: 5px;
  border: 1px solid #008080;
`;

const Button = styled.button`
  background-color: #008080;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #005050;
  }
`;

const VehicleForm = () => {
  const [vehicleType, setVehicleType] = useState({
    className: "",
    requirements: ""
  });

  const [serviceClass, setServiceClass] = useState({
    className: "",
    requirements: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { vehicleId } = useParams(); // Fetching vehicleId from URL params

  useEffect(() => {
    if (vehicleId) {
      const fetchVehicleType = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/admins/vehicleClass/${vehicleId}`);
          setVehicleType(response.data);
        } catch (err) {
          const errorMsg = err.response?.data?.message || err.message;
          toast.error(errorMsg);
          setError(errorMsg);
        }
      };
      fetchVehicleType();
    }
  }, [vehicleId]);

  const handleVehicleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleType({ ...vehicleType, [name]: value });
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceClass({ ...serviceClass, [name]: value });
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formattedData = {
        className: vehicleType.className,
        requirements: vehicleType.requirements
      };

      if (vehicleId) {
        await axios.put(`http://localhost:5000/api/admins/vehicleClass/${vehicleId}`, formattedData);
        toast.success("Vehicle Class Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/api/admins/vehicleClass/create", formattedData);
        toast.success("Vehicle Class Created Successfully");
      }
      navigate("/"); // Navigate back to AdminDashboard after form submission
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      toast.error(errorMsg);
      setError(errorMsg);
    }
    setIsLoading(false);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formattedData = {
        className: serviceClass.className,
        requirements: serviceClass.requirements
      };

      await axios.post("http://localhost:5000/api/admins/serviceClass/create", formattedData);
      toast.success("Service Class Created Successfully");
      navigate("/"); // Navigate back to AdminDashboard after form submission
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      toast.error(errorMsg);
      setError(errorMsg);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ color: "#008080", padding: "20px", height: "100vh" }}>
      <h2>{vehicleId ? "Edit Vehicle Class" : "Create Vehicle Class"}</h2>
      <ToastContainer />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div style={{ backgroundColor: "#f7f7f7", height: "80vh", display: "flex", flexDirection: "row" }}>
          <form
            onSubmit={handleVehicleSubmit}
            style={{ color: "#008080", display: "flex", flexDirection: "column", padding: "10px", width: "25%" }}
          >
            <h5>Vehicle Class</h5>
            <LabelContainer>
              <Label>Class Name:</Label>
              <Inputfield
                type="text"
                name="className"
                value={vehicleType.className}
                onChange={handleVehicleInputChange}
                required
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Requirements:</Label>
              <Inputfield
                type="text"
                name="requirements"
                value={vehicleType.requirements}
                onChange={handleVehicleInputChange}
                required
              />
            </LabelContainer>
            <Button type="submit">{vehicleId ? "Update" : "Create"}</Button>
          </form>

          <form
            onSubmit={handleServiceSubmit}
            style={{ color: "#008080", display: "flex", flexDirection: "column", padding: "10px", width: "25%" }}
          >
            <h5>Service Class</h5>
            <LabelContainer>
              <Label>Class Name:</Label>
              <Inputfield
                type="text"
                name="className"
                value={serviceClass.className}
                onChange={handleServiceInputChange}
                required
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Requirements:</Label>
              <Inputfield
                type="text"
                name="requirements"
                value={serviceClass.requirements}
                onChange={handleServiceInputChange}
                required
              />
            </LabelContainer>
            <Button type="submit">Create Service Class</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VehicleForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

const VehicleForm = ({ vehicleTypeId, onSave }) => {
  const [vehicleType, setVehicleType] = useState({
    vehicleName: "",
    baseFare: 0,
    costPerMinute: 0,
    costPerMile: 0,
    hourlyRate: 0,
    surgeMultiplier: 1,
    additionalFees: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (vehicleTypeId) {
      const fetchVehicleType = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/vehicle-types/${vehicleTypeId}`);
          setVehicleType(response.data);
        } catch (err) {
          const errorMsg = err.response?.data?.message || err.message;
          toast.error(errorMsg);
          setError(errorMsg);
        }
      };
      fetchVehicleType();
    }
  }, [vehicleTypeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleType({ ...vehicleType, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formattedData = {
        vehicleName: vehicleType.vehicleName,
        baseFare: parseInt(vehicleType.baseFare),
        costPerMinute: parseInt(vehicleType.costPerMinute),
        costPerMile: parseInt(vehicleType.costPerMile),
        hourlyRate: parseInt(vehicleType.hourlyRate),
        surgeMultiplier: parseInt(vehicleType.surgeMultiplier),
        additionalFees: parseInt(vehicleType.additionalFees),
      };

      if (vehicleTypeId) {
        await axios.put(`http://localhost:5000/api/vehicle-types/${vehicleTypeId}`, formattedData);
        toast.success("Vehicle Type Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/api/admins/vehicleType/create", formattedData);
        toast.success("Vehicle Type Created Successfully");
        }
      navigate("/");

      if (onSave) {
        onSave();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      toast.error(errorMsg);
      setError(errorMsg);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ color: "#008080", padding: "20px", height: "100vh" }}>
      <h2>{vehicleTypeId ? "Edit Vehicle Type" : "Create Vehicle Type"}</h2>
      <ToastContainer />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div
          style={{
            backgroundColor: "#f7f7f7",
            height: "80vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              color: "#008080",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              width: "25%",
            }}
          >
            <h5>Vehicle Instructions</h5>
            <LabelContainer>
              <Label>Vehicle Name:</Label>
              <Inputfield
                type="text"
                name="vehicleName"
                value={vehicleType.vehicleName}
                onChange={handleInputChange}
                required
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Base Fare:</Label>
              <Inputfield
                type="number"
                name="baseFare"
                value={vehicleType.baseFare}
                onChange={handleInputChange}
                required
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Cost Per Mile:</Label>
              <Inputfield
                type="number"
                name="costPerMile"
                value={vehicleType.costPerMile}
                onChange={handleInputChange}
                required
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Cost Per Minute:</Label>
              <Inputfield
                type="number"
                name="costPerMinute"
                value={vehicleType.costPerMinute}
                onChange={handleInputChange}
                required
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Hourly Rate:</Label>
              <Inputfield
                type="number"
                name="hourlyRate"
                value={vehicleType.hourlyRate}
                onChange={handleInputChange}
                required
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Surge Multiplier:</Label>
              <Inputfield
                type="number"
                name="surgeMultiplier"
                value={vehicleType.surgeMultiplier}
                onChange={handleInputChange}
                required
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Additional Fees:</Label>
              <Inputfield
                type="number"
                name="additionalFees"
                value={vehicleType.additionalFees}
                onChange={handleInputChange}
                required
              />
            </LabelContainer>

            <Button type="submit">{vehicleTypeId ? "Update" : "Create"}</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VehicleForm;

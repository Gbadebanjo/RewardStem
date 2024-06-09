import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { debounce } from "lodash";

// Configure Leaflet's default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
`;

const VehicleTypeForm = ({ vehicleTypeId, onSave }) => {
  const [vehicleType, setVehicleType] = useState({
    name: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    baseFare: 0,
    costPerMinute: 0,
    costPerMile: 0,
    hourlyRate: 0,
    surgeMultiplier: 1,
    additionalFees: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [polygon, setPolygon] = useState(null);

  useEffect(() => {
    if (vehicleTypeId) {
      const fetchVehicleType = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `/api/vehicle-types/${vehicleTypeId}`
          );
          setVehicleType(response.data);
          setLocationName(""); // You can update this to fetch the location name if available
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      };
      fetchVehicleType();
    }
  }, [vehicleTypeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleType({ ...vehicleType, [name]: value });
  };

  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };

  const geocodeLocation = async (location) => {
    const apiKey = "AIzaSyBpv5y0SbiP8_8_yFLqbFygeotsg-kmfbI";
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${apiKey}`
    );
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return [lat, lng];
    }
    throw new Error("Location not found");
  };

  const getBoundingBox = async (location) => {
    const apiKey = "AIzaSyBpv5y0SbiP8_8_yFLqbFygeotsg-kmfbI";
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${apiKey}`
    );
    if (response.data.results.length > 0) {
      const bounds = response.data.results[0].geometry.bounds;
      const northEast = [bounds.northeast.lat, bounds.northeast.lng];
      const southWest = [bounds.southwest.lat, bounds.southwest.lng];
      return [
        [northEast[0], northEast[1]],
        [southWest[0], northEast[1]],
        [southWest[0], southWest[1]],
        [northEast[0], southWest[1]],
      ];
    }
    throw new Error("Bounding box not found");
  };


    const fetchCoordinates = async () => {
      if (locationName) {
        try {
          const coordinates = await geocodeLocation(locationName);
          const polygonCoords = await getBoundingBox(locationName);
          setVehicleType((prev) => ({
            ...prev,
            location: {
              type: "Point",
              coordinates,
            },
          }));
          setPolygon(polygonCoords);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    const debouncedGeocodeLocation = useCallback(
      debounce((location) => fetchCoordinates(location), 1500),
      []
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (vehicleTypeId) {
        await axios.put(`/api/vehicle-types/${vehicleTypeId}`, vehicleType);
      } else {
        console.log(vehicleType)
        await axios.post(
          "127.0.0.1:5000/api/admins/vehicleType/create",
          vehicleType
        );
      }
      onSave();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ color: "#008080", padding: "20px", height: "100vh" }}>
      <h2>{vehicleTypeId ? "Edit Vehicle Type" : "Create Vehicle Type"}</h2>
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
                name="name"
                value={vehicleType.name}
                onChange={handleInputChange}
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Location Name:</Label>
              <Inputfield
                type="text"
                name="locationName"
                value={locationName}
                onChange={handleLocationNameChange}
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Base Fare:</Label>
              <Inputfield
                type="number"
                name="baseFare"
                value={vehicleType.baseFare}
                onChange={handleInputChange}
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Cost Per Mile:</Label>
              <Inputfield
                type="number"
                name="costPerMile"
                value={vehicleType.costPerMile}
                onChange={handleInputChange}
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Cost Per Minute:</Label>
              <Inputfield
                type="number"
                name="costPerMinute"
                value={vehicleType.costPerMinute}
                onChange={handleInputChange}
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Hourly Rate:</Label>
              <Inputfield
                type="number"
                name="hourlyRate"
                value={vehicleType.hourlyRate}
                onChange={handleInputChange}
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Surge Multiplier:</Label>
              <Inputfield
                type="number"
                name="surgeMultiplier"
                value={vehicleType.surgeMultiplier}
                onChange={handleInputChange}
              />
            </LabelContainer>
            <LabelContainer>
              <Label>Additional Fees:</Label>
              <Inputfield
                type="number"
                name="additionalFees"
                value={vehicleType.additionalFees}
                onChange={handleInputChange}
              />
            </LabelContainer>
  
            <Button type="submit">{vehicleTypeId ? "Update" : "Create"}</Button>
          </form>
          <div style={{ flex: 1, padding: "10px" }}>
            <h5>Map</h5>
            <MapContainer
              center={
                vehicleType.location.coordinates[0] !== 0
                  ? vehicleType.location.coordinates
                  : [9.020, 8.6753]
              }
              zoom={7}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              {vehicleType.location.coordinates[0] !== 0 && (
                <Marker position={vehicleType.location.coordinates}></Marker>
              )}
              {polygon && <Polygon positions={polygon} color="red" />}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default VehicleTypeForm;

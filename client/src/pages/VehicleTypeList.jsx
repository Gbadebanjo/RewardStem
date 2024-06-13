import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const VehicleTypeList = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/vehicle-types');
        setVehicleTypes(response.data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    fetchVehicleTypes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/vehicle-types/${id}`);
      setVehicleTypes(vehicleTypes.filter((vt) => vt._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Vehicle Types</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {vehicleTypes.map((vt) => (
            <li key={vt._id}>
              {vt.name}
              <button onClick={() => handleDelete(vt._id)}>Delete</button>
              <button>Edit</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">
      <button >Add New Vehicle Type</button></Link>
    </div>
  );
};

export default VehicleTypeList;

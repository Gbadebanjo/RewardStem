import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// Styled Components
const Container = styled.div`
  padding: 20px;
  color: #008080;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Loading = styled.div`
  font-size: 18px;
  color: #008080;
`;

const Error = styled.div`
  font-size: 18px;
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CreateButton = styled.button`
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

const ActionIcon = styled.span`
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    color: #FF3E20;
  }
`;

// AdminDashboard Component
const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vehicleResponse, zoneResponse] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/admins/vehicleType/getAll'),
          axios.get('http://127.0.0.1:5000/api/admins/zones')
        ]);
        setVehicles(vehicleResponse.data.vehicleTypes); // Assuming vehicleTypes array from vehicleResponse
        setZones(zoneResponse.data.data); // Set zones array from zoneResponse data
      } catch (err) {
        setError(err.message);
        toast.error('Error fetching data');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDeleteVehicle = async (vehicleTypeId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/admins/vehicleType/${vehicleTypeId}`);
      toast.success("Vehicle Type Deleted Successfully");
      // After successful deletion, update the vehicle types list
      fetchVehicleTypes();
    } catch (error) {
      console.error(`Error deleting vehicle type ${vehicleTypeId}:`, error);
      toast.error("Failed to delete vehicle type");
    }
  };

  const handleDeleteZone = async (zoneId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/admins/zones/${zoneId}`);
      toast.success("Zone Deleted Successfully");
      // After successful deletion, update the zones list
      fetchZones();
    } catch (error) {
      console.error(`Error deleting zone ${zoneId}:`, error);
      toast.error("Failed to delete zone");
    }
  };

  const fetchVehicleTypes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/admins/vehicleType/getAll');
      setVehicles(response.data.vehicleTypes);
    } catch (error) {
      console.error('Error fetching vehicle types:', error);
      toast.error('Failed to fetch vehicle types');
    }
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/admins/zones');
      setZones(response.data.data);
    } catch (error) {
      console.error('Error fetching zones:', error);
      toast.error('Failed to fetch zones');
    }
  };

  // Ensure zones is initialized as an array before mapping
  const renderZones = () => {
    if (!Array.isArray(zones)) {
      return (
        <Error>
          Error fetching zones data.
        </Error>
      );
    }
    return (
      <Section>
        <h3>All Zones</h3>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Latitude</Th>
              <Th>Longitude</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {zones.map(zone => (
              <tr key={zone._id}>
                <Td>{zone.name}</Td>
                <Td>{zone.location}</Td>
                <Td>{zone.geometry.coordinates[1]}</Td>
                <Td>{zone.geometry.coordinates[0]}</Td>
                <Td>
                  <ActionIcon onClick={() => handleDeleteZone(zone._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionIcon>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    );
  };

  // Ensure vehicles is initialized as an array before mapping
  const renderVehicles = () => {
    if (!Array.isArray(vehicles)) {
      return (
        <Error>
          Error fetching vehicles data.
        </Error>
      );
    }
    return (
      <Section>
        <h3>All Vehicles</h3>
        <Table>
          <thead>
            <tr>
              <Th>Vehicle ID</Th>
              <Th>Vehicle Name</Th>
              <Th>Description</Th>
              
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle._id}>
                <Td>{vehicle._id}</Td>
                <Td>{vehicle.vehicleType}</Td>
                <Td>{vehicle.description}</Td>       
                <Td>
                  {/* <Link to={`/form/${vehicle._id}`}>
                    <ActionIcon>
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionIcon>
                  </Link> */}
                  <ActionIcon onClick={() => handleDeleteVehicle(vehicle._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionIcon>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    );
  };

  return (
    <Container>
      <ToastContainer />
      <Title>Admin Dashboard</Title>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <>
          <ButtonContainer>
            <Link to="/zone">
              <CreateButton>Create New Zone</CreateButton>
            </Link>
            <Link to="/form">
              <CreateButton>Create New Vehicle</CreateButton>
            </Link>
          </ButtonContainer>
          {renderVehicles()}
          {renderZones()}
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;

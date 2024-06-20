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
  const [serviceClasses, setServiceClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vehicleResponse, zoneResponse, serviceClassResponse] = await Promise.all([
        axios.get('http://127.0.0.1:5000/api/admins/vehicleClass/getAll'),
        axios.get('http://127.0.0.1:5000/api/admins/zones'),
        axios.get('http://127.0.0.1:5000/api/admins/serviceClass/getAll'),
      ]);
      setVehicles(vehicleResponse.data.vehicleClasses); // Assuming vehicleClasses array from vehicleResponse
      setZones(zoneResponse.data.data); // Set zones array from zoneResponse data
      setServiceClasses(serviceClassResponse.data.serviceClasses); // Set serviceClasses array from serviceClassResponse data
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error('Error fetching data');
    }
    setLoading(false);
  };

  const handleDeleteVehicle = async (classId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/admins/vehicleClass/${classId}`);
      toast.success("Vehicle Type Deleted Successfully");
      // Refresh vehicle types after deletion
      fetchData();
    } catch (error) {
      console.error(`Error deleting vehicle type ${classId}:`, error);
      toast.error("Failed to delete vehicle type");
    }
  };

  const handleDeleteZone = async (zoneId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/admins/zones/${zoneId}`);
      toast.success("Zone Deleted Successfully");
      // Refresh zones after deletion
      fetchData();
    } catch (error) {
      console.error(`Error deleting zone ${zoneId}:`, error);
      toast.error("Failed to delete zone");
    }
  };

  const handleDeleteServiceClass = async (classId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/admins/serviceClass/${classId}`);
      toast.success("Service Class Deleted Successfully");
      // Refresh service classes after deletion
      fetchData();
    } catch (error) {
      console.error(`Error deleting service class ${classId}:`, error);
      toast.error("Failed to delete service class");
    }
  };

  const renderZones = () => {
    return (
      <Section>
        <h3>All Zones</h3>
        {zones.length > 0 ? (
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
        ) : (
          <Error>No zones available.</Error>
        )}
      </Section>
    );
  };

  const renderVehicles = () => {
    return (
      <Section>
        <h3>All Vehicles</h3>
        {vehicles.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <Th>S/N</Th>
                <Th>Vehicle Class Name</Th>
                <Th>Requirements</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle._id}>
                  <Td>{vehicle.description}</Td>
                  <Td>{vehicle.className}</Td>
                  <Td>{vehicle.requirements}</Td>
                  <Td>
                    <ActionIcon onClick={() => handleDeleteVehicle(vehicle._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionIcon>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Error>No vehicles available.</Error>
        )}
      </Section>
    );
  };

  const renderServiceClasses = () => {
    return (
      <Section>
        <h3>All Service Classes</h3>
        {serviceClasses.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <Th>S/N</Th>
                <Th>Service Class Name</Th>
                <Th>Requirements</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {serviceClasses.map(serviceClass => (
                <tr key={serviceClass._id}>
                  <Td>{serviceClass.description}</Td>
                  <Td>{serviceClass.className}</Td>
                  <Td>{serviceClass.requirements}</Td>
                  <Td>
                    <ActionIcon onClick={() => handleDeleteServiceClass(serviceClass._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionIcon>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Error>No service classes available.</Error>
        )}
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
              <CreateButton>Create New Class</CreateButton>
            </Link>
          </ButtonContainer>
          {renderVehicles()}
          {renderServiceClasses()}
          {renderZones()}
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;

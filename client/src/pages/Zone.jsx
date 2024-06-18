import React, { useState, useEffect } from 'react';
import Map, { GeolocateControl, NavigationControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGV2YXB4LTIwMjUiLCJhIjoiY2x4YmNmb2M2MDA2dzJzb2I0aTFkZ3RobSJ9.rFPa0ykAeXYq7bMH9j9OsA';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  left: 7%;
  top: 30px;
  width: 24%;
  height: 30px;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid #000;
  z-index: 1;
`;

const Suggestions = styled.div`
  position: absolute;
  left: 7%;
  top: 65px;
  width: 24%;
  background: white;
  color: black;
  border-radius: 0 0 10px 10px;
  z-index: 2;
`;

const Suggestion = styled.div`
  padding: 5px;
  border-bottom: 1px solid #f7f7f7;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  left: 7%;
  top: 80px;
  width: 24%;
  background: white;
  padding: 10px;
  border-radius: 10px;
  z-index: 3;
  box-shadow: 0px 0px 10px rgba(0, 70, 0.1);
`;

const InfoRow = styled.div`
  margin-bottom: 10px;
`;

const ZoneInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 15px;
  margin-top: 3px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #007070;
`;

const SubmitContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  `;

const SubmitButton = styled.button`
  width: 48%;
  height: 30px;
  background-color: #007070;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #005050;
  }

`;

const Zone = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [geojsonData, setGeojsonData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [zoneName, setZoneName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm) {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${MAPBOX_TOKEN}`);
        const data = await response.json();
        setSuggestions(data.features);
      } else {
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      const [longitude, latitude] = suggestions[0].center;
      setViewport({ ...viewport, latitude, longitude, zoom: 10 });
      setSelectedLocation(suggestions[0]);
      await fetchIsochroneData(latitude, longitude);
    }
  };

  const fetchIsochroneData = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.mapbox.com/isochrone/v1/mapbox/driving/${longitude},${latitude}?contours_minutes=10&polygons=true&access_token=${MAPBOX_TOKEN}`);
      const data = await response.json();
      setGeojsonData(data);
    } catch (error) {
      console.error('Error fetching isochrone data:', error);
      toast.error('Failed to fetch isochrone data');
    }
  };

  const handleSuggestionClick = async (longitude, latitude) => {
    setViewport({ ...viewport, latitude, longitude, zoom: 11 });
    setSuggestions([]);
    const selected = suggestions.find(suggestion => suggestion.center[0] === longitude && suggestion.center[1] === latitude);
    setSelectedLocation(selected);
    await fetchIsochroneData(latitude, longitude);
  };

  const handleZoneSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: zoneName,
      geometry: {
        type: "Point",
        coordinates: [selectedLocation.center[0], selectedLocation.center[1]]
      }
    };
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/admins/zones', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        alert('Zone saved successfully!');
        navigate('/');
      } else {
        toast.error(response.data.message || 'An error occurred while saving the zone.');
        navigate('/');
      }
    } catch (error) {
      console.error('Error saving zone:', error);
      toast.error(error.response.data.message || 'An error occurred while saving the zone.');

    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a location name or zip code"
        />
        {suggestions.length > 0 && (
          <Suggestions>
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.center[0], suggestion.center[1])}
              >
                {suggestion.place_name}
              </Suggestion>
            ))}
          </Suggestions>
        )}
      </form>
      {selectedLocation && (
        <InfoContainer>
          <form onSubmit={handleZoneSubmit}>
            <InfoRow>
              <strong>Selected Location:</strong> {selectedLocation.place_name}
            </InfoRow>
            <InfoRow>
              <strong>Latitude:</strong> {selectedLocation.center[1]}
            </InfoRow>
            <InfoRow>
              <strong>Longitude:</strong> {selectedLocation.center[0]}
            </InfoRow>
            <ZoneInput
              type="text"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              placeholder="Enter zone name"
              required
            />
            <SubmitContainer>
              <SubmitButton type="submit">Save Zone</SubmitButton>
              <SubmitButton type="button" onClick={() => setSelectedLocation(null)}>Cancel</SubmitButton>
            </SubmitContainer>
          </form>
        </InfoContainer>
      )}
      <MapContainer style={{ width: '100vw', height: '100vh' }}>
        <Map
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMove={evt => setViewport(evt.viewState)}
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <GeolocateControl position="top-left" />
          <NavigationControl position="top-right" />
          {geojsonData && (
            <Source id="address-shape" type="geojson" data={geojsonData}>
              <Layer
                id="address-shape-layer"
                type="line"
                paint={{
                  'line-color': 'red',
                  'line-width': 1,
                }}
              />
            </Source>
          )}
        </Map>
      </MapContainer>
    </div>
  );
};

export default Zone;

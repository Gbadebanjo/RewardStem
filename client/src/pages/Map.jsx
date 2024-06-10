import React from 'react'
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import process  from "process";

import PropTypes from 'prop-types';

const Map = ({polygons}) => {
    const apiKey = 'AIzaSyBpv5y0SbiP8_8_yFLqbFygeotsg-kmfbI';

    const mapContainerStyles = {
        height: "100%",
        width: "80%"
    };

    const center = {
        lat: 34.0522,
        lng: -118.2437
        };

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={mapContainerStyles}
                zoom={11}
                center={center}
            >
            {polygons.map((polygon, index) => (
<Polygon key={index} paths={polygon} />
))}

      </GoogleMap>
    </LoadScript>
          
    )
    }

Map.propTypes = {
    polygons: PropTypes.array.isRequired
};

export default Map
import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) => {
    const [position, setPosition] = props.position;
    const { lat, lng } = position;
    return (
        <GoogleMap defaultZoom={6} defaultCenter={{ lat: { lat }, lng: { lng } }}>
            { props.isMarkerShown && <Marker position={{ lat: 23.684994, lng: 90.356331 }} />}
        </GoogleMap >
    )
}));

export default Map;
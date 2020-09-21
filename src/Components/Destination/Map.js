import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) => {
    const [position, setPosition] = props.position;
    return (
        <GoogleMap defaultZoom={8} defaultCenter={position}>
            { props.isMarkerShown && <Marker position={position} />}
        </GoogleMap >
    )
}));

export default Map;
import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { useParams } from 'react-router-dom';

const Map = withScriptjs(withGoogleMap((props) => {
    const { targetPlace } = useParams();

    return (
        <>
            {
                targetPlace === 'coxBazar' && <GoogleMap defaultZoom={12} defaultCenter={{ lat: 21.433920, lng: 91.987030 }}> {props.isMarkerShown && <Marker position={{ lat: 21.433920, lng: 91.987030 }} />} </GoogleMap >
            }
            {
                targetPlace === 'shreemangal' && <GoogleMap defaultZoom={12} defaultCenter={{ lat: 24.310578, lng: 91.725133 }}> {props.isMarkerShown && <Marker position={{ lat: 24.310578, lng: 91.725133 }} />} </GoogleMap >
            }
            {
                targetPlace === 'sundarban' && <GoogleMap defaultZoom={12} defaultCenter={{ lat: 22.243001, lng: 89.760117 }}> {props.isMarkerShown && <Marker position={{ lat: 22.243001, lng: 89.760117 }} />} </GoogleMap >
            }
        </>
    )
}));

export default Map;
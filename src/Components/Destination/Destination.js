import React, { useContext, useState } from 'react';
import { placeContext } from '../../App';
import { hotelData } from '../../assets/HotelData/HotelData';
import Hotel from './Hotel';
import Map from './Map';

const Destination = () => {
    const coxBazarData = hotelData.filter(coxBazarData => coxBazarData.origin === 'coxBazar');
    const shreemangalData = hotelData.filter(shreemangalData => shreemangalData.origin === 'shreemangal');
    const sundarbanData = hotelData.filter(sundarbanData => sundarbanData.origin === 'sundarban');
    const [place, setPlace] = useContext(placeContext);

    const forCoxBazar = coxBazarData.map(hotel => <Hotel hotel={hotel} position={[position, setPosition]} />);
    const forShreemangal = shreemangalData.map(hotel => <Hotel hotel={hotel} position={[position, setPosition]} />);
    const forSundarban = shreemangalData.map(hotel => <Hotel hotel={hotel} position={[position, setPosition]} />);

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,place`;
    const [position, setPosition] = useState();
    return (
        <div className="p-3">
            <div className="row m-0">
                <div className="col-7 row m-0">
                    {
                        targetData(place.name).map(hotel => <Hotel hotel={hotel} position={[position, setPosition]} />)
                    }
                </div>
                <div className="col-5 rounded-circle">
                    <Map
                        position={[position, setPosition]}
                        isMarkerShown
                        googleMapURL={googleMapURL}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%`, padding: `2rem` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Destination;
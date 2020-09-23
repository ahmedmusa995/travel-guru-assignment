import React, { useContext, useState } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { placeContext, userContext } from '../../App';
import { hotelData } from '../../assets/HotelData/HotelData';
import Hotel from './Hotel';
import Map from './Map';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import logoBlack from '../../assets/LogoBlack.png'

const Destination = () => {
    const [latLng, setLatLng] = useState();
    const [place, setPlace] = useContext(placeContext);
    const [signedUser, setSignedUser] = useContext(userContext);
    const history = useHistory();

    const coxBazarData = hotelData.filter(coxBazarData => coxBazarData.origin === 'coxBazar');
    const shreemangalData = hotelData.filter(shreemangalData => shreemangalData.origin === 'shreemangal');
    const sundarbanData = hotelData.filter(sundarbanData => sundarbanData.origin === 'sundarban');

    const showCoxBazar = coxBazarData.map(hotel => <Hotel hotel={hotel} position={[latLng, setLatLng]} />);
    const showShreemangal = shreemangalData.map(hotel => <Hotel hotel={hotel} position={[latLng, setLatLng]} />);
    const showSundarban = sundarbanData.map(hotel => <Hotel hotel={hotel} position={[latLng, setLatLng]} />);

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry`;

    return (
        <div>
            <div className="login-main" height="5rem">
                <Navbar className="nav-container">
                    <Navbar.Brand href="/home" className="logo-black"><img className="img-fluid" src={logoBlack} alt="logo" /></Navbar.Brand>
                    <Form inline className="input-field m-auto">
                        <SearchIcon style={{ color: "black" }} /><FormControl className="input" type="text" placeholder="Search Your Destination" />
                    </Form>
                    <Nav className="ml-auto">
                        <a className="links" href="/">News</a>
                        <a className="links" href="/">Destination</a>
                        <a className="links" href="/">Blog</a>
                        <a className="links" href="/">Contact</a>
                        {
                            signedUser.email ? <Button className="signOut-btn" onClick={() => setSignedUser({})}>Sign Out</Button> : <Button className="login-btn" onClick={() => history.push("/login")}>Login</Button>
                        }
                    </Nav>

                </Navbar >
            </div>
            <div className="p-3">
                <div className="row m-0">
                    <div className="col-7 row m-0">
                        {
                            place.target === 'coxBazar' && showCoxBazar
                        }
                        {
                            place.target === 'shreemangal' && showShreemangal
                        }
                        {
                            place.target === 'sundarban' && showSundarban
                        }
                    </div>
                    <div className="col-5 rounded-circle">
                        <Map
                            position={[latLng, setLatLng]}
                            isMarkerShown
                            googleMapURL={googleMapURL}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%`, padding: `2rem` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;
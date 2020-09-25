import React, { useContext, useEffect, useState } from 'react';
import { placeContext, userContext } from '../../App';
import Hotel from './Hotel';
import Map from './Map';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import logoBlack from '../../assets/LogoBlack.png'

const Destination = () => {
    const [signedUser, setSignedUser] = useContext(userContext);
    const [place] = useContext(placeContext);
    const history = useHistory();
    const [destiny, setDestiny] = useState([]);

    useEffect(() => {
        const selectedPlace = place.selectedPlace;
        setDestiny(selectedPlace);
    }, []);

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry`;

    return (
        <div className="login-main">
            <nav className="nav-container d-flex justify-content-center align-items-center">
                <div className="logo"><img className="img-fluid" src={logoBlack} alt="logo" /></div>
                <div className="m-auto"><SearchIcon style={{ color: 'black', fontSize: '35px' }} /><input className="search-input" type="text" placeholder="Search Your Destination" /></div>
                <div className=" ml-auto d-flex justify-content-center align-items-center">
                    <Link className="links" to="/home">Home</Link>
                    <Link className="links" to="/news">News</Link>
                    <Link className="links" to="/destiny">Destination</Link>
                    <Link className="links" to="/blog">Blog</Link>
                    <Link className="links" to="/contact">Contact</Link>

                    {
                        signedUser.uid ? <div className="d-flex align-items-center">{signedUser.img && <img style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '5px', border: '2px solid #F9A51A' }} src={signedUser.img} alt={signedUser.displayName} />}<button className="signOut-btn" onClick={() => setSignedUser({})}>Sign Out</button></div>
                            :
                            <button className="login-btn" onClick={() => history.push("/login")}>Login</button>
                    }

                </div>
            </nav >
            <div className="p-3">
                <div className="row m-0">
                    <div className="col-7 row m-0">
                        {
                            destiny.map(hotel => <Hotel hotel={hotel} key={hotel.id} />)
                        }
                    </div>
                    <div className="col-5 rounded-circle">
                        <Map
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
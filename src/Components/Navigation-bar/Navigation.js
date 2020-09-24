import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import './navbar.css'
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';


const Navigation = () => {
    const history = useHistory()
    const [signedUser, setSignedUser] = useContext(userContext);
    return (
        <nav className="nav-container d-flex justify-content-center align-items-center">
            <div className="logo"><img className="img-fluid" src={logo} alt="logo" /></div>
            <div className="m-auto"><SearchIcon style={{ color: 'white', fontSize: '35px' }} /><input className="search-input" type="text" placeholder="Search Your Destination" /></div>
            <div className=" ml-auto d-flex justify-content-center align-items-center">
                <a className="links" href="/">News</a>
                <a className="links" href="/">Destination</a>
                <a className="links" href="/">Blog</a>
                <a className="links" href="/">Contact</a>
                {
                    signedUser.uid ? <div className="d-flex justify-content-center"><img style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '5px', border: '2px solid #F9A51A' }} src={signedUser.img} alt={signedUser.displayName} /><button className="signOut-btn" onClick={() => setSignedUser({})}>Sign Out</button></div> : <button className="login-btn" onClick={() => history.push("/login")}>Login</button>
                }
            </div>
        </nav >
    );
};

export default Navigation;
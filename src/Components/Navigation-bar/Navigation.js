import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import './navbar.css'
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';


const Navigation = () => {
    const history = useHistory()
    const [signedUser, setSignedUser] = useContext(userContext);
    return (
        <Navbar className="nav-container">
            <Navbar.Brand href="/" className="logo"><img className="img-fluid" src={logo} alt="logo" /></Navbar.Brand>
            <div className="search-input-field" style={{ backgroundColor: 'rgba(255,255,255,0.4' }}><SearchIcon /><input className="search-input" type="text" placeholder="Search Your Destination" /></div>
            <Nav className="ml-auto">
                <a className="links" href="/">News</a>
                <a className="links" href="/">Destination</a>
                <a className="links" href="/">Blog</a>
                <a className="links" href="/">Contact</a>
                {
                    signedUser.email ? <button className="signOut-btn" onClick={() => setSignedUser({})}>Sign Out</button> : <button className="login-btn" onClick={() => history.push("/login")}>Login</button>
                }
            </Nav>
        </Navbar >
    );
};

export default Navigation;
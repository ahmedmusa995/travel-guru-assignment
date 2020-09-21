import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import './navbar.css'
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';


const Navigation = () => {
    const history = useHistory()
    const [signedUser, setSignedUser] = useContext(userContext);
    const userPhoto = <div style={{ width: '40px', height: '40px' }}><img style={{ width: "100%", borderRadius: '50%', border: '1px solid # #F9A51A' }} src={signedUser.img} alt="user" /></div>;
    return (
        <Navbar className="nav-container">
            <Navbar.Brand href="/" className="logo"><img className="img-fluid" src={logo} alt="logo" /></Navbar.Brand>
            <Form inline className="input-field m-auto">
                <SearchIcon /><FormControl className="input" type="text" placeholder="Search Your Destination" />
            </Form>
            <Nav className="ml-auto">
                <a className="links" href="/">News</a>
                <a className="links" href="/">Destination</a>
                <a className="links" href="/">Blog</a>
                <a className="links" href="/">Contact</a>
                {
                    signedUser.img ? userPhoto : <Button className="login-btn" onClick={() => history.push("/login")}>Login</Button>
                }
            </Nav>
        </Navbar >
    );
};

export default Navigation;
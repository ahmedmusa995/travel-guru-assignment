import React, { useContext } from 'react';
import './login.css';
import { Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import logoBlack from '../../assets/LogoBlack.png'
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
import { userContext } from '../../App';
import LoginInput from '../log-in-input/LoginInput';
import SignUp from '../signup/SignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [signedUser, setSignedUser] = useContext(userContext);

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signedUser = { name: displayName, email, img: photoURL, isNew: false };
                setSignedUser(signedUser);
                history.replace(from)
            })
            .catch(error => {
                console.log(error);
                setSignedUser({ ...signedUser, googleError: error.message, error: error.message })
            });
    };

    const handleFBSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signedUser = { name: displayName, email, img: photoURL, isNew: false };
                setSignedUser(signedUser);
                history.replace(from)
            })
            .catch(error => {
                console.log(error);
                setSignedUser({ ...signedUser, fbError: error.message, error: error.message })
            });
    }


    const toggler = () => {
        const isNewUser = { ...signedUser }
        isNewUser['isNew'] = !signedUser.isNew;
        setSignedUser(isNewUser);
    }

    return (
        <div className="login-main">
            <Navbar className="nav-container">
                <Navbar.Brand href="/home" className="logo-black"><img className="img-fluid" src={logoBlack} alt="logo" /></Navbar.Brand>
                <div className="search-input-field"><SearchIcon style={{ color: "black" }} /><input className="search-input" type="text" placeholder="Search Your Destination" /></div>
                <Nav className="ml-auto">
                    <a className="links" href="/">News</a>
                    <a className="links" href="/">Destination</a>
                    <a className="links" href="/">Blog</a>
                    <a className="links" href="/">Contact</a>
                    {
                        signedUser.uid ? <button className="signOut-btn" onClick={() => setSignedUser({})}>Sign Out</button> : <button className="login-btn" onClick={() => history.push("/login")}>Login</button>
                    }
                </Nav>
            </Navbar >
            { signedUser.isNew ? <SignUp toggler={toggler} /> :
                <LoginInput toggler={toggler} />
            }
            <div className="auto-login text-center">
                <p className="mt-3">Or</p>
                <h3>{signedUser.isNew ? 'Sign up' : 'Login'} with:</h3>
                <button onClick={handleFBSignIn}><FontAwesomeIcon icon={['fab', 'google']} /></button>
                <button onClick={handleGoogleSignIn}><FontAwesomeIcon icon={['fab', 'facebook']} /></button>
                <button><FontAwesomeIcon icon={['fab', 'github']} /></button>
            </div>
        </div>

    );
};

export default Login;
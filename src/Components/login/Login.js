import React, { useContext } from 'react';
import './login.css';
import SearchIcon from '@material-ui/icons/Search';
import logoBlack from '../../assets/LogoBlack.png'
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
import { userContext } from '../../App';
import LoginInput from '../log-in-input/LoginInput';
import SignUp from '../signup/SignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleFBSignIn, handleGithubSignIn } from '../userManagement/userManagemnet';

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [signedUser, setSignedUser] = useContext(userContext);

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    };
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL, uid, emailVerified } = result.user;
                const loggedUser = { name: displayName, email, img: photoURL, isNew: false, uid, emailVerified };
                setSignedUser(loggedUser);
                if (emailVerified) {
                    history.replace(from)
                }
            })
            .catch(error => {
                console.log(error);
                setSignedUser({ ...signedUser, googleError: error.message, error: error.message })
            });
    };

    const toggler = () => {
        setSignedUser({ ...signedUser, isNew: !signedUser.isNew, error: '', loginError: '', fbError: '', googleError: '', githubError: '', passwordState: '' });
    }

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
                        signedUser.uid ? <div className="d-flex align-items-center"> {signedUser.img && <img style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '5px', border: '2px solid #F9A51A' }} src={signedUser.img} alt={signedUser.displayName} />} <button className="signOut-btn" onClick={() => setSignedUser({})}>Sign Out</button></div>
                            :
                            <button className="login-btn" onClick={() => history.push("/login")}>Login</button>
                    }
                </div>
            </nav >
            <div className="row m-0 d-flex justify-content-center align-items-center pt-5">
                <div className="col-5">
                    {signedUser.isNew ? <SignUp toggler={toggler} /> :
                        <LoginInput toggler={toggler} />
                    }
                </div>
                <div className="col-3">
                    <div className="auto-login text-center">
                        <p>Or</p>
                        <h3>{signedUser.isNew ? 'Sign up' : 'Login'} with:</h3>
                        <button onClick={handleGoogleSignIn}><FontAwesomeIcon icon={['fab', 'google']} /></button>
                        <button onClick={() => handleFBSignIn(signedUser, setSignedUser)}><FontAwesomeIcon icon={['fab', 'facebook']} /></button>
                        <button onClick={() => handleGithubSignIn(signedUser, setSignedUser)}><FontAwesomeIcon icon={['fab', 'github']} /></button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
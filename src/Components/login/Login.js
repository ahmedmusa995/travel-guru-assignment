import React, { useContext } from 'react';
import './login.css';
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
    };
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL, uid } = result.user;
                const signedUser = { name: displayName, email, img: photoURL, isNew: false, uid };
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
                const { displayName, email, photoURL, uid } = result.user;
                const signedUser = { name: displayName, email, img: photoURL, isNew: false, uid };
                setSignedUser(signedUser);
                history.replace(from)
            })
            .catch(error => {
                console.log(error);
                setSignedUser({ ...signedUser, fbError: error.message, error: error.message })
            });

    }

    const handleGithubSignIn = () => {
        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL, uid } = result.user;
                const newUser = { name: displayName, email, img: photoURL, isNew: false, uid };
                setSignedUser(newUser);
                history.replace(from)
            })
            .catch(error => {
                console.log(error);
                setSignedUser({ ...signedUser, githubError: error.message, error: error.message })
            });
    }
    const toggler = () => {
        setSignedUser({ ...signedUser, isNew: !signedUser.isNew, fbError: '', googleError: '', passwordState: '' });
    }

    return (
        <div className="login-main">
            <nav className="nav-container d-flex justify-content-center align-items-center">
                <div className="logo"><img className="img-fluid" src={logoBlack} alt="logo" /></div>
                <div className="m-auto"><SearchIcon style={{ color: 'black', fontSize: '35px' }} /><input className="search-input" type="text" placeholder="Search Your Destination" /></div>
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
            { signedUser.isNew ? <SignUp toggler={toggler} /> :
                <LoginInput toggler={toggler} />
            }
            <div className="auto-login text-center">
                <p className="mt-3">Or</p>
                <h3>{signedUser.isNew ? 'Sign up' : 'Login'} with:</h3>
                <button onClick={handleGoogleSignIn}><FontAwesomeIcon icon={['fab', 'google']} /></button>
                <button onClick={handleFBSignIn}><FontAwesomeIcon icon={['fab', 'facebook']} /></button>
                <button onClick={handleGithubSignIn}><FontAwesomeIcon icon={['fab', 'github']} /></button>
            </div>
        </div>

    );
};

export default Login;
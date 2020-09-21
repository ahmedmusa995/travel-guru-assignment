import React, { useContext, useRef } from 'react';
import './login.css';
import facebookLogo from '../../assets/fb.png';
import googleLogo from '../../assets/google.png';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import logoBlack from '../../assets/LogoBlack.png'
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
import { userContext } from '../../App';
import LoginInput from '../log-in-input/LoginInput';
import SignUp from '../signup/SignUp';

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [signedUser, setSignedUser] = useContext(userContext);

    const passwordRef = useRef();
    const emailRef = useRef();
    const confirmPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signedUser = { name: displayName, email, img: photoURL, isNew: false, error: '' };
                setSignedUser(signedUser);
                history.replace(from)
                console.log(signedUser)
            })
            .catch(error => console.log(error));
    };

    const handleFBSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { email } = result.uh;
                const signedUser = { email };
                setSignedUser(signedUser);
            })
            .catch(error => { console.log(error); alert('error') });
    }


    const handleInputSignUp = (event) => {
        event.preventDefault();
        let isValid;
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailRef.value) && /\d{1}/.test(passwordRef.value) && passwordRef.value.length > 7 && passwordRef.value === confirmPasswordRef.value && firstNameRef && lastNameRef) {
            isValid = true;
            // if (isValid) {
            //     const newUser = { ...signedUser, name: firstNameRef.value + lastNameRef.value, email: emailRef.value, password: passwordRef.value }
            //     setSignedUser(newUser);
            // }
        }
        // if (event.target.name === 'password') {
        //     const isNumber = /\d{1}/.test(event.target.value);
        //     isValid = isNumber && event.target.value.length > 7;
        // }
        // if ((event.target.name === 'confirmPassword') === (event.target.name === 'password')) {
        //     isValid = true;
        // }
        // if ((event.target.name === 'first') && (event.target.name === 'last')) {
        //     const newUser = { ...signedUser };
        //     newUser['name'] = event.target.value + event.target.last.value;
        //     setSignedUser(newUser);
        // }
        if (isValid) {
            const newUser = { ...signedUser, name: firstNameRef.value + lastNameRef.value, email: emailRef.value, password: passwordRef.value }
            setSignedUser(newUser);
        }
    }
    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        if (signedUser.email && signedUser.password && signedUser.password && signedUser.name) {
            firebase.auth().createUserWithEmailAndPassword(signedUser.email, signedUser.password)
                .then(result => console.log(result))
                .catch(error => {
                    console.log(error);
                    alert('Something went wrong');
                });
        }
    };
    const handleSubmitLogin = (e) => {
        e.preventDefault();


    }
    const userPhoto = <div style={{ width: '40px', height: '40px' }}><img style={{ width: "100%", borderRadius: '50%', border: '1px solid # #F9A51A' }} src={signedUser.img} alt="user" /></div>

    const toggler = () => {
        const isNewUser = { ...signedUser }
        isNewUser['isNew'] = !signedUser.isNew;
        setSignedUser(isNewUser);
    }

    return (
        <div className="login-main">
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
                        signedUser.img ? userPhoto : <Button className="login-btn" onClick={() => history.push("/login")}>Login</Button>
                    }
                </Nav>

            </Navbar >
            { signedUser.isNew ? <SignUp toggler={toggler} /> :
                <LoginInput toggler={toggler} />
            }
            <div className="auto-login">
                <p className="text-center mt-3">Or</p>
                <div className="button" onClick={handleFBSignIn}>
                    <img className="logo" src={facebookLogo} alt="fb-logo" />
                    <p className="text-center d-inline">Login with Facebook</p>
                </div>
                <div className="button" onClick={handleGoogleSignIn}>
                    <img className="logo" src={googleLogo} alt="google-logo" />
                    <p className="text-center d-inline">Login with Google</p>
                </div>
            </div>
        </div>

    );
};

export default Login;
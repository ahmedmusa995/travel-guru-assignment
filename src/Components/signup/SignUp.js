import React, { useContext, useRef } from 'react';
import './signUp.css';
import "firebase/auth";
import { userContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { emailVerification, manualSignUp } from '../userManagement/userManagemnet';




const SignUp = (props) => {
    const [signedUser, setSignedUser] = useContext(userContext);
    const { toggler } = props;
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleInput = (event) => {
        if (event.target.name === 'email') {
            const email = event.target.value;
            setSignedUser({ ...signedUser, email: email });
        }
        if (event.target.name === 'password') {
            const password = event.target.value;
            if (password.length > 7) {
                setSignedUser({ ...signedUser, password: password });
            }
            else {
                setSignedUser({ ...signedUser, passwordState: 'Password must be at least 8 characters with a number' })
            }

        }
        if (event.target.name === 'confirmPassword') {
            const confirmPassword = event.target.value;
            if (signedUser.password === confirmPassword) {
                setSignedUser({ ...signedUser, passwordState: 'Password Matched' })
            }
            else {
                setSignedUser({ ...signedUser, passwordState: "Password didn't match" })
            }
        }
        if (event.target.name === 'first') {
            const firstName = event.target.value;
            setSignedUser({ ...signedUser, firstName: firstName })
        }
        if (event.target.name === 'last') {
            const lastName = event.target.value;
            setSignedUser({ ...signedUser, lastName: lastName })
        }
    };

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        if (signedUser.firstName && signedUser.lastName && signedUser.email && signedUser.password) {
            firebase.auth().createUserWithEmailAndPassword(signedUser.email, signedUser.password)
                .then((result) => {
                    const { emailVerified, uid } = result.user;
                    const name = signedUser.firstName + ' ' + signedUser.lastName;
                    setSignedUser({ ...signedUser, name, uid, emailVerified });
                    console.log(result.user)
                })
                .catch(error => {
                    console.log(error);
                    setSignedUser({ ...signedUser, signUpError: error.message, error: error.message })
                });
        }
        else {
            setSignedUser({ ...signedUser, signUpError: 'Something went wrong. Try again...!!' })
        }
    };
    return (
        <div className="signup-area">
            <div className="d-flex justify-content-center ">
                <div className="form-area p-3">
                    <h3 className="mb-3">Create Account</h3>
                    <form onSubmit={handleSubmitSignUp}>
                        <input onChange={handleInput} ref={firstNameRef} name="first" className="signUp-input" type="text" placeholder="First Name" required /> <br />
                        <input onChange={handleInput} ref={lastNameRef} name="last" className="signUp-input" type="text" placeholder="Last Name" required /> <br />
                        <input onChange={handleInput} ref={emailRef} name="email" className="signUp-input" type="text" placeholder="Email" required /> <br />
                        <input onChange={handleInput} ref={passwordRef} name="password" className="signUp-input" type="password" placeholder="Password" required /> <br />
                        <input onChange={handleInput} ref={confirmPasswordRef} name="confirmPassword" className="signUp-input" type="password" placeholder="Confirm Password" required /> <br />
                        <p className="text-center"><small className="text-muted">{signedUser.passwordState && signedUser.passwordState}</small></p>
                        <input className="signUp-btn" type="submit" value="Create Account" /> <br />
                        {
                            signedUser.uid ? <p className="text-success text-center"><FontAwesomeIcon icon={faCheck} /> Account Created, Login Now</p> :
                                <small className="text-danger text-center d-block"> {signedUser.signUpError || signedUser.fbError || signedUser.googleError || signedUser.loginError || signedUser.githubError}</small>
                        }
                        {/* {
                            signedUser.emailVerified ? '' : <button onClick={emailVerification}>Verify Your Email</button>
                        } */}
                    </form>
                    <p className="text-center">Have an Account? <span onClick={toggler}>Login Here</span></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
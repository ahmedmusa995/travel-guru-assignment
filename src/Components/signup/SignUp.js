import React, { useContext, useRef } from 'react';
import './signUp.css';
import "firebase/auth";
import { userContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { emailVerification } from '../userManagement/userManagemnet';
import { faAngellist } from '@fortawesome/free-brands-svg-icons';




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
            const newPassword = event.target.value;
            if (newPassword.length > 7) {
                setSignedUser({ ...signedUser, newPassword });
            }
            else {
                setSignedUser({ ...signedUser, passwordState: 'Password must be at least 8 characters with a number' })
            }
        }
        if (event.target.name === 'confirmPassword') {
            const confirmPassword = event.target.value;
            if (signedUser.newPassword === confirmPassword) {
                setSignedUser({ ...signedUser, passwordState: 'Password Matched', password: confirmPassword });
            }
            else {
                setSignedUser({ ...signedUser, passwordState: "Password didn't match", password: '' })
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
                    emailVerification();
                })
                .catch(error => {
                    console.log(error);
                    setSignedUser({ ...signedUser, signUpError: error.message, error: error.message })
                });
        }
        else {
            setSignedUser({ ...signedUser, signUpError: 'Follow the instruction about password shown above' })
        }
    };
    return (
        <div className="signup-area">
            <div className="d-flex justify-content-center ">
                <div className="form-area p-3">
                    <h3 className="mb-3">Create Account</h3>
                    <form onSubmit={handleSubmitSignUp}>
                        <input onChange={(handleInput)} ref={firstNameRef} name="first" className="signUp-input" type="text" placeholder="First Name" required /> <br />
                        <input onChange={handleInput} ref={lastNameRef} name="last" className="signUp-input" type="text" placeholder="Last Name" required /> <br />
                        <input onChange={handleInput} ref={emailRef} name="email" className="signUp-input" type="text" placeholder="Email" required /> <br />
                        <input onChange={handleInput} ref={passwordRef} name="password" className="signUp-input" type="password" placeholder="Password" required /> <br />
                        <input onChange={handleInput} ref={confirmPasswordRef} name="confirmPassword" className="signUp-input" type="password" placeholder="Confirm Password" required /> <br />
                        <p className="text-center"><small className="text-muted">{signedUser.passwordState && signedUser.passwordState}</small></p>
                        <input className="signUp-btn" type="submit" value="Create Account" /> <br />
                        {
                            signedUser.uid ? <p className="text-success text-center"><FontAwesomeIcon icon={faAngellist} /> Account Created, go to your <a href="https://mail.google.com" target="_blank">mail</a> to verify</p>
                                :
                                <small className="text-danger text-center d-block">{signedUser.error && <FontAwesomeIcon icon={faTimesCircle} />} {signedUser.signUpError || signedUser.fbError || signedUser.googleError || signedUser.loginError || signedUser.githubError}</small>
                        }
                    </form>
                    <p className="text-center">Have an Account? <span onClick={toggler}>Login Here</span></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
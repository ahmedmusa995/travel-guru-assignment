import React, { useContext, useRef } from 'react';
import './signUp.css';
import "firebase/auth";
import { userContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";




const SignUp = (props) => {
    const [signedUser, setSignedUser] = useContext(userContext);
    const { toggler } = props;
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleInput = (event) => {
        // if (emailRef.current.value) {
        //     setSignedUser({ ...signedUser, email: emailRef.current.value })
        // }
        // if (passwordRef.current.value > 6 && /\d{1}/.test(passwordRef.current.value) && passwordRef.current.value === confirmPasswordRef.current.value) {
        //     setSignedUser({ ...signedUser, password: passwordRef.current.value })
        // }
        // if (firstNameRef.current.value && lastNameRef.current.value) {
        //     setSignedUser({ ...signedUser, name: firstNameRef.current.value + ' ' + lastNameRef.current.value })
        // }

        if (event.target.name === 'email') {
            const email = event.target.value;
            setSignedUser({ ...signedUser, email: email });
        }
        if (event.target.name === 'password') {
            const password = event.target.value;
            setSignedUser({ ...signedUser, password: password });
        }
        if (event.target.name === 'confirmPassword') {
            const confirmPassword = event.target.value;
            if (signedUser.password === confirmPassword) {
                setSignedUser({ ...signedUser })
            }
            else {
                setSignedUser({ ...signedUser, passError: "Password didn't match" })
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
                .then(() => {
                    const name = signedUser.firstName + ' ' + signedUser.lastName;
                    setSignedUser({ ...signedUser, name })
                })
                .catch(error => {
                    console.log(error);
                    setSignedUser({ ...signedUser, error: error.message })
                });
            console.log(signedUser)
        }
    };
    return (
        <div className="signup-area">
            <div className="d-flex justify-content-center ">
                <div className="form-area p-3">
                    <h3 className="mb-3">Create Account</h3>
                    <form onSubmit={handleSubmitSignUp}>
                        <input onChange={handleInput} ref={firstNameRef} name="first" className="signup-input" type="text" placeholder="First Name" required />  <br />
                        <input onChange={handleInput} ref={lastNameRef} name="last" className="signup-input" type="text" placeholder="Last Name" required /> <br />
                        <input onChange={handleInput} ref={emailRef} name="email" className="signup-input" type="text" placeholder="Email" required /> <br />
                        <input onChange={handleInput} ref={passwordRef} name="password" className="signup-input" type="password" placeholder="Password" required /> <br />
                        <input onChange={handleInput} ref={confirmPasswordRef} name="confirmPassword" className="signup-input" type="password" placeholder="Confirm Password" required /> <br />
                        <p className="text-center"><small className="text-danger">{signedUser.passError}</small></p>
                        <input className="signup-btn" type="submit" value="Create Account" />
                        <p className="text-danger text-center">{signedUser.error}</p>
                    </form>
                    <p className="text-center">Have an Account? <span onClick={toggler}>Login Here</span></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
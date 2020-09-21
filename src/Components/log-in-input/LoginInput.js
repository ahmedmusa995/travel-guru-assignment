import React, { useContext, useRef } from 'react';
import './loginInput.css';
import "firebase/auth";
import { userContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";

const LoginInput = (props) => {
    const { toggler } = props;

    const [signedUser, setSignedUser] = useContext(userContext);

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleInput = () => {
        if (emailRef.current.value) {
            const email = emailRef.current.value;
            const updatedInfo = { ...signedUser };
            updatedInfo['email'] = email;
            setSignedUser(updatedInfo)
        }
        if (passwordRef.current.value >= 8 && /\d{1}/.test(passwordRef.current.value)) {
            const password = passwordRef.current.value;
            const updatedInfo = { ...signedUser };
            updatedInfo['password'] = password;
            setSignedUser(updatedInfo)
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(signedUser.email, signedUser.password)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
    return (
        <div className="login">
            <div className="d-flex justify-content-center">
                <div className="login-form p-3">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmitLogin}>
                        <input name="email" onChange={handleInput} ref={emailRef} className="login-input" type="email" placeholder="Email" required /> <br />
                        <input name="password" onChange={handleInput} ref={passwordRef} className="login-input" type="password" placeholder="Password" required /> <br />
                        <div className="row mx-0 mb-4">
                            <div className="col-6">
                                <input type="checkbox" id="remember-me" /> <label for="remember-me">Remember me</label>
                            </div>
                            <div className="col-6 text-right">
                                <a href="/">Forget Password</a>
                            </div>
                        </div>
                        <input className="login-btn" type="submit" value="Login" />
                        <p className="my-3 text-center">don't have an account? <span onClick={toggler}>Create a New Account</span></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginInput;
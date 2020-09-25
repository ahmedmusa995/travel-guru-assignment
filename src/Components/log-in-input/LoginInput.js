import React, { useContext } from 'react';
import './loginInput.css';
import "firebase/auth";
import { userContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight, faHandPointUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { forgetPassword } from '../userManagement/userManagemnet';

const LoginInput = (props) => {
    const { toggler } = props;
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [signedUser, setSignedUser] = useContext(userContext);

    const handleInput = (event) => {
        if (event.target.name === 'email') {
            const email = event.target.value;
            setSignedUser({ ...signedUser, email: email });
        }
        if (event.target.name === 'password') {
            const password = event.target.value;
            setSignedUser({ ...signedUser, password, passwordState: 'Password must be at least 8 characters with a number' })
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(signedUser.email, signedUser.password)
            .then(response => {
                const { email, uid, emailVerified } = response.user;
                setSignedUser({ ...signedUser, email, uid, emailVerified });
                if (emailVerified) {
                    history.replace(from);
                }
                else {
                    setSignedUser({ ...signedUser, verifyFirst: 'Go to your Email and verify it to get access' })
                }
            })
            .catch(error => {
                console.log(error)
                setSignedUser({ ...signedUser, loginError: error.message, error: error.message })
            });
    }
    return (
        <div className="login">
            <div className="d-flex justify-content-center">
                <div className="login-form p-3">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmitLogin}>
                        <input name="email" onChange={handleInput} className="login-input" type="email" placeholder="Email" required /> <br />
                        <input name="password" onChange={handleInput} className="login-input" type="password" placeholder="Password" required /> <br />

                        {
                            signedUser.error && <p className="text-center"><small className="text-danger"><FontAwesomeIcon icon={faTimesCircle} /> {signedUser.error}</small></p>
                        }
                        {
                            signedUser.passwordState && <p className="text-center"><small className="text-primary"><FontAwesomeIcon icon={faHandPointRight} /> {signedUser.passwordState}</small> </p>
                        }

                        <div className="row mx-0 mb-4">
                            <div className="col-6">
                                <input type="checkbox" id="remember-me" /> <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <div className="col-6 text-right">
                                <p style={{ color: '#F9A51A', cursor: 'pointer' }} className="text-warning" onClick={() => forgetPassword(signedUser.email, signedUser, setSignedUser)}>Forget Password</p>
                            </div>
                            <div className="text-center col-12">
                                {signedUser.forgetPasswordMessage && <p className="text-center text-info"> <FontAwesomeIcon icon={faHandPointUp} /> {signedUser.forgetPasswordMessage}</p>}
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
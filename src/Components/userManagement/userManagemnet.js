import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from "react-router-dom";


//FORGET_PASSWORD

export const forgetPassword = (email, signedUserState, setSignedUserFunction) => {
    if (signedUserState.email) {
        setSignedUserFunction({ ...signedUserState, forgetPasswordMessage: 'Please Check Your Email to reset your password' })
        firebase.auth().sendPasswordResetEmail(email)
            .then()
            .catch()
    }
    else {
        setSignedUserFunction({ ...signedUserState, forgetPasswordMessage: 'Input Your Email First buddy' })
    }

};

//EMAIL_VERIFICATION

export const emailVerification = () => {
    firebase.auth().currentUser.sendEmailVerification()
        .then()
        .catch();
}


//HANDLE-FACEBOOK-SIGN-IN

export const handleFBSignIn = (signedUserState, setSignedUserFunction) => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const { displayName, email, photoURL, uid, emailVerified } = result.user;
            const loggedUser = { name: displayName, email, img: photoURL, isNew: false, uid, emailVerified };
            setSignedUserFunction(loggedUser);
            if (emailVerified) {
                const history = useHistory();
                const location = useLocation();
                let { from } = location.state || { from: { pathname: "/" } };
                history.replace(from)
            }
        })
        .catch(error => {
            console.log(error);
            setSignedUserFunction({ ...signedUserState, fbError: error.message, error: error.message })
        });
}

//HANDLE GIT HUB SIGN IN 

export const handleGithubSignIn = (signedUserState, setSignedUserFunction) => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const { displayName, email, photoURL, uid, emailVerified } = result.user;
            const loggedUser = { name: displayName, email, img: photoURL, isNew: false, uid, emailVerified };
            setSignedUserFunction(loggedUser);
            if (emailVerified) {
                const history = useHistory();
                const location = useLocation();
                let { from } = location.state || { from: { pathname: "/" } };
                history.replace(from)
            }
        })
        .catch(error => {
            console.log(error);
            setSignedUserFunction({ ...signedUserState, githubError: error.message, error: error.message })
        });
}


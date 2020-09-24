// import * as firebase from "firebase/app";
// import "firebase/auth";
// import { useContext } from "react";
// import { userContext } from "../../App";

// export const forgetPassword = (email) => {
//     firebase.auth().sendPasswordResetEmail(email)
//         .then()
//         .catch();
// }
// export const emailVerification = () => {
//     firebase.auth().currentUser.sendEmailVerification()
//         .then(res => console.log(res))
//         .catch(error => console.log(error));
// }



// export const manualSignUp = (email, password, firstName, lastName) => {
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((result) => {
//             const { emailVerified, uid } = result.user;
//             const name = firstName + ' ' + lastName;
//             setSignedUser({ ...signedUser, name, uid, emailVerified });
//         })
//         .catch(error => {
//             console.log(error);
//             setSignedUser({ ...signedUser, signUpError: error.message, error: error.message })
//         });
// }

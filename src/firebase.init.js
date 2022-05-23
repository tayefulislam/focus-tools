// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};
// const firebaseConfig = {
//     apiKey: "AIzaSyBS4hlz5pWDpB93KRjqeBzyohTjPv7zCcs",
//     authDomain: "focus-tools.firebaseapp.com",
//     projectId: "focus-tools",
//     storageBucket: "focus-tools.appspot.com",
//     messagingSenderId: "409286306283",
//     appId: "1:409286306283:web:8fba86c9647bbcbe09d1ae",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)


export default auth;
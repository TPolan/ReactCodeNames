// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBU5Jh46Ws8finATg19mz7x2EYjlN2y7PY",
    authDomain: "reactcodenames-7a986.firebaseapp.com",
    databaseURL: "https://reactcodenames-7a986.firebaseio.com",
    projectId: "reactcodenames-7a986",
    storageBucket: "reactcodenames-7a986.appspot.com",
    messagingSenderId: "122543231312",
    appId: "1:122543231312:web:b95499922faabe515e1c55",
    measurementId: "G-7XG0Q4DYHF"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export {projectFirestore}
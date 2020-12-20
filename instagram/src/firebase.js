// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDItprGb3VhxiCSDGkug0QVSDBXKc75-YM",
    authDomain: "instagram-clone-7a115.firebaseapp.com",
    projectId: "instagram-clone-7a115",
    storageBucket: "instagram-clone-7a115.appspot.com",
    messagingSenderId: "842809887971",
    appId: "1:842809887971:web:3581af80fe1bfff3bd89d6",
    measurementId: "G-HDV3LQC4PK"
});

const database = firebaseApp.firestore();//deploy to the database
const auth = firebaseApp.auth();//firebase authorization
const storage = firebaseApp.storage();//cloud-hosting

//export default firebaseApp
export {database, auth, storage};
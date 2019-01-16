import firebase from "firebase";
import React from "react";

const config = {
  apiKey: "AIzaSyAdgxIsC0dcXy7G4W2luOWVxzeTAp3amU4",
  authDomain: "project-test-22563.firebaseapp.com",
  databaseURL: "https://project-test-22563.firebaseio.com",
  projectId: "project-test-22563",
  storageBucket: "project-test-22563.appspot.com",
  messagingSenderId: "673910051845"
};
firebase.initializeApp(config);
const FirebaseContext = React.createContext(null);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

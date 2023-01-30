// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl3dJWv0kG2AHYLFh2AWmTIA1E62cHAaI",
  authDomain: "booksearch-822a4.firebaseapp.com",
  projectId: "booksearch-822a4",
  storageBucket: "booksearch-822a4.appspot.com",
  messagingSenderId: "472785564931",
  appId: "1:472785564931:web:130e28866d6569ce1ee536",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth(app);

export default app;
export { app, db, auth };

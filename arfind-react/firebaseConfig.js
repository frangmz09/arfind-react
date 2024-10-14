// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importa getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr9Nw6Yfk61ZCwgOH2zcNJlMtNQro18ws",
  authDomain: "arfind.firebaseapp.com",
  projectId: "arfind",
  storageBucket: "arfind.appspot.com",
  messagingSenderId: "90890272483",
  appId: "1:90890272483:web:74a3337b6e3cc46503cfd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 
export { db, auth };
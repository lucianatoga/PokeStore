// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnq66MCN6p89psCxcER--2MDeJqX-JxQk",
  authDomain: "pokestore-3bb8a.firebaseapp.com",
  projectId: "pokestore-3bb8a",
  storageBucket: "pokestore-3bb8a.firebasestorage.app",
  messagingSenderId: "716281257665",
  appId: "1:716281257665:web:ce57771eab9d6084affe40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
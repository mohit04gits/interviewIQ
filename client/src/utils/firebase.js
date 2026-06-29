// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY, //accessing api key using .env
  authDomain: "interviewiq-8ae0a.firebaseapp.com",
  projectId: "interviewiq-8ae0a",
  storageBucket: "interviewiq-8ae0a.firebasestorage.app",
  messagingSenderId: "819591519504",
  appId: "1:819591519504:web:7e53e854d620cc71cdd995"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider() ///to understand this
export {auth,provider}
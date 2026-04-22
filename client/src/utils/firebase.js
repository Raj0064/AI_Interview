// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aiinterviewiq-e8587.firebaseapp.com",
  projectId: "aiinterviewiq-e8587",
  storageBucket: "aiinterviewiq-e8587.firebasestorage.app",
  messagingSenderId: "957828171868",
  appId: "1:957828171868:web:68a92ad523b74e005e3e99",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

const provider=new GoogleAuthProvider()

export {auth,provider}

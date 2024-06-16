// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a4570.firebaseapp.com",
  projectId: "mern-blog-a4570",
  storageBucket: "mern-blog-a4570.appspot.com",
  messagingSenderId: "557953211202",
  appId: "1:557953211202:web:861a85426d8f2295ab06db"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
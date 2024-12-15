// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXoNQ1afdDbhMPhFtn113esR3wPlYbVpQ",
  authDomain: "smart-home-b7e83.firebaseapp.com",
  projectId: "smart-home-b7e83",
  storageBucket: "smart-home-b7e83.firebasestorage.app",
  messagingSenderId: "396138473757",
  appId: "1:396138473757:web:30d98e2b6c9ef8c6d759f4",
  measurementId: "G-76KR4HNHMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

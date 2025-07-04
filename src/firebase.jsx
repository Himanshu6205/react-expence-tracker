// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX1ooKCnIbkG_M1PcFCS2uJY1dMdRAgmc",
  authDomain: "expence-checker-f5576.firebaseapp.com",
  projectId: "expence-checker-f5576",
  storageBucket: "expence-checker-f5576.firebasestorage.app",
  messagingSenderId: "930368607883",
  appId: "1:930368607883:web:9f53a90cf8d7ebc6e3268e",
  measurementId: "G-QE15Q6VW56",
};

const app = initializeApp(firebaseConfig);

// Export only what you need
export const auth = getAuth(app);

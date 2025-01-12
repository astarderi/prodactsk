// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbn2AusULbl9zciebA7UZZYYPAdfhIQzY",
  authDomain: "databaseastar.firebaseapp.com",
  projectId: "databaseastar",
  storageBucket: "databaseastar.firebasestorage.app",
  messagingSenderId: "70481469156",
  appId: "1:70481469156:web:0f0fe907b22889be9896f1",
  measurementId: "G-FMH213VSGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

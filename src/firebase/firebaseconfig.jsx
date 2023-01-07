// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJAFyJZVPHreS20GoLVz2Patai97rIzzA",
  authDomain: "typemaster-e5094.firebaseapp.com",
  projectId: "typemaster-e5094",
  storageBucket: "typemaster-e5094.appspot.com",
  messagingSenderId: "137783794221",
  appId: "1:137783794221:web:8f415c4b926454b298b6a4",
  measurementId: "G-YP9M2740KZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
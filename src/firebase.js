import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD__orG0-Dp1ROuRLPVtYaaj2l9AecFIeY",
  authDomain: "perfumegallery-25a79.firebaseapp.com",
  projectId: "perfumegallery-25a79",
  storageBucket: "perfumegallery-25a79.appspot.com",
  messagingSenderId: "998065697833",
  appId: "1:998065697833:web:1d9d049fb39c274222d838"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
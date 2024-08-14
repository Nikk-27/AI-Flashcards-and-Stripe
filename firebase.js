// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHXObHNXdSxOmxpnInWDD9Up4t-AKdSGA",
  authDomain: "flashcard-saas-44b10.firebaseapp.com",
  projectId: "flashcard-saas-44b10",
  storageBucket: "flashcard-saas-44b10.appspot.com",
  messagingSenderId: "1030355157266",
  appId: "1:1030355157266:web:8099bed52768f2f00a33cb",
  measurementId: "G-1GTMF7RV59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
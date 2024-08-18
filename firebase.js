import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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
// const analytics = getAnalytics(app);
const db = getFirestore(app); // Correct import for Firestore

export { db };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtVEWdhQkf8-uCyX4wUPsGg-8HK-4LAb8",
  authDomain: "react-ecommerce-bd-f58e9.firebaseapp.com",
  projectId: "react-ecommerce-bd-f58e9",
  storageBucket: "react-ecommerce-bd-f58e9.firebasestorage.app",
  messagingSenderId: "714372910312",
  appId: "1:714372910312:web:63364170a80bda73e88d5d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
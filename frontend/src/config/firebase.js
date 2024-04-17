import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyB7CuYhrpXdo68RIl5eotTHNUMuxV8iJMw",
    authDomain: "spwbp1.firebaseapp.com",
    projectId: "spwbp1",
    storageBucket: "spwbp1.appspot.com",
    messagingSenderId: "1024451624170",
    appId: "1:1024451624170:web:65b88927430ac8df7f6b93",
    measurementId: "G-LM3MGM9DHZ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
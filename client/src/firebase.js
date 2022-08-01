import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tabtab-ba8fc.firebaseapp.com",
  projectId: "tabtab-ba8fc",
  storageBucket: "tabtab-ba8fc.appspot.com",
  messagingSenderId: "705177644723",
  appId: "1:705177644723:web:589d5ffb6dd417057b4ac6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

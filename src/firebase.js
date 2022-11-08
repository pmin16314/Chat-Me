import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ3UP64U84Z_ZEfQUtCpRsrnZ1oUGn0VI",
  authDomain: "chatme-60d8e.firebaseapp.com",
  projectId: "chatme-60d8e",
  storageBucket: "chatme-60d8e.appspot.com",
  messagingSenderId: "1068634933693",
  appId: "1:1068634933693:web:e693aa22a3d8ccf2c3aad4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

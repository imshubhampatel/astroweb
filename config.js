import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlMMLmKqd876nQj8wWFWifA0U2huqCfmo",
  authDomain: "astrochrchafirebase.firebaseapp.com",
  projectId: "astrochrchafirebase",
  storageBucket: "astrochrchafirebase.appspot.com",
  messagingSenderId: "47393820453",
  appId: "1:47393820453:web:3b607c10d409c7af24d4cc",
  measurementId: "G-NPJ61GHS5N",
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

export { firebase,db,auth };

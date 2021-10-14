import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhEzIc4Y5DTJUOj-sNdd3YF0pGnGCFc-8",
  authDomain: "testastrochrcha.firebaseapp.com",
  projectId: "testastrochrcha",
  storageBucket: "testastrochrcha.appspot.com",
  messagingSenderId: "1011386431348",
  appId: "1:1011386431348:web:a70f05b4ece797fb61de21",
  measurementId: "G-MF096BCRNH",
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

export { firebase,db,auth };

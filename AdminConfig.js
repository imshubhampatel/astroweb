import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhEzIc4Y5DTJUOj-sNdd3YF0pGnGCFc-8",
  authDomain: "testastrochrcha.firebaseapp.com",
  projectId: "testastrochrcha",
  storageBucket: "testastrochrcha.appspot.com",
  messagingSenderId: "1011386431348",
  appId: "1:1011386431348:web:d9232d08cce1a4ec61de21",
  measurementId: "G-SDVW3MH06Y",
};

const adminfirebase = initializeApp(firebaseConfig,"secondary");

export { adminfirebase };

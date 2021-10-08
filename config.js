import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBlMMLmKqd876nQj8wWFWifA0U2huqCfmo",
  authDomain: "astrochrchafirebase.firebaseapp.com",
  projectId: "astrochrchafirebase",
  storageBucket: "astrochrchafirebase.appspot.com",
  messagingSenderId: "47393820453",
  appId: "1:47393820453:web:3b607c10d409c7af24d4cc",
  measurementId: "G-NPJ61GHS5N",
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

export default firebase;

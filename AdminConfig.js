import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword , GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_MEASUREMENT_ID,
};

const adminfirebase = initializeApp(firebaseConfig,"secondary");
const db = getFirestore(adminfirebase);
const auth_2 = getAuth(adminfirebase);
var provider = new GoogleAuthProvider(); 

export { adminfirebase,db,auth_2 as auth_2 , provider };


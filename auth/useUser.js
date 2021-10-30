import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import firebase from '../config';
import {signOut, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import {  auth } from "../config";

import initFirebase from '../config';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie
} from './userCookie';


export const mapUserData = async user => {
  const { uid, email } = user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    token
  };
};

  
const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const logout = async () => {
    return signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = onIdTokenChanged(auth,async userToken => {
        if (userToken) {
          const userData = await mapUserData(userToken);
          setUserCookie(userData);
          setUser(userData);
        } else {
          removeUserCookie();
          setUser();
        }
      });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      return;
    }
    setUser(userFromCookie);
    return () => cancelAuthListener;
  }, []);

  return { user, logout };
};

export { useUser };
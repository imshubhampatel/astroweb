import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {firebase} from '../config'
import {  signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MobileNavigation from "./NavBar/MobileNavigation";
import Navigation from "./NavBar/Navigation";

import styles from "../styles/components/Navbar.module.css"

const auth = getAuth(firebase)
const logout = () => {
  signOut(auth).then(console.log("logiout"));
};
function Navbar() {

  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, Authuser => {
     setUser(Authuser);
    },[user])
    
  },[user])

    return (
      <div className={styles.NavBar} >
        <div className={styles.logoContainer} >
        <Link href="/"><a>          <Image src="/images/logo_tranparent.png" width="60" height="60" /></a></Link>
        </div>
        <Navigation/>
        <MobileNavigation/>
      </div>
    );
  
 }
export default Navbar;



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


function Navbar() {
    return (
      <div className={styles.NavBar} >
  
        <div className={styles.logoContainer} >
        <Link href="/"><a><Image src="/images/logo_transparent.png" width="80" height="80" /></a></Link>
        </div>
        <Navigation/>
        <MobileNavigation/>
      </div>
    );
  
 }
export default Navbar;



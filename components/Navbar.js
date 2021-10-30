import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {firebase} from '../config'
import {  signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">
              <Image
                src="/astrochrchalogo.png"
                width="100"
                height="100"
                className="d-inline-block align-top"
                alt=""
              />{" "}
            </a>
          </Link>
          <div className="navbar-header">
            <h2 className="navbar-brand" href="#">
              AstroChrcha
            </h2>
          </div>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
              <a href="#" className="nav-item nav-link active">
                Home
              </a>
              <a href="#" className="nav-item nav-link">
                About Us
              </a>
              <a href="#" className="nav-item nav-link">
                Contact
              </a>
            </div>
            {user ? (
              <button className="btn btn-primary"  onClick={() => logout()}>
                Logout
              </button>
            ) : (
              <div className="navbar-nav ms-auto">
                <Link href="/signin">
                  <a className="nav-item nav-link">Astrologer Login/Register</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  
 }
export default Navbar;

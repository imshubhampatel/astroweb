import React, { useState, useEffect } from "react";
import { adminfirebase, auth_2 ,provider} from "../../AdminConfig";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import router from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "../../styles/components/RegistrationForm2.module.css";

function signIn() {
    useEffect(() => {
        onAuthStateChanged(auth_2, (Authuser) => {
          if (Authuser) router.replace("/user");
        });
      }, []);
    
    const signin = () => {
        signInWithPopup(auth_2,provider).then((result)=>
        {
          router.replace("/user");
        }).catch(alert);
    }
  return (
    <div className={`${styles.baseContainer}`}>
    <div className="container-fluid bg-white">
          <div className="row">
          <div className="col-sm-4" style={{background:"#FBE5AD"}}>
              <div className={`${styles.imageContainer}`} />
            </div>           
           <div className="col">
            <center>
            <div className="col-sm-8 my-4">
              <p className="mx-sm-auto text-sm-center">
                Hey , Welcome to Dreshkan !
                <br></br>
                                          
              </p>

              <h5>Login/Signup</h5>
                <button className="btn btn-primary" 
                onClick={signin}>Login with Google</button>
                <br/>
                
            </div>
            
            </center>
            </div>
          </div>
             
        </div>
        </div>)
}

export default signIn;
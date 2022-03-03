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

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function SignIn() {
  const [countryCode, setcountryCode] = useState("+91")
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [currentPage , setCurrentPage] = useState(0)

    useEffect(() => {
        onAuthStateChanged(auth_2, (Authuser) => {
          if (Authuser) router.replace("/user");
        });
      }, []);
    
    const signinWithGoogle = () => {
        signInWithPopup(auth_2,provider).then((result)=>
        {
          router.replace("/user");
        }).catch(alert);
    }
    const signin = () => {
      if (mynumber === "") {
         Toast.fire({
           icon: "error",
           title: "Please Enter Phone Number",
         });
        return;
      }
  
      let verify = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth_2
      );
      const number = countryCode + mynumber
  
      signInWithPhoneNumber(auth_2, number, verify)
        .then((result) => {
          setfinal(result);
          // alert("code sent");
  
          Toast.fire({
            icon: "info",
            title: "Code Sent",
          });
  
          setshow(true);
        })
        .catch((err) => {
          // alert(err);
          Toast.fire({
            icon: "error",
            title: err,
          });
          window.location.reload();
        });
    };
  
    // Validate OTP
    const ValidateOtp = () => {
      if (otp === null || final === null) return;
      final
        .confirm(otp)
        .then((result) => {
          // success
          router.push("/user");
        })
        .catch((err) => {
          alert("Wrong code");
        });
    };
  return (
    <div className={`${styles.baseContainer}`}>
    <div className="container-fluid bg-white">
          <div className="row">
          <div className="col-sm-4" style={{background:"#FBE5AD"}}>
              <div className={`${styles.imageContainer}`} />
            </div>           
           <div className="col">
           {currentPage == 0 ?  <center>
            <div className="col-sm-8 my-4">
              <p className="mx-sm-auto text-sm-center">
               <h4> Hey , Welcome to Dreshkan !</h4>
                <br></br>
                                          
              </p>
              <hr/>

              <h5>Login/Signup</h5>
              <hr/>

                <button className={`btn btn-primary ${styles.loginButton}`}
                onClick={signinWithGoogle}>Continue with Google</button>
                <br/>
                <br/>

                <button className={`btn btn-primary ${styles.loginButton}` }
                onClick={()=> {
                  setCurrentPage(1)
                }}>Continue with Phone Number</button>

                
            </div>
            
            </center> :  <center>
            <div className="col-sm-8 my-4">
              <div             className={`${styles.container}`}
>
          <div
            style={{ display: !show ? "block" : "none" }}
            className={"form-group"}
          >
            <label htmlFor="phoneNumber">Please Enter your Phone Number</label>
            <div className="row">
              <div className="col-3">
                <select
                  className="form-control"
                  onChange={(e) => setcountryCode(e.target.value)}
                  defaultValue="+91"
                >
                  <option selected="selected" value="+91">
                    +91
                  </option>
                  <option value="+16">+16</option>
                  <option value="+12">+12</option>
                  <option value="+61">+61</option>
                  <option value="+44">+44</option>
                  <option value="+49">+49</option>
                  <option value="+61">+1</option>
                </select>
              </div>
              <div className="col-9">
                <input
                  value={mynumber}
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  onChange={(e) => {
                    setnumber(e.target.value);
                  }}
                  placeholder="phone number"
                />
              </div>
            </div>
            <br />
            <br />
            <div id="recaptcha-container"></div>
            <div>
              <button className="btn btn-primary" onClick={signin}>
                Send OTP
              </button>
            </div>
          </div>
          <div style={{ display: show ? "block" : "none" }}>
            <input
              type="text"
              placeholder={"Enter your OTP"}
              className="form-control"
              onChange={(e) => {
                setotp(e.target.value);
              }}
              maxLength="6"
            ></input>
            <br />
            <br />
            <button className="btn btn-primary" onClick={ValidateOtp}>
              Verify
            </button>
          </div>
          </div>
          </div>
        </center> }
          
            </div>
          </div>
             
        </div>
        </div>)
}

export default SignIn;
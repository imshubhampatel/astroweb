import React, { useState, useEffect } from "react";
import { firebase, auth } from "../config";
import styles from "../styles/Home.module.css";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";
import router from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

const FirebaseAuth = () => {
  const [countryCode, setcountryCode] = useState("+91")
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (Authuser) => {
      if (Authuser) router.replace("/astrologer");
    });
  }, []);

  // Sent OTP
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
      auth
    );
    const number = countryCode + mynumber

    signInWithPhoneNumber(auth, number, verify)
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
        router.push("/astrologer");
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };
  return (
    <div className={styles.container}>
      <h2>Sign/Register</h2>
      <div>
        <center>
          <div
            style={{ display: !show ? "block" : "none" }}
            className="form-group"
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
        </center>
      </div>
    </div>
  );
};

export default FirebaseAuth;

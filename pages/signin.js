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

const FirebaseAuth = () => {
  const [countryCode, setcountryCode] = useState("+91")
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (Authuser) => {
      if (Authuser) router.push("/astrologer");
    });
  }, []);

  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

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
        alert("code sent");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
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
            {countryCode}
            <div className="row">
              <div className="col-3">
                <select
                  className="form-control"
                  onChange={(e) => setcountryCode(e.target.value)}
                >
                  <option selected="selected" value="+91">
                    +91
                  </option>
                  <option value="+61">+61</option>
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

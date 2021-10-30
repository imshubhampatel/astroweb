import React, { useState, useEffect } from "react";
import { firebase } from "../../config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import router from "next/router";

const auth = getAuth(firebase);

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (Authuser) => {
      if (Authuser) router.replace("/admin");
    });
  }, []);

  // Sent OTP
  const signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("/admin");
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };
  return (
    <div className="container vh-100">
      <h2>Sign/Register</h2>
      <div>
        <form onSubmit={signin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              value={email}
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              value={password}
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <br />
          <div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;

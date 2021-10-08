import React, { useEffect } from "react";
import router from "next/router";
import "firebase/auth";
import firebase from "../config";

const auth = firebase.auth();

const withAuth = (Component) => (props) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/signin");
      }
    });
  }, []);

  return (
    <div>
      <Component {...props}></Component>
    </div>
  );
};

export default withAuth;

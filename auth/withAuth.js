import React, { useEffect } from "react";
import router from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import {  auth } from "../config";

const withAuth = (Component) => (props) => {
  useEffect(() => {
    onAuthStateChanged(auth,(authUser) => {
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

import React, { useEffect } from "react";
import router from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import {  auth } from "../config";
import { auth_2 } from "../AdminConfig";


const withAuth = (Component, type) => (props) => {
  useEffect(() => {
    if(type=="astrologer") {
    onAuthStateChanged(auth,(authUser) => {
      if (!authUser) {
        router.replace("/signin");
      }
    });
  }
  else {
    onAuthStateChanged(auth_2,(authUser) => {
      if (!authUser) {
        router.replace("/user/signin");
      }
    });

  }
}
  , []);

  return (
    <div>
      <Component {...props}></Component>
    </div>
  );
};

export default withAuth;

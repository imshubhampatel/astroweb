import React, { useEffect, useState } from "react";
import router from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebase } from "../config";
import { isAdmin, isSubAdmin } from "./utils";
const withAdminAuth = (Component) => (props) => {
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setLoading(true);
      if (!authUser) {
        router.replace("/admin/signin");
      } else {
        isAdmin(authUser.uid).then((e) => {
          if (e)
          {          
            // console.log("You are admin")
            setLoading(false);
          }
          else {
            isSubAdmin(authUser.uid).then(e => {
              if (e)
              {
                // console.log("You are Subadmin");
                setLoading(false);
              } else {
                alert("Access Not allowed");
                router.replace("/");
              }
            });
          }
        });
      }
    });
    setLoading(false);
  }, []);

  return (
    <div>{loading ? "Loading ...." : <Component {...props}></Component>}</div>
  );
};

export default withAdminAuth;

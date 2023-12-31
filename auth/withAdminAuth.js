import React, { useEffect, useState } from "react";
import router from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebase } from "../config";
import { isAdmin, isSubAdmin , getEmp } from './utils'


const withAdminAuth = (Component , perm ) => (props) => {

  var [ loading, setLoading ] = useState(true);  
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {    
                                                 
      setLoading(true)
      if (!authUser) {
        router.replace("/admin/signin");
      } else {
        isAdmin(authUser.uid).then((e) => {
          if (e)
          {     
            setLoading(false);
          }
          else {
            isSubAdmin(authUser.uid).then(e => {
              if (e)
              {
                if(perm) {
                getEmp(authUser.uid).then((e)=> {
                  // console.log(e);
                  if(!e.permissions[perm]) {
                    alert("You are not allowed to manage this!");
                    router.replace("/admin");
                  }   
                });
              }
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

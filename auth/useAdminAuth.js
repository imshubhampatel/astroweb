import React, { useEffect,useState } from "react";
import router from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebase } from "../config";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
const db = getFirestore(firebase)

const withAdminAuth = (Component) => (props) => {
  // const []
  var [loading, setLoading] = useState(true)
  
  async function isAdmin(uid) {
    const docRef = doc(db, "security_groups/admin/admin/", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Admin:", docSnap.data());
      return true; 
    } else {
      console.log("You are not admin!");
      return false;
    }
  }

  async function isSubAdmin(uid) {
    const docRef = doc(db, "security_groups/subadmin/subadmin/", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Sub Admin", docSnap.data());
      return true;
    } else {
      console.log("Not a SubAdmin");
      return false;
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setLoading(true)
      if (!authUser) {
        router.push("/admin/signin");
      } else {
        isAdmin(authUser.uid).then((e) => {
          if (e)
          {

            console.log("You are admin")
                setLoading(false);

          }
          else {
            isSubAdmin(authUser.uid).then(e => {
              if (e)
              {
                console.log("You are Subadmin");
                    setLoading(false);

              }
              else {
                alert("Access Not allowed");
                router.push("/");
              }
            })
          }
        })
      }
    });
    setLoading(false);

  }, []);


  return (
    <div>
      {loading ? "Loading ....":<Component {...props}></Component>}
    </div>
  );
};

export default withAdminAuth;

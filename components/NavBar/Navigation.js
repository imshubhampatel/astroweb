import NavLinks from "./NavLinks";
import styles from "../../styles/components/Navbar.module.css";
import {firebase} from '../../config'
import {adminfirebase} from '../../AdminConfig'

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged , signOut} from "firebase/auth";
import {isUser} from '../../auth/utils'
const auth = getAuth(firebase);
const adminAuth = getAuth(adminfirebase);

const logout = () => {
  signOut(auth).then(console.log("logout"));
}
const logoutUser = () => {
  signOut(adminAuth).then(console.log("logout")).catch();
};

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isCurrentAstrologer, setIsCurrentAstrologer] = useState(false);
 
  useEffect(() => {
    onAuthStateChanged(adminAuth, Authuser => {
      if(Authuser) {
         setUser(Authuser);
         setIsCurrentUser(true);
         setIsCurrentAstrologer(false);
      }
      else {
        onAuthStateChanged(auth, User => {
          setUser(User);
          setIsCurrentUser(false);
          setIsCurrentAstrologer(true);
        })
      }
    });
  },[]);

  return (
    <nav className={styles.Navigation}>
      <NavLinks user={user}  isCurrentUser={isCurrentUser} isCurrentAstrologer={isCurrentAstrologer}   signOut={ isCurrentUser? logoutUser : logout}/>
    </nav>
  );
};

export default Navigation;

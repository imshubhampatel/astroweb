import NavLinks from "./NavLinks";
import styles from "../../styles/components/Navbar.module.css";
import {firebase} from '../../config'
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged , signOut} from "firebase/auth";
const auth = getAuth(firebase);

const logout = () => {
  signOut(auth).then(console.log("logout"));
};

const Navigation = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, Authuser => {
     setUser(Authuser);
    },[user])
  },[user]);

  return (
    <nav className={styles.Navigation}>
      <NavLinks user={user} signOut={logout}/>
    </nav>
  );
};

export default Navigation;

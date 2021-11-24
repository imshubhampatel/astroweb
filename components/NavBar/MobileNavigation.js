import NavLinks from "./NavLinks";
import styles from "../../styles/components/Navbar.module.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebase } from "../../config";
import { useEffect, useRef, useState } from "react";

import { FiMenu } from "react-icons/fi";

const logout = () => {
  signOut(auth).then(console.log("logout"));
};

const auth = getAuth(firebase);

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (Authuser) => {
        setUser(Authuser);
      },
      [user]
    );
  }, [user]);

  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <nav className={styles.MobileNavigation}>
      <FiMenu
        className={styles.HamBurger}
        size="40px"
        color="white"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div ref={ref}>
          <NavLinks
            user={user}
            signOut={logout}
            isMobile={true}
            closeMobileMenu={closeMenu}
          />
        </div>
      )}
    </nav>
  );
};

export default MobileNavigation;

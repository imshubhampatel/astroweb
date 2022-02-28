import NavLinks from "./NavLinks";
import styles from "../../styles/components/Navbar.module.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebase } from "../../config";
import { useEffect, useRef, useState } from "react";
import { adminfirebase } from "../../AdminConfig";
import { FiMenu } from "react-icons/fi";
const auth = getAuth(firebase);
const adminAuth = getAuth(adminfirebase);

const logout = () => {
  signOut(auth).then(console.log("logout"));
};
const logoutUser = () => {
  signOut(adminAuth).then(console.log("logout")).catch();
};

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isCurrentAstrologer, setIsCurrentAstrologer] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(adminAuth, (Authuser) => {
      if (Authuser) {
        setUser(Authuser);
      } else {
        onAuthStateChanged(auth, (User) => {
          setUser(User);
          setIsCurrentUser(false);
          setIsCurrentAstrologer(true);
        });
      }
    });
  }, []);

  const ref = useRef();
  const refMenuButton = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        open &&
        ref.current &&
        !refMenuButton.current.contains(e.target) &&
        !ref.current.contains(e.target)
      ) {
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
      <div ref={refMenuButton}>
        <FiMenu
          className={styles.HamBurger}
          size="40px"
          color="black"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <div ref={ref}>
          <NavLinks
              user = {user}
            isCurrentUser={isCurrentUser}
            isCurrentAstrologer={isCurrentAstrologer}
            signOut={isCurrentUser ? logoutUser : logout}
            isMobile={true}
            closeMobileMenu={closeMenu}
          />
        </div>
      )}
    </nav>
  );
};

export default MobileNavigation;

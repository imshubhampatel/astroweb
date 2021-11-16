import NavLinks from "./NavLinks";
import styles from "../../styles/components/Navbar.module.css";

import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className={styles.MobileNavigation}>
      <FiMenu
        className={styles.HamBurger}
        size="40px"
        color="white"
        onClick={() => setOpen(!open)}
      />
      {open && <NavLinks isMobile={true} closeMobileMenu={closeMenu} />}
    </nav>
  );
};

export default MobileNavigation;

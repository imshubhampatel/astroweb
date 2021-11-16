import Link from "next/link";
import { motion } from "framer-motion";

const NavLinks = (props) => {
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };

  return (
    <ul>
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{delay: 0.05}}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
      </motion.li>

      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{delay: 0.10}}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link href="/">
          <a>Join As Astrologer </a>
        </Link>
      </motion.li>

      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{delay: 0.15}}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link href="/">
          <a>Contact Us</a>
        </Link>
      </motion.li>
    </ul>
  );
};

export default NavLinks;

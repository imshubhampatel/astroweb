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
        transition={{ delay: 0.05 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
      </motion.li>
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.05 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link href="/astrologerlisting">
          <a>Our Astrologers</a>
        </Link>
      </motion.li>
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.05 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link href="/bloglisting">
          <a>Blogs</a>
        </Link>
      </motion.li>
      {props.isCurrentUser == true && props.user ? (
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.05 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
            <Link href="/user">
            <a>Dashboard</a>
            </Link>
      </motion.li>
        ) : 
        props.isCurrentAstrologer == true && props.user ?
          <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.05 }}
          onClick={() => props.isMobile && props.closeMobileMenu()}
        >
              <Link href="/astrologer">
              <a>Dashboard</a>
              </Link>
        </motion.li> : null
    }

      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.15 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        <Link href="/Contactus">
          <a>Contact Us</a>
        </Link>
      </motion.li>

      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.15 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
        {props.user ? (
          <a onClick={props.signOut}>Logout</a>
        ) : (<>
       
         
        <Link href="/user/signin">
          <a>Join As User </a>
        </Link>
                  </>
        )}
      </motion.li>
      {props.user ? (
        null
        ) : (<>
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.15 }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
      >
          <Link href="/signin">
          <a>Join As Astrologer </a>
        </Link>
                
      </motion.li>
      </>
        )}
    </ul>
  );
};

export default NavLinks;

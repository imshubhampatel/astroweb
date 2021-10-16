import styles from "../../styles/adminPanel/sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { firebase } from "../../config";
import { signOut, getAuth ,onAuthStateChanged } from "firebase/auth";
import { BsGearWideConnected } from "react-icons/bs";
import { FaRegUser, FaHistory } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { GiSettingsKnobs, GiNetworkBars } from "react-icons/gi";
import {
  HiOutlineFolderOpen,
  HiOutlineNewspaper,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import {useState,useEffect} from 'react'
const auth = getAuth(firebase);
const logout = () => {
  signOut(auth).then(console.log("logiout"));
};

export default function Sidebar(props) {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (Authuser) => {
        setUser(Authuser);
      },
      [user]
    );
  }, [user]);
  return (
    <div className={`${styles.sidebar_base}`}>
      <div className="d-flex  align-content-center">
        <div className={`${styles.logoHolder}`}>
          <Image
            src="/astrochrchalogo.png"
            layout="fixed"
            width={48}
            height={48}
          />
        </div>

        <Link href="/admin">
          <a>
            <div className={`${styles.mainText}`}>Admin Panel</div>
          </a>
        </Link>

        <div className={`ms-auto ${styles.center_div}`}>
          <BsGearWideConnected />
        </div>
      </div>

      {/* 
      
      Main Buttons Panel
      
      */}
      <div className={`${styles.button_wrapper}`}>
        {/* User Management Button  */}
        <Link href="/admin/usermanagement">
          <a>
            <div
              className={` ${styles.button}  ${
                props.active_page === "0" ? styles.buttonActive : ""
              }   ${styles.center_div}`}
            >
              <span>
                <FaRegUser />
              </span>

              <span className={`${styles.buttonText}`}>
                User Management System
              </span>

              <span className="ms-auto">
                <IoIosArrowForward />
              </span>
            </div>
          </a>
        </Link>

        {/* Broadcast Management Button  */}
        <div
          className={`${styles.button}  ${
            props.active_page === "1" ? styles.buttonActive : ""
          }  ${styles.center_div} my-2`}
        >
          <span>
            <HiOutlineFolderOpen />
          </span>

          <span className={`${styles.buttonText}`}>
            {"Manage Broadcasting Sessions & Blogs"}
          </span>

          <span className="ms-auto">
            <IoIosArrowForward />
          </span>
        </div>

        {/* Astrologer Management Button  */}
        <Link href="/admin/astrologermanagement">
          <a>
            <div
              className={`${styles.button}  ${
                props.active_page === "2" ? styles.buttonActive : ""
              }  ${styles.center_div} my-2`}
            >
              <span>
                <GiSettingsKnobs />
              </span>

              <span className={`${styles.buttonText}`}>
                Astrologer Management System
              </span>

              <span className="ms-auto">
                <IoIosArrowForward />
              </span>
            </div>
          </a>
        </Link>

        {/* Employee Management Button  */}
        <Link href="/admin/employeemanagement">
          <a>
            <div
              className={`${styles.button} ${
                props.active_page === "3" ? styles.buttonActive : ""
              }   ${styles.center_div} my-2`}
            >
              <span>
                <GiNetworkBars />
              </span>

              <span className={`${styles.buttonText}`}>
                Employee Management System
              </span>

              <span className="ms-auto">
                <IoIosArrowForward />
              </span>
            </div>
          </a>
        </Link>

        {/* Store Management Button  */}
        <div
          className={`${styles.button}  ${
            props.active_page === "3" ? styles.buttonActive : ""
          }  ${styles.center_div} my-2`}
        >
          <span>
            <HiOutlineNewspaper />
          </span>

          <span className={`${styles.buttonText}`}>Manage Store</span>

          <span className="ms-auto">
            <IoIosArrowForward />
          </span>
        </div>

        {/* Wallet Management Button  */}
        <div
          className={`${styles.button} ${
            props.active_page === "4" ? styles.buttonActive : ""
          }   ${styles.center_div} my-2`}
        >
          <span>
            <HiOutlineShoppingBag />
          </span>

          <span className={`${styles.buttonText}`}>Manage Wallet</span>

          <span className="ms-auto">
            <IoIosArrowForward />
          </span>
        </div>

        {/* History Button  */}
        <div
          className={`${styles.button}  ${
            props.active_page === "4" ? styles.buttonActive : ""
          }  ${styles.center_div} mt-2`}
        >
          <span>
            <FaHistory />
          </span>

          <span className={`${styles.buttonText}`}>Astro Histry</span>

          <span className="ms-auto">
            <IoIosArrowForward />
          </span>
        </div>
        <div className="">
          {user ? (
            <button className="btn btn-primary" onClick={() => logout()}>
              Logout
            </button>
          ) : (
            <div className="navbar-nav ms-auto">
              <Link href="/admin/signin">
                <a className="nav-item nav-link">Login</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

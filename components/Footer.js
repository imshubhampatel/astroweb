import styles from "../styles/components/Footer.module.css";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <>
      <footer className="">
        <div className={`${styles.container} d-flex flex-column `}>
          {/* Social Icons  */}
          <div className="d-flex   justify-content-center gap-3 my-3">
            <div style={{ fontSize: "22px" }}>
              <AiFillInstagram />
            </div>

            <div style={{ fontSize: "21px" }}>
              <BsFacebook />
            </div>

            <div style={{ fontSize: "22px" }}>
              <AiFillYoutube />
            </div>
          </div>

          {/* Links  */}
          <div className=" d-flex justify-content-center gap-3 my-3">
            <Link href="/">
              <a>Contact Us</a>
            </Link>

            <Link href="/">
              <a>Refund Policy</a>
            </Link>
          </div>

          {/* Bottom text   */}
          <div className="text-center">
            Copyright © 2021 Drekshan.
            <p className="mt-2">
              All Rights Reserved. Use of this website signifies your agreement
              to the Terms of Use, Drekshan Privacy Policy .
            </p>
          </div>

          {/* Image  */}
          <div className="d-flex justify-content-center mb-3 ">
            <Image src="/images/logo_tranparent.png" width="64" height="64" />
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;

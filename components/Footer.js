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
           <Link href="https://www.instagram.com/dreshkan/"><a>
           <div style={{ fontSize: "22px" }}>
              <AiFillInstagram />
            </div>
            </a></Link>
         
            <Link href="https://www.facebook.com/Officialdreshkan"><a>
            <div style={{ fontSize: "21px" }}>
            <BsFacebook />
          </div>
            </a></Link>
           
          <Link href="https://www.youtube.com/channel/UCiwoSk0-TK-hY2Ox98V2TsA"><a>
          <div style={{ fontSize: "22px" }}>
              <AiFillYoutube />
            </div>
            </a></Link>
            
          </div>

          {/* Links  */}
          <div className=" d-flex flex-column  align-items-center flex-md-row justify-content-center gap-3 my-3">
    
            <Link href="/privacypolicy">
              <a>Privacy Policy</a>
            </Link>
            <Link href="/refundncancellationpolicy">
              <a>Refund and Cancellation policy</a>
            </Link>
            <Link href="/termsncondition">
              <a>Terms and Conditions</a>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
              <a> Link to the App </a>
            </Link>
          </div>

          {/* Bottom text   */}
          <div className="text-center">
            Copyright © 2021 Astrochrcha.
            <p className="mt-2">
              All Rights Reserved. Use of this website signifies your agreement
              to the <Link href="/termsncondition">
              <a className="text-decoration-underline" >Terms {"&"} Conditions</a>
            </Link> and Dreshkan (a Astrochrcha Product){" "}   
              <Link href="/privacypolicy">
              <a className="text-decoration-underline" >Privacy Policy</a>
            </Link> .
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

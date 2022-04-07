import Head from "next/head";
import Image from "next/image";
import styles from "../styles/pages/index.module.css";
import Link from "next/link";
// import Pixel from '../components/pixel'
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import HeroImage from "../public/images/mascot.png";
import Logo from "../public/images/logo_transparent.png";
import IphoneMockup from "../public/images/iphone_mockup.svg";
import GooglePlayBadge from "../public/images/google-play-badge.png";

import { Faqs } from "../components/faqComponent/Faqs";
import LaunchSoonSubscribe from "../components/LaunchSoonSubscribe";
import { BsChatSquareDots, BsBarChart } from "react-icons/bs";
import { FiPhone, FiShoppingCart } from "react-icons/fi";
import { MdOndemandVideo } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiPlanet } from "react-icons/bi";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { firebase } from "../config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);

export default function Home() {
      useEffect(() => {
        editPricingCategoryView();
      }, []);
  async function markInterested(email) {
    const astros = doc(collection(db, "interested"));
    await setDoc(astros, {
      email: email,
      timestamp: new Date(),
    });
  }
  const editPricingCategoryView = () => {
    MySwal.fire({
      showConfirmButton: false,
      customClass: {
        htmlContainer: styles.maincontainer,
      },
      html: (
        <div >
          <div className={styles.close} > 
          <CloseIcon style={{marginLeft: "auto"}}
              onClick={() => {
                Swal.clickConfirm();
                }}/>
            </div> 
            
            <div>
              <Image height={140} width={140} src={Logo}  />
              <h2 className={styles.heading}>GET MORE OF DRESHKAN </h2>
            </div>    
            <hr/>
            <h4 className={styles.subheading}>A PLETHORA OF SERVICES IN THE APP </h4>
            <hr/>
            <div className={styles.mainbadge} >
              <div className={styles.badge}>
              <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
                <a>
                  <Image  height={65} width={175}src={GooglePlayBadge} />
                </a>
              </Link>
              </div>
            </div>
            <h6 className={styles.subpartheading}>DRESHKAN- A PRODUCT OF ASTROCHARCHA </h6>
        </div>
      ),
    });
  };

  return (
    <>
      <Head>
        <title>Dreshkan</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Dreshkan is an all-in-one
                solution for astrology and horoscopic needs. Get ready to join
                us on our journey in world of astrology. We will be providing
                plethora of services from live consultation to match making
                reports. Do not worry about your future as we are here to
                accompany you..."
        />
        <meta
          name="og:title"
          property="og:title"
          content="Dreshkan is an all-in-one
                solution for astrology and horoscopic needs."
        />
        <link rel="canonical" href="https://www.dreshkan.com/" />
      </Head>

      <main>
        <div className={` container-fluid ${styles.container}`}>
          <div className={`row justify-content-center align-items-center pb-5`}>
            {/* Image   */}
            <div className={` col-9  col-md-3 ${styles.heroContainer}`}>
              <Image src={HeroImage} />
            </div>

            {/* Text Block  */}

            <div
              className={`col-12 col-md-7 p-md-5 order-md-first text-center text-md-start d-flex flex-column justify-content-center align-items-center justify-content-md-start align-items-md-start`}
            >
              <h1 className={`${styles.launchingHeading} my-3`}>
                Connect with Astrologers!
              </h1>

              <p
                className={`mb-1 text-center text-md-start ${styles.mainText} `}
              >
                Dreshkan is product by Astrochrcha and it is an all-in-one
                solution for astrology and horoscopic needs. Get ready to join
                us on our journey in world of astrology. We will be providing
                plethora of services from live consultation to match making
                reports. Do not worry about your future as we are here to
                accompany you...
              </p>

              <div className={styles.badge_container}>
                <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
                  <a>
                    <Image src={GooglePlayBadge} />
                  </a>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Services Container */}

        <div className={`${styles.services_container} `}>
          {/* Title Text  */}
          <h2 className={styles.containerTitle}>Our Services</h2>

          {/* Cards */}
          <div className={styles.cards_container}>
            <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
              <a>
                <div className={`${styles.card} ${styles.chat_card}`}>
                  {/* Icon  */}
                  <div className={styles.icon}>
                    <BsChatSquareDots />
                  </div>

                  {/* Title  */}
                  <h3 className={styles.title}>Chat With Astrologers</h3>

                  {/* Text  */}
                  <p className={styles.text}>
                    Chat with re-knowned astrologers at minimial fees.
                  </p>
                </div>
              </a>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
              <a>
                <div className={`${styles.card} ${styles.call_card}`}>
                  {/* Icon  */}
                  <div className={styles.icon}>
                    <FiPhone />
                  </div>

                  {/* Title  */}
                  <h3 className={styles.title}>Talk to Astrologers</h3>

                  {/* Text  */}
                  <p className={styles.text}>
                    Connect with astrologers on video and voice call{" "}
                  </p>
                </div>
              </a>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
              <a>
                <div className={`${styles.card} ${styles.read_card}`}>
                  {/* Icon  */}
                  <div className={styles.icon}>
                    <HiOutlineDocumentText />
                  </div>

                  {/* Title  */}
                  <h3 className={styles.title}>Read Astrology Blogs</h3>

                  {/* Text  */}
                  <p className={styles.text}>
                    Stay updated to what{"'"}s happening in astrology world.
                  </p>
                </div>
              </a>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
              <a>
                <div className={`${styles.card} ${styles.shop_card}`}>
                  {/* Icon  */}
                  <div className={styles.icon}>
                    <FiShoppingCart />
                  </div>

                  {/* Title  */}
                  <h3 className={styles.title}>Shop on Dreshkan Shop</h3>

                  {/* Text  */}
                  <p className={styles.text}>
                    Buy any astrological item and book poojas using shop.
                  </p>
                </div>
              </a>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
              <a>
                <div className={`${styles.card} ${styles.report_card}`}>
                  {/* Icon  */}
                  <div className={styles.icon}>
                    <BsBarChart />
                  </div>

                  {/* Title  */}
                  <h3 className={styles.title}>Get Detailed Reports</h3>

                  {/* Text  */}
                  <p className={styles.text}>
                    Detailed Reports on basis of your Kundali.
                  </p>
                </div>
              </a>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
              <a>
                <div className={`${styles.card} ${styles.live_card}`}>
                  {/* Icon  */}
                  <div className={styles.icon}>
                    <MdOndemandVideo />
                  </div>

                  {/* Title  */}
                  <h3 className={styles.title}>Live Broadcast</h3>

                  {/* Text  */}
                  <p className={styles.text}>
                    Connect on Live Broadcast and ask your concerns.
                  </p>
                </div>
              </a>
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
              <a>
                <div className={`${styles.card} ${styles.daily_card}`}>
                  {/* Icon  */}
                  <div className={styles.icon}>
                    <BiPlanet />
                  </div>

                  {/* Title  */}
                  <h3 className={styles.title}>Daily Horoscope</h3>

                  {/* Text  */}
                  <p className={styles.text}>
                    Read about how will your day go based on your zodiac sign.{" "}
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </div>

        {/* About Container */}
        <div className={styles.about_container}>
          {/* container title */}
          <h2 className={styles.container_title}>About Dreshkan</h2>

          {/* Logo Text Container   */}
          <div className={`container-fluid  `}>
            <div
              className={`row justify-content-center justify-content-md-start align-items-center  `}
            >
              {/* Logo  */}
              <div className={`col-9  col-md-3 ${styles.image_container}`}>
                <Image src={Logo} />
              </div>

              {/* Text  */}
              <div
                className={`col-12 col-md-7  order-md-first text-center text-md-start ${styles.text_container}`}
              >
                <p>
                  Dreshkan is one of the most authentic astrology destinations
                  for not only those who are seeking astrological assistance,
                  but also for high-level astrological research and development
                  on wide scale. It is a prolific astrological source for people
                  to help them out from mundane questions to specialized
                  queries. Our aim is to ameliorate those who are facing
                  problems and betterment of humanity using divine science of
                  astrology.
                </p>
                <p>
                  Keeping this all-embracing vision in mind, famous astrologer
                  Acharya Arti Sharma and Mrs Anupama Raizada, embarked Dreshkan
                  in year 2022, in guidence of renowned astrologer Shailendra
                  Pandey, to put astrological wisdom for help of ailing mankind.
                  The Dreshkan team that works in his guidance cones of many
                  expert astrologers pertaining to different schools of
                  astrology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Container */}
        <div className={styles.faq_container}>
          <h2 className={styles.container_title}>Frequently Asked Questions</h2>

          <div className=" ">
            <Faqs />
          </div>
        </div>

        {/* Get it on Container */}
        <div className={`${styles.getItOn_container} container-fluid `}>
          <div className="row justify-content-center align-items-center gx-lg-5">
            {/* Image  */}

            <div
              className={`col-8 col-md-5 col-lg-4 ${styles.image_container}`}
            >
              <Image src={IphoneMockup} />
            </div>

            {/* Text */}
            <div
              className={`col-12 col-md-7 order-md-first ${styles.text_container}`}
            >
              {/* Heading  */}
              <div className={styles.title}>Get it on!</div>

              {/* Paragraph  */}
              <div className={styles.para}>
                App is now available on playstore. Download Now !
                <div className={styles.badge_container}>
                  <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
                    <a>
                      <Image src={GooglePlayBadge} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

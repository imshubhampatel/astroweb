import Head from "next/head";
import Image from "next/image";
import styles from "../styles/pages/index.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

import HeroImage from "../public/images/mascot.png";
import Logo from "../public/images/logo_transparent.png";
import IphoneMockup from "../public/images/iphone_mockup.svg";
import GooglePlayBadge from "../public/images/google-play-badge.png";

import { Faqs } from "../components/faqComponent/Faqs";
import LaunchSoonSubscribe from "../components/LaunchSoonSubscribe"
import { BsChatSquareDots, BsBarChart } from "react-icons/bs";
import { FiPhone, FiShoppingCart } from "react-icons/fi";
import { MdOndemandVideo } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiPlanet } from "react-icons/bi";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebase } from "../config";

const db = getFirestore(firebase);

export default function Home() {
  async function markInterested(email) {
    const astros = doc(collection(db,"interested"));
    await setDoc(astros, {
      email:email,
      timestamp : new Date()
    });
  }

  return (
    <>
      <Head>
        <title>Dreshkan</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
              <div className={`${styles.launchingHeading} my-3`}>
                Connect with Astrologers!
              </div>

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
                <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>
                <Image src={GooglePlayBadge} />
                </a></Link> 
        </div>

              {/* <div className="my-3 ">
                <LaunchSoonSubscribe markInterested={markInterested}/>
              </div> */}

            </div>
          </div>
        </div>

        {/* Services Container */}

        <div className={`${styles.services_container} `}>
          {/* Title Text  */}
          <div className={styles.containerTitle}>Our Services</div>

          {/* Cards */}
          <div className={styles.cards_container}>
          <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>
            <div className={`${styles.card} ${styles.chat_card}`}>
              {/* Icon  */}
              <div className={styles.icon}>
                <BsChatSquareDots />
              </div>

              {/* Title  */}
              <div className={styles.title}>Chat With Astrologers</div>

              {/* Text  */}
              <div className={styles.text}>
                Chat with re-knowned astrologers at minimial fees.
              </div>
            </div>
          </a>
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>

            <div className={`${styles.card} ${styles.call_card}`}>
              {/* Icon  */}
              <div className={styles.icon}>
                <FiPhone />
              </div>

              {/* Title  */}
              <div className={styles.title}>Talk to Astrologers</div>

              {/* Text  */}
              <div className={styles.text}>
                Connect with astrologers on video and voice call{" "}
              </div>
            </div>
            </a>
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>

            <div className={`${styles.card} ${styles.read_card}`}>
              {/* Icon  */}
              <div className={styles.icon}>
                <HiOutlineDocumentText />
              </div>

              {/* Title  */}
              <div className={styles.title}>Read Astrology Blogs</div>

              {/* Text  */}
              <div className={styles.text}>
                Stay updated to what{"'"}s happening in astrology world.
              </div>
            </div>
            </a>
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>

            <div className={`${styles.card} ${styles.shop_card}`}>
              {/* Icon  */}
              <div className={styles.icon}>
                <FiShoppingCart />
              </div>

              {/* Title  */}
              <div className={styles.title}>Shop on Dreshkan Shop</div>

              {/* Text  */}
              <div className={styles.text}>
                Buy any astrological item and book poojas using shop.
              </div>
            </div>
            </a>
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>

            <div className={`${styles.card} ${styles.report_card}`}>
              {/* Icon  */}
              <div className={styles.icon}>
                <BsBarChart />
              </div>

              {/* Title  */}
              <div className={styles.title}>Get Detailed Reports</div>

              {/* Text  */}
              <div className={styles.text}>
                Detailed Reports on basis of your Kundali.
              </div>
            </div>
            </a>
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>

            <div className={`${styles.card} ${styles.live_card}`}>
              {/* Icon  */}
              <div className={styles.icon}>
                <MdOndemandVideo />
              </div>

              {/* Title  */}
              <div className={styles.title}>Live Broadcast</div>

              {/* Text  */}
              <div className={styles.text}>
                Connect on Live Broadcast and ask your concerns.
              </div>
            </div>
            </a>
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>

            <div className={`${styles.card} ${styles.daily_card}`}>
              {/* Icon  */}
              <div className={styles.icon}>
                <BiPlanet />
              </div>

              {/* Title  */}
              <div className={styles.title}>Daily Horoscope</div>

              {/* Text  */}
              <div className={styles.text}>
                Read about how will your day go based on your zodiac sign.{" "}
              </div>
            </div>
          </a>
          </Link>
          </div>
        </div>

        {/* About Container */}
        <div className={styles.about_container}>
          {/* container title */}
          <div className={styles.container_title}>About Dreshkan</div>

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
          <div className={styles.container_title}>
            Frequently Asked Questions
          </div>

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
                <Link href="https://play.google.com/store/apps/details?id=com.dreshkan"><a>
                <Image src={GooglePlayBadge} />
                </a></Link> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

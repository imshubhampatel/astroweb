import Head from "next/head";
import Image from "next/image";
import styles from "../styles/pages/index.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const calculateTimeLeft = () => {
  const launchDate = new Date("February 15, 2022 03:00:00");
  const difference = +launchDate - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval}  >
        <div className={styles.timerNumber}>{timeLeft[interval]}</div>
        <div className={styles.timerText}>{interval}</div>
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Drekshan</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className={` container-fluid ${styles.container}`}>
          <div className={`row justify-content-center align-items-center`}>
            {/* Image   */}
            <div className={` col-12  col-md-4 ${styles.heroContainer}`}>
              <Image src="/images/launching_soon_hero.svg" layout="fill" />
              <a href="https://www.freepik.com/vectors/calendar"></a>
            </div>

            {/* Text Block  */}

            <div className={`col-12 col-md-7 p-md-5 order-md-first text-center text-md-start`}>
              <div className={`${styles.launchingHeading} my-3`}>
                LAUNCHING&nbsp;SOON....
              </div>

              <p className={`mb-1 text-center text-md-start ${styles.mainText} `}>
                Dreshkan is an all-in-one solution for astrology and horoscopic needs. Get ready to join us on our journey in  world of astrology.
                We will be providing plethora of services from live consultation to match making reports. 
                Do not worry about your future as we are here to accompany you...
                
              </p>

              {/* Timer  */}
              <div className="text-white d-flex justify-content-center justify-content-md-start gap-3 my-3">
                {timerComponents.length ? (
                  timerComponents
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

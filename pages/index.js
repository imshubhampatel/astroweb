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
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className={` container-fluid ${styles.container}`}>
          <div className={`row justify-content-center align-items-center`}>
            {/* Image   */}
            <div className={` col-12  col-md-4 ${styles.heroContainer}`}>
              <Image src="/images/launching_soon_hero.svg" layout="fill" />
            </div>

            {/* Text Block  */}

            <div className={`col-12 col-md-7 p-md-5 order-md-first text-center text-md-start`}>
              <div className={`${styles.launchingHeading} my-3`}>
                LAUNCHING&nbsp;SOON....
              </div>

              <p className={`mb-1 text-center text-md-start ${styles.mainText} `}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
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

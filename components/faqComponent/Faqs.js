import styles from "../../styles/components/faqComponent/Faqs.module.css";
import { FaqCard } from "./FaqCard";
import { useState } from "react";

export function Faqs() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <div className={styles.container}>
        {/* Buttons */}
        <div className={styles.button_container}>
          <div
            className={`${styles.button} ${
              currentTab == 0 ? styles.active : ""
            } `}
            onClick={() => setCurrentTab(0)}
          >
            Talk To Astrologer
          </div>

          <div
            className={`${styles.button} ${
              currentTab == 1 ? styles.active : ""
            } `}
            onClick={() => setCurrentTab(1)}
          >
            Misc Details
          </div>

          <div
            className={`${styles.button} ${
              currentTab == 2 ? styles.active : ""
            } `}
            onClick={() => setCurrentTab(2)}
          >
            Others
          </div>
        </div>

        {/* FAQ Container */}
        <div className={styles.faq_container}>
          {currentTab == 0 && (
            <>
              <FaqCard
                question="Can I cancel the appointment?"
                answer="Yes, you can cancel appointment till it is accepted."
              />
              <FaqCard
                question="How can I download this app?"
                answer="It will be soon available on playstore."
              />
              <FaqCard
                question="Can I register on the app as a Astrologer?"
                answer="Press on join as an astrologer button on top."
              />
              <FaqCard
                question="What is the medium of instruction and communication?"
                answer="Every Astrologer is fluent in his own languages , you will be able to choose from the languages provided by astrologer."
              />
            </>
          )}

          {currentTab == 1 && (
            <>
              {/* <FaqCard
                question="Question on Misc Details "
                answer="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
              /> */}
               <FaqCard
                question="Where are your terms and conditions ?"
                answer="Look in the footer of this website."
              />
              {/* <FaqCard
                question="Can I register on the app as a Astrologer?"
                answer="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"
              /> */}
            </>
          )}

          {currentTab == 2 && (
            <>
             <FaqCard
                question="How can I download this app?"
                answer="It will be soon available on playstore."
              />
              {/* <FaqCard
                question="How can I download this app?"
                answer="Lorem Ipsum is simply 
            dummy text of the printing and 
            typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the"
              /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

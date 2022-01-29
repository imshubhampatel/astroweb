import styles from "../../styles/components/faqComponent/FaqCard.module.css";
import { useState } from "react";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export function FaqCard({
  question = "Question",
  answer = "This is the answer to the question",

}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.container}
      onClick={() => setOpen(open => !open)}
    >
      <div className={styles.question_container}>
        <div className={styles.question}>{question}</div>
        <div>{!open ? <AiOutlinePlus /> : <AiOutlineMinus />}</div>
      </div>

      <div className={`${styles.answer} ${open ? styles.active : ""}`}>
        {answer}
      </div>
    </div>
  );
}

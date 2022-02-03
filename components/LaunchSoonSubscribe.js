import { useState } from "react";
import styles from "../styles/components/LaunchSoonSubscribe.module.css";

export default function LaunchSoonSubscribe(props) {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputVal);
  };

  return (
    <div className={styles.container}>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        className={styles.input_field}
        placeholder="Enter Email"
      />
      <button onClick={handleSubmit} className={styles.submit_button}>
        {" "}
        Interested
      </button>
    </div>
  );
}

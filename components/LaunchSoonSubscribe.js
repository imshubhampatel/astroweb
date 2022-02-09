import { useState } from "react";
import styles from "../styles/components/LaunchSoonSubscribe.module.css";

export default function LaunchSoonSubscribe(props) {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.markInterested(inputVal);
    setInputVal("");
    alert("Thanks for showing interest .")
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        className={styles.input_field}
        placeholder="Enter Email"
        type="email"
      />
      
      <button type="submit" className={styles.submit_button}>
        {" "}
        Interested
      </button>
      </form>
    </div>
  );
}

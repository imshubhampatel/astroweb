import styles from "../../styles/components/adminPanel/BroadcastCard.module.css";

import React, { useState, useEffect } from "react";
import { broadcastStatus } from "../../dbObjects/Broadcasts";
function BroadcastCard(props) {
  const [present, setPresent] = useState(true);
  useEffect(() => {
    setPresent(props.data.status != broadcastStatus.CANCELLED);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.heading}>
          {" "}
          {props.data.title}
        </div>
        <div className={styles.about}>
          {" "}
          By Astrologer {props.data.astrologerName}{" and UID : "} {props.data.astrologerUid}
        </div>
        <div className={styles.status}>
          {" "}
          Status:
          <span className={styles.statusColor}> {present ? props.data.status : "Cancelled"} </span>
        </div>
      </div>

      <div className={styles.subContainer}>
        <div className={styles.boradcastId}>broadcastId: {props.data.id}</div>

        <div className={styles.time}>Time: {props.data.scheduledTime.toDate().toDateString()}</div>

       {present ? <div onClick={() => {
          props.cancelBroadcast(props.data.id);
          setPresent(false);
        }} className={styles.deleteButton}>
          Cancel
        </div> : null}
      </div>
    </div>
  );
}

export default BroadcastCard;


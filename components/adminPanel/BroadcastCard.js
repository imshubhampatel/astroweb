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
          How to build Healthy Relationships{" "}
        </div>
        <div className={styles.about}> By Astrologer Mahesh </div>
        <div className={styles.status}>
          {" "}
          Status:
          <span className={styles.statusColor}> Initiated </span>
          
        </div>
      </div>

      <div className={styles.subContainer}>
        <div className={styles.boradcastId}>boradcastId: #0009999999999</div>

        <div className={styles.time}>Time: 12:00 PM</div>

        <div onClick={() => {}} className={styles.deleteButton}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default BroadcastCard;

{
  /* <div className="card bg-light mb-3">
            
            <div className="card-header">Title : {props.data.title}</div>
            <div className="card-body">
              {props.data.id}
              <p className="card-text">Author : {props.data.astrologerName}</p>
                    <p className="card-text">status : {props.data.status}
              </p>
              {present ? <button className="btn btn-danger" onClick={() => {
                props.cancelBroadcast(props.data.id)
                setPresent(false)
              }
              }>Cancel</button> :"Cancelled"} 
            </div>
          </div> */
}

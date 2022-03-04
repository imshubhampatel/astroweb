import styles from "../../styles/components/adminPanel/WalletInfoCard.module.css";

import React from "react";
import Link from "next/link";

function WalletInfoCard(props) {
  return (
    <div className={styles.container}>
      {/* left column   */}

      <div className={styles.leftColumn}>
        <Link href={"/admin/astrologer/" + props.data.astrologer}>
          <a target="_blank">
            <h5>Astrologer {props.data.astrologer}</h5>
          </a>
        </Link>

        <div className={styles.uid}>UID: #{props.data.id}</div>
        {
          props.data.status =="initiated" ?  <div className={styles.amount}>
          Requested Amount
          <span className="text-success"> Rs {props.data.amount} </span>
        </div> :  
          <div className={styles.amount}>
          Approved Amount
          <span className="text-success"> Rs {props.data.approvedAmount}  <p >  Status : <p className="btn btn-link"
> {props.data.status} </p><d/>
        Approved By  : <p className="btn btn-link"
> {props.data.approvedBy}</p></p> <br/> </span>
        </div>
        }
      </div>

      {/* right column   */}
      <div className={styles.rightColumn}>
        <div className={styles.orderId}> {
          props.data.status =="initiated" ?  <div className={styles.amount}>
         Initiated
        </div> :  
          <div className={styles.amount}>
        Transaction Id: #{props.data.transactionId}
        </div>
        }</div>

        <div className={styles.time}>
          Time: {props.data.time.toDate().toDateString()}
        </div>

        {props.data.status == "initiated" ? (
          <div className={styles.buttonContainer}>
            <button
              className={styles.declineButton}
              onClick={() => props.reject(props.data)}
            >
              Decline
            </button>

            <button
              className={styles.acceptButton}
              onClick={() => props.approve(props.data)}
            >
              {" "}
              Accept{" "}
            </button>
            <button
              className="btn btn-link"
              onClick={() => props.astrologerPrivateDetailView(props.data)}
            >
              {" "}
              More Details
            </button>
          </div>
        ) : (
           
          <div className={styles.buttonContainer}>
        
            <button
              className="btn btn-link"
              onClick={() => props.astrologerPrivateDetailView(props.data)}
            >
              {" "}
              More Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletInfoCard;


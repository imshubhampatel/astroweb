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

        <div className={styles.amount}>
          Amount
          <span className="text-success"> Rs {props.data.amount} </span>
        </div>
      </div>

      {/* right column   */}
      <div className={styles.rightColumn}>
        <div className={styles.orderId}>Order Id: #0009999999999</div>

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

{
  /* <div className="card border-dark mb-3">
        <div className="card-header">Astrologer : {props.data.astrologer}</div>
        <div className="card-body text-dark">
          <h7 className="card-title">
            Amount : {props.data.amount} <br></br> Time :{" "}
                    {props.data.time.seconds} <br />
                    ID : {props.data.id}
          </h7>
          <h6>Status : {props.data.status}</h6>
          <Link href={"/admin/astrologer/"+props.data.astrologer}><a target="_blank">See profile</a></Link>
          <button className="btn btn-primary" onClick={()=>props.astrologerPrivateDetailView(props.data)}> See Astrologer Account Details</button>
          <p className="card-text">{props.data.remark}</p>
          {props.data.status == "initiated" ? (
            <div>
              <button
                className="btn btn-success"
                onClick={() => props.approve(props.data)}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => props.reject(props.data)}
              >
                Reject
              </button>
            </div>
          ) : null}
        </div>
      </div> */
}

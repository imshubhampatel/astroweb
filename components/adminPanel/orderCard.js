import styles from "../../styles/components/adminPanel/orderCard.module.css";
import React from "react";

function OrderCard({ props }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}></div>

      <div className={styles.infoContainer}>
        <div className={styles.leftInfoSubContainer}>
          <div className={styles.name}>Gemstone 1</div>

          <div className={styles.status}>Status: Delivered</div>

          <div className={styles.orderId}>Order Id: #0009999999999</div>
        </div>

        <div className={styles.rightInfoSubContainer}>
          <div className={styles.price}>Rs 3000</div>

          <div className={styles.date}>Ordered on: 12th June, 2021</div>

          <div className={styles.date}>Delivered by: 20th June, 2021</div>

          <div className={styles.date}></div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

{
  /* <div className="card bg-light mb-3">
        <div className="card-header">Amount :  {props.amount}</div>
            <div className="card-body">
                {props.id}
          <p className="card-text">Status : {props.status}</p>
          <p className="card-text">Time : {props.time}</p>
        </div>
</div> */
}

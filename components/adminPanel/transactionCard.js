import styles from "../../styles/components/adminPanel/transactionCard.module.css";

export default function TransactionCard({ props }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.mainText}>
          {" "}
          Voice Call with Astrologer Aarti{" "}
        </div>

        <div className={styles.status}> Status: Successful </div>

        <div className={styles.subText}> Order Id: #0009999999999 </div>
        <div className={styles.subText}> 12th July 2021 09:30PM </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem}  `}> Deduction Details: </div>
          <div className={`${styles.gridItem}  `}> -Rs 25 </div>
          <div className={`${styles.gridItem}  `}> Consult Rate </div>
          <div className={`${styles.gridItem}  `}> Rs 5/minute </div>
          <div className={`${styles.gridItem}  `}> Duration </div>
          <div className={`${styles.gridItem}  `}> 5 minutes </div>
          <div className={`${styles.gridItem}  `}> Total cost: </div>
          <div className={`${styles.gridItem}  `}> Rs 25.00 </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="card bg-light mb-3">
      <div className="card-header"> Detail : {props.subtype}  OrderId : {props.subtypeId}</div>
      <div className="card-body">
        <p className="card-text">Amount : {props.amount}</p>
        <p className="card-text">Type : {props.type}</p>
      </div>
    </div> */
}

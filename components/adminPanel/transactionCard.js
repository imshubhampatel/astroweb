import styles from "../../styles/components/adminPanel/transactionCard.module.css";

export default function TransactionCard({props}) {
  console.log(props)
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.mainText}>
          {" "}
          {"Transaction Type : " + props.subtype}{" "}
        </div>

        <div className={styles.status}> Status: Successful </div>

        <div className={styles.subText}> Concerned Related Id: {props.subtypeId} </div>
        <div className={styles.subText}> {props?.date?.toDate()} </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.gridContainer}>
        <div className={`${styles.gridItem}  `}> Transaction ID : {props?.id} </div>
          <div className={`${styles.gridItem}  `}> {props?.type} Details: </div>
          <div className={`${styles.gridItem}  `}>  {props?.amount} </div>
          <div className={`${styles.gridItem}  `}> Total cost: </div>
          <div className={`${styles.gridItem}  `}> {props?.amount} </div>
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

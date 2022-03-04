import styles from "../../styles/components/adminPanel/transactionCard.module.css";

export default function TransactionCard({props}) {
  const date = props.date
    ? new Date(props.date.seconds).toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "Invalid Time";
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.mainText}>
          {" "}
          {"Transaction Type : " + props.subtype}{" "}   

        </div>

        <div className={styles.status}> Status: Successful </div>

        <div className={styles.subText}> Concerned Related Id: {props.subtypeId} </div>
        <div className={styles.subText}> {date} </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.gridContainer}>
        <div className={`${styles.gridItem}  `}> Transaction ID : {props?.id} </div>
        </div>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem}  `}> Total cost: {props?.amount} </div>
        </div>
      </div>
      
    </div>
  );
}


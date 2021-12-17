import styles from "../../styles/components/adminPanel/meetingCard.module.css"


export default function MeetingCard( {props,type} ) {


  return (
    <div className={`${styles.container}  d-flex gap-2 `}>

        {/* Photo  */} 
        <div className={`${styles.photoContainer}`}>  </div>


        {/* Order Status  */}
        <div className={`flex-grow-1  `} style={{height: "100%"}}> 

          <h6>{props.type} Call with {type=="astrologer"?props.user:props.astrologerUid}</h6>

          <div className={`${styles.orderDetailText}`} >Order id: {props.id} <br/>

          {props?.scheduledTime.toDate().toDateString()}</div>

          <div className={`${styles.orderStatus}  ${styles.orderStatusSuccess} `} >{props.status}</div>

        </div>



        {/* Transaction Details  */}
        <div className={` ps-2 pe-2`} >
        <h6>Transaction Details:</h6>

        
        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Consult Rate</div>
          <div className={`col text-end`}>Rs&nbsp;{props.rate}/5 minute</div>

        </div>

        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Duration</div>
          <div className={`col text-end`}>{props.duration} minutes</div>

        </div>

        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Total cost:</div>
  <div className={`col text-end`}>Rs {props.amount}</div>

        </div>


        </div>


    </div>
  );
} 

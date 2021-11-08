import styles from "../../styles/components/adminPanel/meetingCard.module.css"


export default function MeetingCard({ props }) {

  console.log(props);

  return (
    <div className={`${styles.container}  d-flex gap-2 `}>

        {/* Photo  */} 
        <div className={`${styles.photoContainer}`}>  </div>


        {/* Order Status  */}
        <div className={`flex-grow-1  `} style={{height: "100%"}}> 

          <h6>Video Call with Aarti</h6>

          <div className={`${styles.orderDetailText}`} >Order id: #xxxxxx <br/>

          12th June 2021 09:30pm</div>

          <div className={`${styles.orderStatus}  ${styles.orderStatusSuccess} `} >Successfull</div>

        </div>



        {/* Transaction Details  */}
        <div className={` ps-2 pe-2`} >
        <h6>Transaction Details:</h6>

        
        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Consult Rate</div>
          <div className={`col text-end`}>Rs&nbsp;10/minute</div>

        </div>

        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Duration</div>
          <div className={`col text-end`}>5 minutes</div>

        </div>

        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Total cost:</div>
          <div className={`col text-end`}>Rs 50.00</div>

        </div>


        </div>


    </div>
  );
} 

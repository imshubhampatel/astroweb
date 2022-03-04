import styles from "../../styles/components/adminPanel/meetingCard.module.css"

import Image from 'next/image'
export default function MeetingCard( {data,type} ) {
  console.log(data);


  return (
    <div className={`${styles.container}  d-flex gap-2 `}>

        {/* Photo  */} 
        <div className={`${styles.photoContainer}`}> 
        <Image
              src={type == "astrologer" ? data.userImage ?data?.userImage : "/images/loading.svg": data?.astrologerImage ?data?.astrologerImage : "/images/loading.svg"}
              height="100"
              width="100"
              layout="responsive"
            />
         </div>
        {/* Order Status  */}
        <div className={`flex-grow-1  `} style={{height: "100%"}}> 

          <h6>{data?.type} Call with {type=="astrologer"?data?.userUid:data?.astrologerUid}</h6>

          <div className={`${styles.orderDetailText}`} >Order id: {data?.id} <br/>

          {data?.scheduledTime.toDate().toDateString()}</div>

          <div className={`${styles.orderStatus}  ${styles.orderStatusSuccess} `} >{data?.status}</div>

        </div>



        {/* Transaction Details  */}
        <div className={` ps-2 pe-2`} >
        <h6>Transaction Details:</h6>

        
        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Consult Rate</div>
          <div className={`col text-end`}>Rs &nbsp;{data?.consultationRate}/minute</div>

        </div>

        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Duration</div>
          <div className={`col text-end`}>{data?.totalDuration} minutes</div>

        </div>

        <div className={`row  ${styles.orderDetailText}`} >

          <div className={`col`}>Total cost:</div>
          <div className={`col text-end`}>Rs {data?.totalAmount}</div>


          <div className={`col`}>Total Astrologer Earnings:</div>
          <div className={`col text-end`}>Rs {data?.astrologerAmount}</div>
        </div>


        </div>


    </div>
  );
} 

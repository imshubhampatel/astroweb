import styles from "../../styles/components/adminPanel/BlogCard.module.css";

import React from "react";
import Link from "next/link";
export default function BlogCard({ props }) {
  return (

    <div className={styles.container}>


    <Link
      href={{
        pathname: `/admin/blog/${props.id}`,
        query: { pid: props.id },
      }}
    >
      <a target="_blank">
        
          {/* Main content  */}
          <div className={styles.mainContainer}>
            <div className={styles.heading}>Horoscope 22 for Letter A</div>

            <div className={styles.subtext}>By Astrologer Mahesh</div>

            <div className={styles.mainText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a Read More
            </div>
          </div>


          </a>
    </Link>

          {/* Sub content   */}
          <div className={styles.subContainer}>
            <div className={styles.blogId}>Blog Id: #0009999999999</div>

            <div className={styles.time}>Time: 12:00 PM</div>

            <div onClick={() => {}} className={styles.deleteButton}>
              Remove
            </div>
          </div>
      
   


</div>
  );
}

{
  /* <div className="card bg-light mb-3">
          <div className="card-header">Title : {props.title}</div>
          <div className="card-body">
            {props.id}
            <p className="card-text">Author : {props.author}</p>
            <p className="card-text">description : {props.description.slice(0,100)}...</p>
          </div>
        </div> */
}

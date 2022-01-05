import styles from "../../styles/components/adminPanel/BlogCard.module.css";

import React, { useState,useEffect}from "react";
import Link from "next/link";
export default function BlogCard({ props ,remove}) {
  const [visible, setvisible] = useState(true);
  useEffect(() => {
    setvisible(props.visible)
  }, [])
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
            <div className={styles.heading}>{props.title}</div>

            <div className={styles.subtext}>By Astrologer {props.author}</div>

            <div className={styles.mainText}>
              <p> {props.description.slice(0, 100)}...</p>
            </div>
          </div>
        </a>
      </Link>

      {/* Sub content   */}
      <div className={styles.subContainer}>
        <div className={styles.blogId}>Blog Id: {props.id}</div>

        <div className={styles.time}>Time: {props.time.toDate().toDateString()}</div>

        {visible ? 
          <div onClick={() => {
            remove(props.id)
            setvisible(false)
          }} className={styles.deleteButton}>
          Remove
        </div> : " Removed "}
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

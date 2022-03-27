import styles from "../../styles/components/adminPanel/CommentCard.module.css";

import React, { useState } from "react";
import Image from "next/image";

import { RiDeleteBinLine } from "react-icons/ri";

function CommentCard(props) {
  const [present, setPresent] = useState(true);

  console.log(props);

  return (
    <>
      {/* container */}
      <div className={styles.container}>
        {/* top part */}
        <div className={styles.top_part}>
          {/* photo  */}
          {props?.data?.profilePhoto && (
            <div className={styles.photo_container}>
              <Image src={props.data.profilePhoto} height={60} width={60} />
            </div>
          )}

          {/* name and time container */}
          <div className={styles.name_container}>
            {/* name */}
            <div className={styles.name}>{props.data.name}</div>

            {/* date */}
            <div className={styles.time}>
              {props.data.time.toDate().toDateString()}
            </div>
          </div>

          {/* Delete Button  */}
          <div className={styles.delete_button_container}>
            {present ? (
              <RiDeleteBinLine
                onClick={() => {
                  props.deleteComment(props.data.id);
                  setPresent(false);
                }}
                size={20}
              />
            ) : (
              "Comment Deleted"
            )}
          </div>
        </div>

        {/* comment */}
        <div>{props.data.content}</div>
      </div>
    </>
  );
}

export default CommentCard;

// content: "hello"
// id: "yzx8iTf5ErVJra2rv0XQ"
// name: "arpit mehta"
// profilePhoto: "https://firebasestorage.googleapis.com/v0/b/testastrochrcha.appspot.com/o/astrologer%2F8jba8SL0elO8vJUo2fxcKdRCkzz1%2FprofilePic.png?alt=media&token=947a6ecc-2cd6-4ed3-8d21-e599a9b23d76"
// time: at {seconds: 1643565373, nanoseconds: 891105000}
// user: "8jba8SL0elO8vJUo2fxcKdRCkzz1"
// [[Prototype]]: Object

{
  /* <div className="card bg-light mb-3 row">
 <div className="card-header">Time : {props.data.time}</div> 
<div className="card-body col-10">
  <p className="card-text">Author : {props.data.name}</p>
  <p className="card-text">description : {props.data.content}</p>
</div>
<div className="col-2">
  {present ? <button onClick={() => {
    props.deleteComment(props.data.id);
    setPresent(false);
  }} className="btn btn-danger"> Delete </button>
: "Comment Deleted"}
</div>
</div> */
}

{
  /* <div className="card bg-light mb-3 row">
<div className="card-header">
  Time : {props.data.time.toDate().toDateString()}
</div>
<div className="card-body col-10">
  <p className="card-text">Author : {props.data.name}</p>
  <p className="card-text">description : {props.data.content}</p>
</div>
<div className="col-2">
  {present ? (
    <button
      onClick={() => {
        props.deleteComment(props.data.id);
        setPresent(false);
      }}
      className="btn btn-danger"
    >
      {" "}
      Delete{" "}
    </button>
  ) : (
    "Comment Deleted"
  )}
</div>
</div> */
}

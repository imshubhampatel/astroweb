import styles from "../../styles/components/adminPanel/CommentCard.module.css";

import React, { useState } from "react";

function CommentCard(props) {
  const [present, setPresent] = useState(true);

  return (
    <>
      <div className="card bg-light mb-3 row">
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
      </div>

      {/* container */}
      {/* <div className={styles.container}> */}
      {/* top part */}
      {/* <div className={styles.top_part}> */}
      {/* photo  */}
      {/* <div className={styles.photo_container}></div> */}

      {/* name and time container */}
      {/* <div className={styles.name_container}> */}
      {/* name */}
      {/* <div className={styles.name}>{props.data.name  }</div> */}

      {/* date */}
      {/* <div className={styles.time}>{props.data.time.toDate().toDateString()}</div> */}
      {/* </div> */}
      {/* </div> */}

      {/* comment */}
      {/* <div></div> */}
      {/* </div> */}
    </>
  );
}

export default CommentCard;

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

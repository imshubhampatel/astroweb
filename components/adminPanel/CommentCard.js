import styles from "../../styles/components/adminPanel/CommentCard.module.css";

import React, { useState } from "react";
import Image from "next/image";

import { RiDeleteBinLine } from "react-icons/ri";

function CommentCard(props) {
  const [present, setPresent] = useState(true);


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

import styles from "../../../styles/pages/admin/blog/[id].module.css";
import layoutStyles from "../../../styles/pages/admin/BaseLayout.module.css";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { EmployeePermissions } from "../../../dbObjects/Employee";

import { firebase } from "../../../config";
import AdminLayout from "../../../components/adminPanel/layout";
import withAdminAuth from "../../../auth/withAdminAuth";
import { blogConverter, Blog, blogStatus } from "../../../dbObjects/Blog";
import CommentCard from "../../../components/adminPanel/CommentCard";
const db = getFirestore(firebase);

const blog = withAdminAuth(() => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  const [comments, setComments] = useState([]);

  async function getblogInfo(pid) {
    if (!pid) {
      return;
    }

    const astros = collection(db, "blog");
    let querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(blogConverter)
    );
    if (querySnapshot.exists()) {
      setastro(querySnapshot.data());
    } else {
      // console.log("no")
    }
    querySnapshot = await getDocs(
      query(collection(db, "blog/" + pid + "/" + "comment"))
    );
    let data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setComments(data);
  }

  async function removeBlog(pid) {
    const blog = doc(db, "blog", String(pid));
    setastro({ ...astro, visible: false });
    await updateDoc(blog, {
      visible: false,
    });
  }
  async function deleteComment(commentId) {
    const comment = doc(
      db,
      "blog/" + String(pid) + "/comment/" + String(commentId)
    );
    await deleteDoc(comment);
  }

  useEffect(() => {
    getblogInfo(pid);
  }, [pid]);

  console.log(astro);
  return (
    <>
      <div className={` ${layoutStyles.base_container} `}>
        <div className={`${layoutStyles.main_container}`}>
          <div className={styles.title_container}>
            {/* Title  */}
            <div className={styles.title}>{astro.title}</div>
            {/* Remove button */}
            <div className={styles.button_container}>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>

          <div className={styles.author}>By {astro.author}</div>

          {/* Main Content */}
          <div className={styles.main_content_container}>
            <ReactMarkdown>{astro.description}</ReactMarkdown>

            {/* Photo */}
            {astro.photos && astro.photos[0] && (
              <div className={styles.photo_container}>
                <Image
                  src={astro.photos[0]}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
          </div>

          {/* Comment Container */}
          <div className={styles.comments_container}>
            {/* heading */}
            <div className={styles.heading}>Comments</div>

            {/* Comment Card */}
            <div>
              {comments.map((e) => (
                <CommentCard
                  key={e.id}
                  data={e}
                  deleteComment={deleteComment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}, EmployeePermissions.BROADCAST_MANAGEMENT);

blog.getLayout = function getLayout(page) {
  return <AdminLayout active_page="3">{page}</AdminLayout>;
};
export default blog;

{
  /* <div className="container">
<div className="row  my-3">
  <h3>{astro.title }</h3>
  <ReactMarkdown>
    {astro.description}
    </ReactMarkdown>
</div>
<div>
  { astro.visible ?
    <button className="btn btn-danger" onClick={() => removeBlog(pid)}> Remove</button> :
    "Removed"}
</div>
<div className="row  my-3">
  <h4>Comments </h4>

  {comments.map(e => 
    <CommentCard key={e.id} data={e} deleteComment={deleteComment}></CommentCard>
)}
</div>
</div> */
}

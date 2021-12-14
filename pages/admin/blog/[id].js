import React, { useState, useEffect } from "react";
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
import {EmployeePermissions} from  '../../../dbObjects/Employee'

import { firebase } from "../../../config";
import AdminLayout from "../../../components/adminPanel/layout";
import withAdminAuth from "../../../auth/withAdminAuth";
import { blogConverter, Blog, blogStatus } from "../../../dbObjects/Blog";
import CommentCard from '../../../components/adminPanel/CommentCard'
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
    querySnapshot = await getDocs(query(collection(db,"blog/" + pid + "/" + "comment")));
    let data = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
    setComments(data);
  }
  
  async function removeBlog(pid) {
    const blog = doc(db, "blog", String(pid));
    setastro({...astro,visible:false});
    await updateDoc(blog, {
      visible: false,
    });

  }
  async function deleteComment(commentId) {
    const comment = doc(db, "blog/"+ String(pid)+'/comment/'+String(commentId));
    await deleteDoc(comment);
  }


  useEffect(() => {
    getblogInfo(pid);
  }, [pid]);



  return (
    <div className="container">
      <div className="row  my-3">
        <h3>{astro.title }</h3>
        <p>
          {astro.description}</p>
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
    </div>
  );
}, EmployeePermissions.BROADCAST_MANAGEMENT);

blog.getLayout = function getLayout(page) {
  return <AdminLayout active_page="3">{page}</AdminLayout>;
};
export default blog;

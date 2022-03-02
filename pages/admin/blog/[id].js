import styles from "../../../styles/pages/admin/blog/[id].module.css";
import layoutStyles from "../../../styles/pages/admin/BaseLayout.module.css";
import { getFile, uploadDocToStorage } from "../../../utilities/utils";
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
import EditBlog from "../../../components/EditBlog";
import { firebase } from "../../../config";
import AdminLayout from "../../../components/adminPanel/layout";
import withAdminAuth from "../../../auth/withAdminAuth";
import { blogConverter, Blog, blogStatus } from "../../../dbObjects/Blog";
import CommentCard from "../../../components/adminPanel/CommentCard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const db = getFirestore(firebase);

const blog = withAdminAuth(() => {
  const router = useRouter();
  const { pid } = router.query;
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);

  async function getblogInfo(pid) {
    if (!pid) {
      return;
    }
    const astros = collection(db, "blog");
    let querySnapshot = await getDoc(
      doc(astros, String(pid))
    );
    if (querySnapshot.exists()) {
      setBlog({id : querySnapshot.id , ...querySnapshot.data()});
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
    setBlog({ ...blog, visible: false });
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
  const editBlogView = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <div className="my-3">
            <EditBlog handleSubmit={editBlogHandler} data={blog} />
          </div>
        </div>
      ),
    });
  };
  async function editBlogHandler(e) {
    const astros = doc(db, "blog/" + pid );
 
    let tempblog = blog;
    tempblog.title = e.title;
    tempblog.description = e.description;
    let temp_paths = []

    for (let i = 0; i < e.photos.length; i++) {
      let path = "blog/" + blog.id + "/" + i + temp_paths.length;
      await uploadDocToStorage({
        path: path,
        file: e.photos[i],
      })

      tempblog.photoPaths.push(path);
      temp_paths.push(path)

    }
    for (let i = 0; i < temp_paths.length; i++) {
      let url = await getFile(temp_paths[i]);
      console.log(temp_paths[i],url)
      tempblog.photos.push(url);
    }

    setBlog({ ...tempblog });
    // await updateDoc(astros, { ...tempblog });
    MySwal.clickConfirm();
  }
  useEffect(() => {
    getblogInfo(pid);
  }, [pid]);

  console.log(blog);
  return (
    <>
      <div className={` ${layoutStyles.base_container} `}>
        <div className={`${layoutStyles.main_container}`}>
          <div className={styles.title_container}>
            {/* Title  */}
            <div className={styles.title}>{blog.title}</div>
            {/* Remove button */}
            <div className={styles.button_container}>
              {blog.visible ?<button className="btn btn-danger" onClick={()=>removeBlog(pid)}>Remove</button>:"Removed"}
              {" "}
              {blog.visible ?<button className="btn btn-success" onClick={()=>editBlogView(blog)}>Edit</button>:null}
            </div>
          </div>

          <div className={styles.author}>By {blog.author}</div>

          {/* Main Content */}
          <div className={styles.main_content_container}>
            <ReactMarkdown>{blog.description}</ReactMarkdown>

            {/* Photo */}
            {blog.photos && blog.photos[0] && (
              <div className={styles.photo_container}>
                <Image
                  src={blog.photos[0]}
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
  return <AdminLayout active_page="1">{page}</AdminLayout>;
};
export default blog;

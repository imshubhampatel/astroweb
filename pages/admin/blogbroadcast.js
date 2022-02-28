import layoutStyles from "../../styles/pages/admin/BaseLayout.module.css";
import styles from "../../styles/pages/admin/blogbroadcast.module.css";

import { useState, useEffect } from "react";
import BlogsDashboard from "../../components/adminPanel/BlogsDashboard";
import BroadcastsDashboard from "../../components/adminPanel/BroadcastsDashboard";
import { EmployeePermissions } from "../../dbObjects/Employee";

import {
  collection,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import { blogConverter, Blog, blogStatus } from "../../dbObjects/Blog";
import {
  broadcastConverter,
  Broadcast,
  broadcastStatus,
} from "../../dbObjects/Broadcasts";

import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import BlogCard from "../../components/adminPanel/BlogCard";
import BroadcastCard from "../../components/adminPanel/BroadcastCard";

const db = getFirestore(firebase);

const Blogbroadcast = withAdminAuth(() => {
  const [activeState, setActiveState] = useState(0);
  const [searchText , setSearchText] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isSearchActive, setisSearchActive] = useState(false);
  const [lastBlog, setLastBlog] = useState(null);
  const [broadcasts, setBroadcasts] = useState([]);
  const numItems = 3;


  useEffect(() => {
    if(!isSearchActive) 
    {
      getAllBlogs();
      getAllBroadcasts();
    }
  }, [isSearchActive]);

  async function getAllBlogs() {
    const astros = query(collection(db, "blog"));
    const querySnapshot = await getDocs(
      query(astros, orderBy("time"), limit(numItems))
    );
    let data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setBlogs(data);
    setLastBlog(querySnapshot.docs[querySnapshot.docs.length - 1]);
  }
  async function getAfterBlog() {
    const astros = query(collection(db, "blog"));
    const querySnapshot = await getDocs(
      query(astros, orderBy("time","desc"), startAfter(lastBlog), limit(numItems))
    );
    let data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    if (data.length > 0) {
      setBlogs([...blogs, ...data]);
      setLastBlog(querySnapshot.docs[querySnapshot.docs.length - 1]);
    }
  }
  async function getAllBroadcasts() {
    const astros = query(collection(db, "broadcasts"),
    where("status", "in", [broadcastStatus.ONGOING, broadcastStatus.SCHEDULED])
   , orderBy("scheduledTime"));
    const querySnapshot = await getDocs(
      astros
    );
    let data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setBroadcasts(data);
  }
  async function cancelBroadcast(broadcastId) {
    const broadcast = doc(db, "broadcasts", String(broadcastId));
    await updateDoc(broadcast, {
      status: broadcastStatus.CANCELLED,
    });
  }
   async function removeBlog(pid) {
     const blog = doc(db, "blog", String(pid));
     await updateDoc(blog, {
       visible: false,
     });
   }

  function getData() {
    switch (activeState) {
      case 1: {
        if (blogs.length == 0) {
          getAllBlogs();
        }
        return (
          <BlogsDashboard
            isSearchActive={isSearchActive}
            data={blogs}
            getAfterBlog={getAfterBlog}
            remove={removeBlog}
          />
        );
      }
      case 2: {
        if (broadcasts.length == 0) {
          getAllBroadcasts();
        }
        return (
          <div className="d-flex flex-column gap-3">
            {broadcasts.map((e) => {
              return (
                <BroadcastCard
                  key={e.id}
                  data={e}
                  cancelBroadcast={cancelBroadcast}
                ></BroadcastCard>
              );
            })}
          </div>
        );
      }
    }
  }
  async function searchHandler(search) {
    if (search != "") {
      setisSearchActive(true);
      if(activeState == 2) {
        const astros = collection(db, "broadcasts");
        // searching broadcast
        let querySnapshot = await getDocs(
          query(astros, where("astrologerUid", "==", String(search)))
        );
        let data = new Set();
        querySnapshot.docs.map((doc) => data.add(doc.data()));
        setBroadcasts(Array.from(data));
      }
      else {
        const astros = collection(db, "blog");
        // searching broadcast
        let querySnapshot = await getDocs(
          query(astros, where("author", "==", String(search)))
        );
        let data = new Set();
        querySnapshot.docs.map((doc) => data.add(doc.data()));
        setBlogs(Array.from(data));
      }
     
    }
  }


  return (
    <div className={` ${layoutStyles.base_container} `}>
      <div className={`${layoutStyles.main_container}`}>
        <h2 className={`${layoutStyles.headingText}`}>
          Manage Broadcast and Blogs
        </h2>


        <div className={styles.topButtonContainer}>
          <div onClick={() => {
            setisSearchActive(false);
            setActiveState(1)}} className={`${styles.button} ${ activeState == 1 ? styles.buttonActive : "" }`}>
            {" "}
            Blogs{" "}
          </div>
          <div onClick={() => {
            setisSearchActive(false);
            setActiveState(2)}} className={`${styles.button} ${ activeState == 2 ? styles.buttonActive : "" } `}>
            {" "}
            Broadcasts{" "}
          </div>
          </div>
          <div className={styles.topSearchContainer}>
          <input
            className={`${styles.searchBox}`}
            type="text"
            placeholder="Search by Astrologer ID"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className={`${styles.buttonContainer}`}>
            <button
              className={`${styles.filterButton} ${styles.button} `}
              onClick={()=>searchHandler(searchText)}
            >
              Search
            </button>
          </div>
          {isSearchActive ?
            <div className={`${styles.buttonContainer}`}>
            <button
              className={`${styles.filterButton} ${styles.button} `}
              onClick={()=>setisSearchActive(false)}
            >
              Clear Search
            </button>
          </div>:null}
        </div>

          <div className="my-3">{getData()}</div>

      </div>
    </div>
  );
}, EmployeePermissions.BROADCAST_MANAGEMENT);

Blogbroadcast.getLayout = function getLayout(page) {
  return <AdminLayout active_page="1">{page}</AdminLayout>;
};
export default Blogbroadcast;



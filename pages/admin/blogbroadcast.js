
import { useState, useEffect } from "react";
import BlogsDashboard from '../../components/adminPanel/BlogsDashboard';
import BroadcastsDashboard from "../../components/adminPanel/BroadcastsDashboard";

import {
  collection,
  query,
  where,
   orderBy, startAfter, limit,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import { blogConverter, Blog, blogStatus } from "../../dbObjects/Blog";
import {broadcastConverter,Broadcast,broadcastStatus} from "../../dbObjects/Broadcasts";

import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import BlogCard from '../../components/adminPanel/BlogCard'
import BroadcastCard from '../../components/adminPanel/BroadcastCard'

const db = getFirestore(firebase);

const Blogbroadcast = withAdminAuth(() => {
  const [activeState, setActiveState] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [lastBlog, setLastBlog] = useState(null);
   const [broadcasts, setBroadcasts] = useState([]);
  const numItems = 1;
  useEffect(() => {
    getAllBlogs();
    getAllBroadcasts();
    
  }, []);

  async function getAllBlogs() {
     const astros = query(collection(db, "blog"));
     const querySnapshot = await getDocs(
       query(astros, orderBy("time"), limit(numItems))
     );
    let data = querySnapshot.docs.map((doc) => { return ({ ...doc.data(),id:doc.id }) });
    setBlogs(data);
    setLastBlog(querySnapshot.docs[querySnapshot.docs.length - 1]);
  }
  async function getAfterBlog() {
      const astros = query(collection(db, "blog"));
      const querySnapshot = await getDocs(
        query(astros, orderBy("time"), startAfter(lastBlog),limit(numItems))
      );
      let data = querySnapshot.docs.map((doc) => {
        return ({ ...doc.data(), id: doc.id });
      });
    if (data.length > 0) {
      setBlogs([...blogs, ...data]);
      setLastBlog(querySnapshot.docs[querySnapshot.docs.length - 1]);
    }

  } 
  async function getAllBroadcasts() {
     const astros = query(collection(db, "broadcasts"));
     const querySnapshot = await getDocs(
       astros,
       where("status", "in", [broadcastStatus.ONGOING,broadcastStatus.CREATED])
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


  function getData() {
      switch (activeState) {
        case 1: {
          if (blogs.length == 0) {
            getAllBlogs();
          }
          return (
            <BlogsDashboard data={blogs } getAfterBlog={getAfterBlog}/>
          );
        }
        case 2: {
          if (broadcasts.length == 0) {
            getAllBroadcasts();
          }
          return (
            <ul>
              {broadcasts.map((e) => {
                return (
                  <BroadcastCard
                    key={e.id}
                    data={e}
                    cancelBroadcast={cancelBroadcast}
                  ></BroadcastCard>
                );
              })}
            </ul>
          );
        }
     
      }
  }



    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeState == 1 ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setActiveState(1)}
                >
                  Blogs
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeState == 2 ? "active" : ""}`}
                  onClick={() => setActiveState(2)}
                >
                  Broadcast
                </button>
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className="row">{getData()}</div>
        </div>
      </div>
    );
});

Blogbroadcast.getLayout = function getLayout(page) {
  return <AdminLayout active_page="1">{page}</AdminLayout>;
};
export default Blogbroadcast;
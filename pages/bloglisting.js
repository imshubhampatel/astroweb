import React, { useState, useEffect } from "react";
import Filter from '../components/blogfilter';
import  {SearchBar} from '../components/blogsearch';
import styles from '../styles/components/bloglisting.module.css';
import BlogsDashboard from "../components/blogsdashboard";
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
import { firebase } from "../config";
import { blogConverter, Blog, blogStatus } from "../dbObjects/Blog";


const db = getFirestore(firebase);
function BlogListing() {
    const [activeState, setActiveState] = useState(0);
    const [searchText , setSearchText] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [lastBlog, setLastBlog] = useState(null);
    const numItems = 10;
  
    useEffect(() => {
        getAllBlogs();
      }, []);
    async function getAllBlogs() {
      const astros = query(collection(db, "blog"));
      const querySnapshot = await getDocs(
        query(astros, orderBy("time","desc"), limit(numItems))
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
  
    async function searchHandler(search) {
      if (search != "") {
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
  
  
    return (
        <div className={styles.bloglist}>
                        <div className={styles.pgtoolscontainer}>
                            <h2 className={styles.pgtoolstitle}>Blogs and Articles</h2>                      
                            <SearchBar cssmodule={styles} searchHandler={searchHandler}/>
                        </div>
                        <div className={styles.blogcontainer}>
                          <div className={styles.filtercontainer}>
                              <span className={styles.title}>Categories</span>
                              <Filter cssmodule={styles} filterHandler={styles} heading='Vastu' />
                              <Filter cssmodule={styles} heading='Relationships' />
                              <Filter cssmodule={styles} heading='Numerology' />
                              <Filter cssmodule={styles} heading='Horoscope' />
                          </div>
                          <BlogsDashboard
                              data={blogs}
                              getAfterBlog={getAfterBlog} 
                          />
                        </div>
                        
        </div>
    );
  }

export default BlogListing;
  





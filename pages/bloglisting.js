import React, { useState, useEffect } from "react";
import Filter from '../components/blogfilter';
import  {SearchBar} from '../components/blogsearch';
import styles from '../styles/components/bloglisting.module.css';
import styles1 from '../styles/components/bloglistingmobile.module.css';
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
import ReactMarkdown from "react-markdown";
import { firebase } from "../config";
import { blogConverter, Blog, blogStatus } from "../dbObjects/Blog";


const db = getFirestore(firebase);
function BlogListing() {
    const [activeState, setActiveState] = useState(0);
    const [searchText , setSearchText] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [displayedBlogs, setDisplayedBlogs] = useState([]);
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
      setDisplayedBlogs(data);
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
        setDisplayedBlogs([...blogs, ...data]);
        setLastBlog(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    }
  
    async function searchHandler(search) {
      if (search != "") {
        setDisplayedBlogs(
          blogs.filter((e) => {
            if (
              e?.title?.toLowerCase().includes(search) ||
              e?.description?.toLowerCase().includes(search) 
            )
              return true;
            else return false;
          })
        );
      }
    }
  
  
    return (
        <div className={styles.bloglist}>
                        <div className={styles.pgtoolscontainer}>
                            <h2 className={styles.pgtoolstitle}>Blogs and Articles</h2>                      
                            <SearchBar cssmodule={styles} searchHandler={searchHandler}/>
                        </div>
                        <div className={`${styles.blogcontainer} `}>
                          <div className={styles.filtercontainer}>
                              <span className={styles.title}>Categories</span>
                              <Filter cssmodule={styles} filterHandler={styles} heading='Vastu' />
                              {/* <Filter cssmodule={styles} heading='Relationships' />
                              <Filter cssmodule={styles} heading='Numerology' />
                              <Filter cssmodule={styles} heading='Horoscope' /> */}
                          </div>
                          <BlogsDashboard
                              data={displayedBlogs}
                              getAfterBlog={getAfterBlog} 
                          />
                        </div>
                        
        </div>
    );
  }

export default BlogListing;
  





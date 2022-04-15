import styles from "../styles/components/bloglisting.module.css";
import React, { useState,useEffect}from "react";
import Image from "next/image";
import Logo from "../public/images/blogcard.jpeg";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function BlogCard({ props ,remove}) {
  const [visible, setvisible] = useState(true);
  useEffect(() => {
    setvisible(props.visible)
  }, [])
  return (
    <div className={styles.container}>
      <Link
        href={{
          pathname: `/`,    // check
          query: { pid: props.id },
        }}
      >
        <a target="_blank">
          {/* Main content  */}
          <div className={styles.card}>
            <div className={styles.imgbox} >
                <div  >
                  <Image height={200} width={200} src={props.photos.length > 0? props.photos[0] : Logo}  />
                  {/* <Image height={200} width={200} src={Logo}  /> */}
                </div>
            </div>
            <div className={styles.textcontainer}>
              <div className={styles.heading}>{props.title}</div>
                
                <div className={styles.mainText}>
                  <p>  <ReactMarkdown>{props.description.slice(0, 100) + "..."}</ReactMarkdown></p>

                  </div>
                  <div className={styles.counter}>{props.counter} Reads
                  </div>
                  <div style={{'display':'flex', 'alignItems':'center', 'justifyContent':'center', 'margin-top':'10px' }}>
                    <div className={styles.authorname}>By {props.authorTitle} 
                    </div>
                    <div className={styles.time}>{props.time.toDate().toDateString()}
                    </div>
                    <div className={styles.tagcontainer}>
                      <span  className={styles.tag}>Relationship</span>
                      <span  className={styles.tag}>VEDIC</span>
                    </div>
                    <div className={styles.article}>Read Full Article
                    </div>
                  </div>
                </div>
            </div>
        </a>
      </Link>
    </div>
  );
}


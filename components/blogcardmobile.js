import styles from "../styles/components/bloglistingmobile.module.css";
import React, { useState,useEffect}from "react";
import Image from "next/image";
import Logo from "../public/images/blogcard.jpeg";
import Link from "next/link";
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
          <div>
              <div className={styles.container2}>
                  <div className={styles.imgbox2}>
                      <div >
                        <Image height={170} width={330} src={props.photos.length > 0? props.photos[0] : Logo}  />
                      </div>
                  </div>
                  <div className={styles.timebox}>
                      <div className={styles.time}> By {props.authorTitle} </div>
                      <div className={styles.time}> {props.time.toDate().toDateString()}  </div>
                      <div className={styles.reads}>{props.counter} Reads</div>
                  </div>
                  <h6  className={styles.heading}>{props.title}</h6>
                  <p className={styles.mainText} > {props.description.slice(0, 100)}...</p>
                  <div style={{'display':'flex', 'alignItems':'center', 'justifyContent':'center', 'width':'100%'}}>
                    <div className={styles.tagcontainer}>
                        <span  className={styles.tag}>Relationship</span>
                        <span  className={styles.tag}>VEDIC</span>
                        <span  className={styles.tag}>VEDIC</span>
                    </div>
                    <div>
                      <p className={styles.article}>Read Full Article
                      </p>
                    </div>
                  </div>
              </div>
          </div>
        </a>
      </Link>
    </div>
  );
}


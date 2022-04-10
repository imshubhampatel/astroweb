import styles from "../styles/components/bloglisting.module.css";
import React, { useState,useEffect}from "react";
import Image from "next/image";
import Logo from "../public/images/logo_transparent.png";
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
          pathname: `/bloglisting/${props.id}`,    // check
          query: { pid: props.id },
        }}
      >
        <a target="_blank">
          {/* Main content  */}
          <div className={styles.card}>
            <div style={{'display':'flex', 'alignItems':'center', 'justifyContent':'center', 'width':'30%', 'height':'100%'}} >
                <div style={{'border':'3px solid #F4D65D'}}>
                  <Image height={170} width={170} src={Logo}  />
                </div>
            </div>
            <div className={styles.textcontainer}>
              <div className={styles.heading}>{props.title}</div>
                
                <div className={styles.mainText}>
                    <p> {props.description.slice(0, 100)}...</p>
                  </div>
                  <div className={styles.counter}>{props.counter} Reads
                  </div>
                  <div style={{'display':'flex', 'alignItems':'center', 'justifyContent':'center', 'margin-top':'10px' }}>
                    <div className={styles.authorname}>{props.authorTitle} 
                    </div>
                    <div className={styles.time}>{props.time.toDate().toDateString()}
                    </div>
                  </div>
                </div>
            </div>
        </a>
      </Link>
    </div>
  );
}


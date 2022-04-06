// import React from "react";
// import reactDom from "react-dom";
// import { Image } from reactDom;

function Card(props) {
    let styles = props.cssmodule;
    let data = props.data;
    return (
    <div className={styles.card} id="card1">
        <span className={styles.onlinestat} data-status={data.currentStatus}>{data.currentStatus}</span>
        <img className={styles.astrologerimg} src={data.profilePicLink} alt="" />
        <div className={styles.infocontent}>
            <h2 className={styles.name}>Astro {data.firstName}</h2>
            <span className={styles.starrating}><i className="fas fa-search"></i><b>{data.rating}</b>({data.ratingCount} ratings) | {data.experience} years</span>
            <span className={styles.lang}><i className="fas fa-search"></i> {data.languages
                ? Object.keys(data.languages).map((e) => {
                    return data.languages[e] ? e + " " : "";
                  })
                : ""}{" "}</span>g
            <div className={styles.tags}>
                <div className={styles.title}>Main Speciality</div>
                <div className={styles.tagcontainer}>
                {data.expertise
                ? Object.keys(data.expertise).map((e) => {
                    return <span className={styles.tag}>{data.expertise[e] ? e + " " : ""}</span>;
                  })
                : ""}{" "}
                    
                </div>
            </div>
            <div className={styles.priceratetag}>
                ₹{data.priceChat}<small>/min</small>
            </div>
            <button className={styles.contactbutton}>Consult Now</button>
        </div>
    </div>);
}

export default Card;
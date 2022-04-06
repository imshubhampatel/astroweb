import Link from 'next/link'

import Image from 'next/image'


function Card(props) {
    let styles = props.cssmodule;
    let data = props.data;
    return (
    <div className={styles.card} id="card1">
        <span className={styles.onlinestat} data-status-color={data.currentStatus=="Online"? "green": data.currentStatus=="Busy" ?"orange":"red"}>{data.currentStatus}</span>
        <img className={styles.astrologerimg} src={data.profilePicLink} alt="" />
        <div className={styles.infocontent}>
            <h2 className={styles.name}> {data.firstName + " " + data.secondName}</h2>
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
                    if(data.expertise[e])
                    return <span key={e} className={styles.tag}>{data.expertise[e] ? e + " " : ""}</span>;
                    return null;
                  })
                : ""}{" "}
                    
                </div>
            </div>
            <div className={styles.priceratetag}>
                ₹{data.priceChat}<small>/min</small>
            </div>
             <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
             <button className={styles.contactbutton}> 

                     {data.currentStatus=="Online"? "Consult Now":"Schedule"}
                      </button>
                </Link>
                </div>
    </div>);
}

export default Card;
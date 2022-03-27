import  styles from '../../styles/components/astrologerlisitng/astrologer.module.css';
function Card() {
    return (
    <div className={`${styles.card}`} id="card1">
        <span className={`${styles.card.indicator}`} data-status-color="green">Online</span>
        <img src="download.jpg" alt="" />
        <div className={`${styles.card.infocontent}`}>
            <h2 class="name">Name</h2>
            <span className={`${styles.starrating}`}><i class="fas fa-search"></i><b>5</b>(14k ratings) | 15 years</span>
            <span class="lang"><i class="fas fa-search"></i>Hindi, Marathi</span>
            <div class="tags">
                <div class="title">Main Speciality</div>
                <div class="tag-container">
                    <span class="tag">Vedic</span>
                    <span class="tag">Tarot</span>
                    <span class="tag">Vaastu</span>
                </div>
            </div>
            <div class="priceratetag">
                ₹25<small>/min</small>
            </div>
            <button>Consult Now</button>
        </div>
    </div>
    );
}

export default Card;
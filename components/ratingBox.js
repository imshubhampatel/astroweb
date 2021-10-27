import styles from "../styles/components/ratingBox.module.css";
import { AiFillStar } from "react-icons/ai";

export default function RatingBox({ rating }) {
  let _rating = parseFloat(rating).toFixed(1);
  if (isNaN(_rating)) _rating = "0.0";

  return (
    <div
      className={`${styles.mainContainer} ${
        _rating >= 4 ? styles.bgGreen : styles.bgYellow
      } `}
    >
      {_rating} <AiFillStar />
    </div>
  );
}

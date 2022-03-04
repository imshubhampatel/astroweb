import styles from "../../styles/components/adminPanel/Review.module.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)



import { HiOutlineTrash, HiStar } from "react-icons/hi";
import { useState } from "react";



const RatingStars = ({ rating }) => {
  let _rating = parseInt(rating);
  if (isNaN(_rating)) _rating = 0;
  _rating = Math.min(_rating, 5);

  const yellowStars = [...Array(_rating)].map((e, i) => {
    return <HiStar key={i} style={{ color: "#FFDA2D" }} />;
  });

  const grayStars = [...Array(5 - _rating)].map((e, i) => {
    return <HiStar key={5 + i} style={{ color: "rgb(213, 213, 213)" }} />;
  });


  return [...yellowStars, ...grayStars];
};

const Review = ( {props,deleteReviewHandler} ) => {
  
  const [visibile, setVisibility] = useState(true); 

  const deleteReview = () => {
    
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire(
          'Deleted!',
          'Review has been deleted.',
          'success'
        );

        setVisibility(false); 


      // @TODO 
      // MAKE CALL TO FIREBASE TO DELTE THE REVIEW
      deleteReviewHandler();
      }
    })


    
  }

  const date = props.date
    ? new Date(props.date.seconds).toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "Invalid Time";

  // console.log(props.time.seconds);

  return (
    <div className={`${styles.container} my-2  card p-2 `} 
    
        style={visibile ? {} : {display: "none"}}
    >
      {/* TOP PART */}
      <div className={`d-flex gap-1`}>
        {/* Photo */}
        <div className={`${styles.photoContainer}`}>
        <Image
              src={props.user.profilePhoto}
              height="100"
              width="100"
              layout="responsive"
            />        </div>

        {/* User and Review info */}
        <div className={` flex-grow-1`}>
          <div>{props.user.name}</div>

          <div>
            <span>
              <RatingStars rating={props.rating} />
            </span>

            <span className="ms-1" style={{color: "rgba(128, 128, 128, 1)"}} >{date}</span>
          </div>
        </div>

        {/* Delete Button */}
        <div onClick={() => deleteReview()} >
          <h4>
            <HiOutlineTrash />
          </h4>
        </div>
      </div>

      {/* MAIN REVIEW */}
      <div className={`mt-2`}>{props.description}</div>
    </div>
  );
};

export default Review;


import styles from '../../styles/components/adminPanel/Review.module.css'


const Review = ({ props }) => {
    return (
      <div className={`${styles.container}`} >
        Hello
      </div>
    );
}

export default Review;


{/* <div className="card border-dark mb-3" >
<div className="card-header">
  {props.user.name}
</div>
<div className="card-body text-dark">
        <h5 className="card-title">Rating : {props.rating} <br></br> Time :</h5>
  <p className="card-text">
   {props.description}
   
  </p>
  <p>
    {"id" + props.id}
  </p>
</div>
</div> */}
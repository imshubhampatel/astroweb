import React from 'react'

const Review = ({ props }) => {
    return (
      <div className="card border-dark mb-3" >
        <div className="card-header">
          {props.user.name}
        </div>
        <div className="card-body text-dark">
                <h5 className="card-title">Rating : {props.rating} <br></br> Time :</h5>
          <p className="card-text">
           {props.description}
          </p>
        </div>
      </div>
    );
}

export default Review;

import React,{useState} from 'react'

function CommentCard(props) {
  const [present, setPresent] = useState(true);


  console.log(props)

    return (
      <div className="card bg-light mb-3 row">
        {/* <div className="card-header">Time : {props.data.time}</div> */}
        <div className="card-body col-10">
          <p className="card-text">Author : {props.data.name}</p>
          <p className="card-text">description : {props.data.content}</p>
        </div>
        <div className="col-2">
          {present ? <button onClick={() => {
            props.deleteComment(props.data.id);
            setPresent(false);
          }} className="btn btn-danger"> Delete </button>
 : "Comment Deleted"}
        </div>
      </div>
    );
}

export default CommentCard

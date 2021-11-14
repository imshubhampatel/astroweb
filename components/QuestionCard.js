import React from 'react'
import FireImage from './FireImage'
function QuestionCard(props) {
    return (
        <div className={"container form-group border p-3 rounded shadow-sm   "}><b> Question : </b>{props.data.question}
      
        <br/> 
        <div className="form-group border p-3 rounded shadow-sm   ">
        {props.data.imgUrl ? (
                  <div className="my-3" style={{ display: "block" }}>
                    <FireImage
                      src={props.data.imgUrl}
                      alt="Question Image"
                      layout="responsive"
                      width="600"
                      height="300"
                    />
                  </div>
                ) : (
                  ""
                )}  
                </div>  
                <b>Options :</b> <br/>
                <ul>
       {Object.values(props.data.options).map((val) => <li key={val} value={val}>{val}</li>)}
       </ul>
       <button className="btn btn-danger" onClick={() => props.deleteQues(props.data.id)}> Delete</button>
       </div>
    )
}

export default QuestionCard

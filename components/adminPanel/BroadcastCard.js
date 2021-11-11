import React,{useState,useEffect} from 'react';
import {broadcastStatus } from '../../dbObjects/Broadcasts'
function BroadcastCard(props ) {
  const [present, setPresent] = useState(true);  
  useEffect(() => {
    setPresent(props.data.status != broadcastStatus.CANCELLED);
  }, []);
    return (
        <div className="card bg-light mb-3">
            
        <div className="card-header">Title : {props.data.title}</div>
        <div className="card-body">
          {props.data.id}
          <p className="card-text">Author : {props.data.astrologerName}</p>
                <p className="card-text">status : {props.data.status}
          </p>
          {present ? <button className="btn btn-danger" onClick={() => {
            props.cancelBroadcast(props.data.id)
            setPresent(false)
          }
          }>Cancel</button> :"Cancelled"}
        </div>
      </div>
    );
}

export default BroadcastCard

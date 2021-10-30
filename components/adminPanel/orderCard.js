import React from 'react'

function OrderCard({props}) {
    return (
      <div className="card bg-light mb-3">
        <div className="card-header">Amount :  {props.amount}</div>
            <div className="card-body">
                {props.id}
          <p className="card-text">Status : {props.status}</p>
          <p className="card-text">Time : {props.time}</p>
        </div>
      </div>
    );
}

export default OrderCard

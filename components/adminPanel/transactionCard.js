import React from 'react'

export default function TransactionCard({props}) {
    return (
      <div className="card bg-light mb-3" >
        <div className="card-header"> {props.type}</div>
        <div className="card-body">
          <p className="card-text">{props.amount}</p>
        </div>
      </div>
    );
}

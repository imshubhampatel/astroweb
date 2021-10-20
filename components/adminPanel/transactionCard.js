import React from 'react'

export default function TransactionCard({props}) {
    return (
      <div class="card bg-light mb-3" >
        <div class="card-header"> {props.type}</div>
        <div class="card-body">
          <p class="card-text">{props.amount}</p>
        </div>
      </div>
    );
}

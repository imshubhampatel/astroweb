import React from 'react'
import Link from 'next/link'

function WalletInfoCard(props) {
    return (
      <div className="card border-dark mb-3">
        <div className="card-header">Astrologer : {props.data.astrologer}</div>
        <div className="card-body text-dark">
          <h7 className="card-title">
            Amount : {props.data.amount} <br></br> Time :{" "}
                    {props.data.time.seconds} <br />
                    ID : {props.data.id}
          </h7>
          <h6>Status : {props.data.status}</h6>
          <Link href={"/admin/astrologer/"+props.data.astrologer}><a target="_blank">See profile</a></Link>
          <button className="btn btn-primary" onClick={()=>props.astrologerPrivateDetailView(props.data)}> See Astrologer Account Details</button>
          <p className="card-text">{props.data.remark}</p>
          {props.data.status == "initiated" ? (
            <div>
              <button
                className="btn btn-success"
                onClick={() => props.approve(props.data)}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => props.reject(props.data)}
              >
                Reject
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
}

export default WalletInfoCard

import React from "react";

export default function MeetingCard({ props }) {
  return (
    <div className="card bg-light mb-3">
      <div className="card-header"> {props.astrologer}</div>
      <div className="card-body">
        <p className="card-text">{props.duration}</p>
      </div>
    </div>
  );
}

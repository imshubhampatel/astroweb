
function MeetingCard({props}) {
    return (
      <div className="card">
            <div className="card-body">{props.duration}{" Amount : "} {props.amount + "rate :"+ props.rate}</div>
      </div>
    );
}

export default MeetingCard;

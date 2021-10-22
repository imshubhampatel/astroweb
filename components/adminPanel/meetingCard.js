
function MeetingCard({props}) {
    return (
      <div class="card">
            <div class="card-body">{props.duration}{" Amount : "} {props.amount + "rate :"+ props.rate}</div>
      </div>
    );
}

export default MeetingCard;


export default function TransactionCard({ props} ) {
  return (
    <div className="card bg-light mb-3">
      <div className="card-header"> Detail : {props.subtype}  OrderId : {props.subtypeId}</div>
      <div className="card-body">
        <p className="card-text">Amount : {props.amount}</p>
        <p className="card-text">Type : {props.type}</p>
      </div>
    </div>
  );
}

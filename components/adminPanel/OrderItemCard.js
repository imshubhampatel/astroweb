import React ,{useState,useEffect} from 'react'
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FireImage from '../FireImage'
import {OrderItemStatus} from '../../dbObjects/OrderItem'

const MySwal = withReactContent(Swal);
function OrderItemCard(props) {
    const [data,setData] = useState(props.data);

    useEffect(()=>{
        setData(props.data);
    },[props.data]);
    
    async function changeOrderItemStatusHandler(event,orderItem) {
        event.preventDefault();
        orderItem.status = event.target.orderItemStatus.value;
        props.changeOrderItemStatus(props.orderId,orderItem);
        setData({...orderItem})
        MySwal.clickConfirm();
    }
    async function onChangeOrderItemStatusView(orderItem) {
        MySwal.fire({
            showConfirmButton: false,
            html: <div>
          <form onSubmit={(e)=>
              changeOrderItemStatusHandler(e,orderItem)}>      
             <input 
            className="form-control"
            placeholder="Order Item ID "
            name="orderItemId"
            id="orderItemId"
            type="text"  
            value={orderItem.itemId} 
            readOnly
            />
             <select 
             className="form-select"
            name="orderItemStatus"
            id="orderItemStatus"
            defaultValue={orderItem.status}
            >
             {Object.keys(OrderItemStatus).map((ctg) => <option value={OrderItemStatus[ctg]}> {ctg}</option>)}
                </select>
    
            <div className="text-end mt-4">
              <button
                className="btn btn-success"
                type="submit"
              >
                  Change Status
              </button>
            </div>
        </form>
    
        </div>,
        preConfirm: () => {
        }
          })
    
    }
    return (
        <div className="card bg-light mb-3">
        <div className="card-header">Name : {data.name}</div>
        <div className="card-body">
          <div>
        <Link
         href={{
           pathname: `/admin/store/item/${data.itemId}`,
           query: { pid: data.itemId },
         }}
       >
         <a target="_blank">
           <div>
             <span>
           <FireImage src={data.itemPhoto} height={100} width={100}/>
             </span>
               <span>  <b> Item ID </b>: {data.id}</span>
         <p className="card-text">quantity : {data.quantity}</p>
         <p className="card-text">Price : Rs. {data.price}.</p>  
         </div>   
         </a>
       </Link>
       </div>
       <span>
         Status : {data.status}  
         <button className="btn btn-success" onClick={()=>{
           onChangeOrderItemStatusView(data)}} > Change Status</button>
       </span>
       </div>
       </div>
    )
}

export default OrderItemCard

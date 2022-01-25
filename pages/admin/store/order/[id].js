
import styles from "../../../../styles/pages/admin/astrologermanagement.module.css";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { firebase,auth } from "../../../../config";
import Link from "next/link";
import AdminLayout from "../../../../components/adminPanel/layout";
import withAdminAuth from "../../../../auth/withAdminAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {Item ,ItemConverter} from '../../../../dbObjects/Item'
import FireImage from '../../../../components/FireImage'
import {changeOrderStatus, changeOrderItemStatus} from '../../../../utilities/store/order'
import {Order ,OrderConverter,OrderStatus} from '../../../../dbObjects/Order'
import {OrderItem ,OrderItemConverter,OrderItemStatus} from '../../../../dbObjects/OrderItem'
import OrderItemCard from '../../../../components/adminPanel/OrderItemCard';
import { EmployeePermissions } from "../../../../dbObjects/Employee";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);
const OrderDetail = withAdminAuth(() => {
  const router = useRouter();
  const { pid } = router.query;
  const [orderDetails, setOrderDetails] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (pid) {
      getOrderDetails(pid).then(data => setOrderDetails(data));
      getOrderItems(pid).then(data => {
        setOrderItems(data);
      })
    }
  }, [pid]);

  async function getOrderItems(orderId) {
    const ref = query(collection(db, "order", orderId, "items"));
    const querySnapshot = await getDocs(ref);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return data;
  }

  async function getOrderDetails(orderId) {
    const ref = doc(db, "order", orderId);
    const querySnapshot = await getDoc(ref);
    let data = { id: querySnapshot.id, ...querySnapshot.data() };
    return data;
  }

  async function changeOrderStatusHandler(event, order) {
    event.preventDefault();
    order.status = event.target.orderStatus.value;
    changeOrderStatus(order);
    setOrderDetails({ ...order });
    MySwal.clickConfirm();

  }
  
  async function onChangeOrderStatusView(order) {
    MySwal.fire({
      showConfirmButton: false,
      html: <div>
        <form onSubmit={(e) =>
          changeOrderStatusHandler(e, order)}>
          <input
            className="form-control"
            placeholder="Order ID "
            name="orderId"
            id="orderId"
            type="text"
            value={order.id}
            readOnly
          />
          <select
            className="form-select"
            name="orderStatus"
            id="orderStatus"
            defaultValue={order.status}
          >
            {Object.keys(OrderStatus).map((ctg) => <option value={OrderStatus[ctg]} key={ctg}> {ctg}</option>)}
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
    <div className="container mt-5">
      <div className="row">
        <div className="col"> Order ID : {orderDetails?.id} <br />
            itemCount : {orderDetails?.itemCount}<br />
            amount : {orderDetails?.amount}<br />
            User : {orderDetails?.User}<br />
            Status : {orderDetails?.status}
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={() => onChangeOrderStatusView(orderDetails)}>Change Status</button>
        </div>

      </div>
      <div className="row">
        <h1>Order Items</h1>
        {orderItems.map((e) => {
          return <OrderItemCard data={e} orderId={orderDetails.id} key={ orderDetails.id}changeOrderItemStatus={changeOrderItemStatus}></OrderItemCard>
        })}


      </div>
            
    </div>
  )
},EmployeePermissions.STORE_MANAGEMENT);
OrderDetail.getLayout = function getLayout(page) {
    return <AdminLayout active_page="4">{page}</AdminLayout>;
  };
export default OrderDetail

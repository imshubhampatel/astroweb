import styles from "../../../../styles/pages/admin/astrologermanagement.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  orderBy,
  startAt,
  limit,
  doc,
  setDoc,
  addDoc,
  endAt,
  endBefore,
  startAfter,
} from "firebase/firestore";
import { firebase, auth } from "../../../../config";
import Link from "next/link";
import AdminLayout from "../../../../components/adminPanel/layout";
import withAdminAuth from "../../../../auth/withAdminAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OrderSearchPagination from "../../../../components/adminPanel/OrderSearchPagination";
import {
  Order,
  OrderConverter,
  OrderStatus,
} from "../../../../dbObjects/Order";
import { FaCut } from "react-icons/fa";
import {
  changeOrderStatus,
  getAllOrdersBySearchValue,
  getAllOrdersByDate
} from "../../../../utilities/store/order";

const MySwal = withReactContent(Swal);
const db = getFirestore(firebase);

function OrderManagement() {
  const [statusOption, setStatusOption] = useState(OrderStatus.CREATED);
  const [ordersList, setOrdersList] = useState([]);
  const [lastQuerySnapshot, setlastQuerySnapshot] = useState([]);
  const [totalOrders, settotalOrders] = useState(100);
  const [itemsPerPage, setItemPerPage] = useState(2);

  useEffect(() => {
    getOrders(-1);
  }, [statusOption]);
  async function getAllOrders(object, type, itemsPerPage) {
    let ref = null;
    if (type == 1 && typeof object.docs[object.docs.length - 1] !== "undefined")
      ref = query(
        collection(db, "order"),
        where("status", "==", statusOption),
        orderBy("timestamp"),
        startAfter(object.docs[object.docs.length - 1]),
        limit(itemsPerPage)
      );
    else if (type == 0 && typeof object.docs[0] !== "undefined") {
      ref = query(
        collection(db, "order"),
        where("status", "==", statusOption),
        orderBy("timestamp"),
        endBefore(object.docs[0]),
        limit(itemsPerPage)
      );
    } else if (type == -1) {
      ref = query(
        collection(db, "order"),
        where("status", "==", statusOption),
        orderBy("timestamp"),
        limit(itemsPerPage)
      );
    }
    const querySnapshot = await getDocs(ref);
    setlastQuerySnapshot(querySnapshot);
    let data = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    return data;
  }
  async function getOrders(first) {
    getAllOrders(lastQuerySnapshot, first, itemsPerPage).then((data) => {
      setOrdersList(data);
    });
  }
  function removeFromOrderList(data) {
    let pr = ordersList;
    pr.splice(ordersList.indexOf(data), 1);
    setOrdersList(pr);
  }

  async function changeOrderStatusHandler(event, order) {
    event.preventDefault();
    removeFromOrderList(order);
    order.status = event.target.orderStatus.value;
    changeOrderStatus(order);
    MySwal.clickConfirm();
  }
  async function onChangeOrderStatusView(order) {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <form onSubmit={(e) => changeOrderStatusHandler(e, order)}>
            <input
              className="form-control"
              placeholder="Qauntity of item "
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
              {Object.keys(OrderStatus).map((ctg) => (
                <option value={OrderStatus[ctg]}> {ctg}</option>
              ))}
            </select>

            <div className="text-end mt-4">
              <button className="btn btn-success" type="submit">
                Change Status
              </button>
            </div>
          </form>
        </div>
      ),
      preConfirm: () => {},
    });
  }
 
  async function searchOrder(searchValue) {
    getAllOrdersBySearchValue(searchValue).then(data => setOrdersList(data));
  }
  async function getAllOrdersByDateHandler(search) {
    getAllOrdersByDate(statusOption,search).then(data => setOrdersList(data));
  }
  return (
    <div className="container">
      <div class="jumbotron jumbotron-fluid bg-dark text-white">
        <div class="container">
          <h1 class="display-4">Manage Store Orders</h1>
        </div>
      </div>
      <div className="dropdown">
        <label htmlFor="status"> Select Order Status </label>
        <select
          name="status"
          onChange={(e) => {
            setStatusOption(e.target.value);
          }}
          class="btn btn-secondary dropdown-toggle"
        >
          {Object.keys(OrderStatus).map((ctg) => (
            <option value={OrderStatus[ctg]}> {ctg}</option>
          ))}
        </select>
      </div>
      <div className="row">
        <OrderSearchPagination
          data={ordersList}
          onChangeOrderStatus={onChangeOrderStatusView}
          ItemsPerPage={5}
          totalOrders={totalOrders}
          getAllOrders={getOrders}
          searchOrder={searchOrder}
          getAllOrdersByDate={getAllOrdersByDateHandler}
        ></OrderSearchPagination>
      </div>
    </div>
  );
}
OrderManagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="4">{page}</AdminLayout>;
};
export default OrderManagement;

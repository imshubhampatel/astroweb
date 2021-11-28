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
  addDoc,
} from "firebase/firestore";
import { firebase,auth } from "../../../../config";
import Link from "next/link";
import AdminLayout from "../../../../components/adminPanel/layout";
import withAdminAuth from "../../../../auth/withAdminAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OrderSearchPagination from '../../../../components/adminPanel/OrderSearchPagination'
import {Order ,OrderConverter,OrderStatus} from '../../../../dbObjects/Order'



const MySwal = withReactContent(Swal);
const db = getFirestore(firebase);

function OrderManagement() {
    const [statusOptions,setStatusOptions] = useState("");
    const [ordersList,setOrdersList] = useState([]);

    useEffect(()=>{
        getAllOrders();
    },[]);
    async function getAllOrders() {
        const ref = query(collection(db, "order"));
        const querySnapshot = await getDocs(ref);
        let data = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });        
        setOrdersList(data);
    }
    async function changeOrderStatus(ItemId) {
        MySwal.fire({
            showConfirmButton: false,
            html: <div>
                <form onSubmit={addInventory}>
        <input 
            className="form-control"
            placeholder="ID"
            name="id"
            id="id"
            value={ItemId}
            type="text"  
            disabled   
            />         
             <input 
            className="form-control"
            placeholder="Qauntity of item "
            name="quantity"
            id="quantity"
            type="number"  
            required   
            />
             <input 
             class="form-check"
            name="remark"
            id="remark"
            type="text"    
            />
    
            <div className="text-end mt-4">
              <button
                className={`${styles.astroVerifyButton} ${styles.astroButton}`}
                type="submit"
              >
                  Add
              </button>
            </div>
        </form>

        </div>,
        preConfirm: () => {
        }
          })

   
    }
    return (
        <div className="container">
              <div class="jumbotron jumbotron-fluid bg-dark text-white">
            <div class="container">
                <h1 class="display-4">Manage Store Orders</h1>
            </div>
            </div> 
            <div className="dropdown">
                <label for="status" > Select Order Status  </label>
                <select name="status" onChange={(e)=>setStatusOptions(e.target.value)} class="btn btn-secondary dropdown-toggle">
                    {["categories"].map((ctg) => <option value={ctg.id}> {ctg.name}</option>)}
                </select>
     
            </div>
            <div className="row">
                <OrderSearchPagination data={ordersList} changeOrderStatus={changeOrderStatus} ItemsPerPage={10}></OrderSearchPagination>

            </div>
            
        </div>
    )
}
OrderManagement.getLayout = function getLayout(page) {
    return <AdminLayout active_page="4">{page}</AdminLayout>;
  };
export default OrderManagement

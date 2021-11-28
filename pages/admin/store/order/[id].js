import styles from "../../../../styles/pages/admin/astrologermanagement.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  getDoc,
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

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);
function Order() {
    const router = useRouter();
    const { pid } = router.query;
    const [orderDetails,setOrderDetails] = useState();

    useEffect(()=>{
        if(pid)
        getOrderDetails(pid).then(data=>setOrderDetails(data));
    },[pid]);

    async function getOrderDetails(orderId) {
        const ref = doc(db, "order",orderId);
        const querySnapshot = await getDoc(ref);
        let data =  { id: querySnapshot.id, ...querySnapshot.data() };
       
        return data;
    } 
    async function getAllOrders() {
      
    }

    return (
        <div className="container">
            Order ID : {orderDetails?.id}
            
        </div>
    )
}
Order.getLayout = function getLayout(page) {
    return <AdminLayout active_page="4">{page}</AdminLayout>;
  };
export default Order

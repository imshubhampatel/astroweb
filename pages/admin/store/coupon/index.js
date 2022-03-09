
import styles from "../../../../styles/pages/admin/astrologermanagement.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { firebase,auth } from "../../../../config";
import Link from "next/link";
import AdminLayout from "../../../../components/adminPanel/layout";
import withAdminAuth from "../../../../auth/withAdminAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CouponsSearchPagination from '../../../../components/adminPanel/CouponsSearchPagination'
import { EmployeePermissions } from "../../../../dbObjects/Employee";
import { Coupon,couponStatus,couponSubtype,discountType,couponConverter} from '../../../../dbObjects/Coupon'

const MySwal = withReactContent(Swal);
const db = getFirestore(firebase);

const itemManagement = withAdminAuth(()=> {
    
    const [coupons, setCoupons] = useState([]);
    
    useEffect(()=>{
        getAllCoupons();
    },[]);

    async function editCouponHandler(e,couponInfo) {
      e.preventDefault();
      couponInfo.maxDiscount = parseInt(e.target.maxDiscount.value);
      couponInfo.minPurchase =  parseInt(e.target.minPurchase.value);
      couponInfo.endDate = new Date(Date.parse(e.target.endDate.value));
      couponInfo.discountType = e.target.discountType.value;
      couponInfo.limit = parseInt(e.target.limit.value);
      couponInfo.subtype = e.target.subtype.value;
      couponInfo.discount = (e.target.discount.value);
      couponInfo.updatedAt = new Date();
      couponInfo.title = e.target.title.value;
      const ref = doc(db, "coupon", couponInfo.id);
      console.log(couponInfo)
      await updateDoc(ref, {...couponInfo});
      Swal.clickConfirm();
      await getAllCoupons();
    }

    async function getCouponInfo(couponId) {
        const ref = doc(db, "coupon", couponId).withConverter(couponConverter);
        const querySnapshot = await getDoc(ref);
        let data = querySnapshot.data() ;
        return data;
    }
 
    async function editCouponView(ItemId) {
        var couponInfo = await getCouponInfo(ItemId);
        MySwal.fire({
            showConfirmButton: false,
            html: <div>
                <div>
                    <h4>Current Coupon Info</h4>
                    <div>
                    <p>Title : {couponInfo.title}</p>
                    <p>Code : {couponInfo.code}</p>
                    <p> Is coupon active  : {couponInfo.live?"YES":"NO"} </p>
                        <p>Current max use limit : {couponInfo.limit}</p>
                        <p>start Date : {couponInfo.startDate.toDate().toDateString()}</p>
                        <p>end Date : {couponInfo.endDate.toDate().toDateString()}</p>
                        <p>min Purchase : {couponInfo.minPurchase}</p>
                        <p> Discount : {couponInfo.discount}</p>
                        <p> Discount Type: {couponInfo.discountType}</p>
                        <p> Applicable on  : {couponInfo.subtype}</p>
                        <p>max Discount : {couponInfo.maxDiscount}</p>
                        <p> Main Categories : {couponInfo.mainCategory.map(e => <>{e + " "}</>)}</p>
                    </div>
                </div>
                <form onSubmit={(e)=>editCouponHandler(e,couponInfo)}>
                <label htmlFor="title">Title</label>
             <input
               className="form-control"
               placeholder="Coupon Title "
               name="reason-text"
               id="title"
               defaultValue={couponInfo.title}
               required
             />
           
             <label htmlFor="endDate">endDate</label>

             <input
               className="form-control"
               type="date"
               name="endDate"
               id="endDate"
               defaultValue={couponInfo.endDate.toDate().toDateString()}
               required
             />
               <label htmlFor="discountType">discountType</label>

             <select className="form-control" id="discountType" defaultValue={couponInfo.discountType} required>
               { Object.keys(discountType).map((e) => (
                 <option value={discountType[e]} key={e}>
                   {discountType[e]}
                 </option>
               ))}
             </select>
             <label htmlFor="discount"> discount</label>
             <input
               className="form-check"
               name="discount"
               placeholder="please enter discount Amount"
               id="discount"
               defaultValue={couponInfo.discount}
               type="number"
             />
             <label htmlFor="subtype">subtype</label>
              <select className="form-control" id="subtype" defaultValue={couponInfo.subtype} required>
              { Object.keys(couponSubtype).map((e) => (
                 <option value={couponSubtype[e]} key={e}>
                   {couponSubtype[e]}
                 </option>
               ))}
              </select>
             <label htmlFor="maxDiscount">Maximum Discount</label>

             <input
               className="form-control"
               placeholder="please enter maxDiscount"
               name="maxDiscount"
               type="number"
               id="maxDiscount"
               defaultValue={couponInfo.maxDiscount}
               required
             />
             <label htmlFor="minPurchase">Minimum Purchase</label>

             <input
               className="form-control"
               placeholder="please enter minPurchase"
               name="minPurchase"
               type="number"
               id="minPurchase"
               defaultValue={couponInfo.minPurchase}
               required
             />
              <label htmlFor="limit"> Max number of uses per user</label>
             <input
               className="form-check"
               name="limit"
               placeholder="please enter max usage limit "
               id="limit"
               defaultValue={couponInfo.limit}
               type="number"
             />
               <label htmlFor="live"> Activate </label>
             <input
               className="form-check"
               name="live"
                id="live"
               type="checkbox"
               defaultChecked
             />
            <div className="text-end mt-4">
              <button
                className={'btn btn-success'}
                type="submit"
              >
                  Update
              </button>
            </div>
        </form>

        </div>,
        preConfirm: () => {
        }
          })

   
    }
    async function getAllCoupons() {
        const ref = query(collection(db, "coupon"));
        const querySnapshot = await getDocs(ref);
        let data = querySnapshot.docs.map((doc) => {
          return {id: doc.id,...doc.data()};
        });        
        setCoupons(data);
    }
  

    return (
        <div className="container">
              <div className="jumbotron jumbotron-fluid bg-dark text-white">
            <div className="container">
                <h1 className="display-4">Manage Coupons</h1>
            </div>
            </div> 
            <div className="row">
                <CouponsSearchPagination data={coupons} editCouponView={editCouponView} ItemsPerPage={20}></CouponsSearchPagination>
            </div>
            
        </div>
    )
},EmployeePermissions.STORE_MANAGEMENT);
itemManagement.getLayout = function getLayout(page) {
    return <AdminLayout active_page="4">{page}</AdminLayout>;
  };
export default itemManagement

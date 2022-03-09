import React from "react";
import styles from "../../styles/pages/admin/astrologer/[id].module.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import router from "next/router";

import ReactPaginate from "react-paginate";
import {
  collection,
  where,
  getDocs,
  setDoc,
  addDoc,
  doc,
  getFirestore,
  query,
  getDoc,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { uploadDocToStorage } from "../../utilities/utils";
import { EmployeePermissions } from "../../dbObjects/Employee";
import { couponConverter, Coupon, discountType,couponSubtype, couponStatus , meetingTypes} from '../../dbObjects/Coupon'

const MySwal = withReactContent(Swal);
const db = getFirestore(firebase);

const storemanagement = withAdminAuth(() => {
  const [categories, setCategories] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
    getAppDetails().then().catch();
  }, []);

  async function addCategoryHandler(e) {
    e.preventDefault();
    let category = {
      id: String(e.target.name.value).toLowerCase(),
      name: e.target.name.value,
      description: e.target.description.value,
      logo: "testing/zoomgs.png",
      visible: e.target.visible.checked,
    };
    const ref = doc(db, "app_details/store/categories", category.id);
    await setDoc(ref, { ...category });
    Swal.clickConfirm();
  }
  async function addItemHandler(e) {
    e.preventDefault();
    let uid = uuidv4();
    let photosUrlList = [];

    for (let i = 0; i < e.target.photos.files.length; i++) {
      photosUrlList.push("items/" + uid + "/photo_" + i);
    }
    let item = {
      id: uid,
      name: e.target.name.value,
      description: e.target.description.value,
      headline: e.target.headline.value,
      category: e.target.category.value,
      mrp: Number(e.target.mrp.value),
      available: 0,
      sellingPrice: Number(e.target.sellingPrice.value),
      photos: photosUrlList,
      visible: e.target.visible.checked,
    };
    for (let i = 0; i < e.target.photos.files.length; i++) {
      uploadDocToStorage({
        path: item.photos[i],
        file: e.target.photos.files[i],
      });
    }
    console.log(item);
    const ref = doc(db, "items", uid);
    await setDoc(ref, item);
    Swal.clickConfirm();
  }

  async function addCouponHandler(e) {
    e.preventDefault();
    let mainCategories = []
    if( e.target.RightNow.checked)
      mainCategories.push("Right Now")
      if( e.target.Scheduled.checked)
      mainCategories.push("Scheduled")
   
    let coupon = {
      id: e.target.code.value,
      code: e.target.code.value,
      createdAt: new Date(),
      maxDiscount: parseInt(e.target.maxDiscount.value),
      maxTotalDiscount: parseInt(e.target.maxTotalDiscount.value),
      minPurchase: parseInt(e.target.minPurchase.value),
      // time: e.target.time.value,
      mainCategory : mainCategories,
      endDate: new Date(Date.parse(e.target.endDate.value)),
      startDate: new Date(Date.parse(e.target.startDate.value)),
      status: couponStatus.CREATED,
      title: e.target.title.value,
      totalUses: 0,
      discountType: e.target.discountType.value,
      discount: (e.target.discount.value),
      limit: parseInt(e.target.limit.value),
      subtype: e.target.subtype.value,
      updatedAt : new Date(),
      categoryType : e.target.categoryType.value,
      live : true
    };

    if(coupon.discountType==discountType.PERCENTAGE && (coupon.discount>100 || coupon.discount<0)) {
      alert("Invalid Discount");
      return;
    }
    const ref = doc(db, "coupon", coupon.id).withConverter(couponConverter);
    await setDoc(ref, new Coupon(coupon));
    Swal.clickConfirm();
  }

  async function getAppDetails() {
    const astros = collection(db, "app_details");
  
    var querySnapshot = await getDoc(doc(astros, "store"));
 
     if (querySnapshot.exists()) {
       setTotalOrders(querySnapshot.data().orderCount);
     } else {
       // console.log("no")
     }
  }

  async function getAllCategories() {
    const ref = query(collection(db, "app_details/store/categories"));
    const querySnapshot = await getDocs(ref);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return data;
  }

  const addCategoryView = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <form onSubmit={addCategoryHandler}>
            <input
              className="form-control"
              placeholder="Name of Category "
              name="name"
              id="name"
              type="text"
              required
            />
            <input
              className="form-control"
              placeholder="Description of Category "
              name="description"
              id="description"
              type="text"
              required
            />
            <input
              className="form-check"
              name="visible"
              id="visible"
              type="checkbox"
            />
            <input
              className="form-control"
              type="file"
              name="reason-text"
              id="logo"
              required
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
        </div>
      ),
      preConfirm: () => {},
    });
  };
  const addItemView = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <form onSubmit={addItemHandler}>
            <input
              className="form-control"
              placeholder="Product Name "
              name="reason-text"
              id="name"
              required
            />
            <input
              className="form-control"
              placeholder="Product Description "
              name="reason-text"
              id="description"
              required
            />
            <input
              className="form-control"
              placeholder="Product Headline "
              name="reason-text"
              id="headline"
              required
            />
            <input
              className="form-control"
              type="file"
              multiple
              name="photos"
              id="photos"
              placeholder="Choose photos for product"
              required
            />
            <select className="form-control" id="category" required>
              {categories.map((e) => (
                <option value={e.id} key={e.id}>{e.name}</option>
              ))}
            </select>
            <input
              className="form-control"
              placeholder="please enter MRP"
              name="mrp"
              type="number"
              id="mrp"
              required
            />

            <input
              className="form-control"
              placeholder="please enter Selling Price"
              name="sp"
              type="number"
              id="sellingPrice"
              required
            />
            <input
              className="form-check"
              name="visible"
              id="visible"
              type="checkbox"
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
        </div>
      ),
      preConfirm: () => {},
    });
  };
   const addCouponView = () => {
     MySwal.fire({
       showConfirmButton: false,
       html: (
         <div>
           <form onSubmit={addCouponHandler}>
             <label htmlFor="title">Title</label>
             <input
               className="form-control"
               placeholder="Coupon Title "
               name="reason-text"
               id="title"
               required
             />
          <label htmlFor="code">code</label>

             <input
               className="form-control"
               placeholder="coupon code "
               name="reason-text"
               id="code"
               required
             />
              <label htmlFor="startDate">startDate</label>

             <input
             type="date"
               className="form-control"
               name="reason-text"
               id="startDate"
               required
             />
             <label htmlFor="endDate">endDate</label>

             <input
               className="form-control"
               type="date"
               name="endDate"
               id="endDate"
               required
             />
               <label htmlFor="discountType">discountType</label>

             <select className="form-control" id="discountType" required>
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
               min={0}
               id="discount"
               type="number"
             />
             <label htmlFor="categoryType">categoryType</label>

              <select className="form-control" id="categoryType" required>
              { Object.keys(meetingTypes).map((e) => (
                 <option value={meetingTypes[e]} key={e}>
                   {meetingTypes[e]}
                 </option>
               ))}
              </select>
              <label htmlFor="subtype">subtype</label>

              <select className="form-control" id="subtype" required>
              { Object.keys(couponSubtype).map((e) => (
                 <option value={couponSubtype[e]} key={e}>
                   {couponSubtype[e]}
                 </option>
               ))}
              </select>
             <label htmlFor="maxDiscount">maxDiscount</label>

             <input
               className="form-control"
               placeholder="please enter maxDiscount"
               name="maxDiscount"
               type="number"
               min={0}
               id="maxDiscount"
               required
             />
            <label htmlFor="mainCategory">select Main Categories</label><br/>
            <label htmlFor="RightNow"> Right Now
            <input
              className="form-checkbox" 
              type="checkbox"             
              name="RightNow"
              id="RightNow"
              
            />
            </label>
            <label htmlFor="Scheduled"> Scheduled
            <input
              className="form-checkbox"              
              name="Scheduled"
              id="Scheduled"
              type="checkbox"             
            />
  
            </label>
            <br/>
                <label htmlFor="maxTotalDiscount">maxTotalDiscount</label>

              <input
                className="form-control"
                placeholder="please enter maxTotalDiscount"
                name="maxTotalDiscount"
                type="number"
                id="maxTotalDiscount"
                min={0}
                required
              />
             <label htmlFor="minPurchase">minPurchase</label>

             <input
               className="form-control"
               placeholder="please enter minPurchase"
               name="minPurchase"
               type="number"
               id="minPurchase"
               min={0}
               required
             />
              <label htmlFor="limit"> limit</label>
             <input
               className="form-check"
               name="limit"
               placeholder="please enter max usage limit "
               min={0}
               id="limit"
               type="number"
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
         </div>
       ),
       preConfirm: () => {},
     });
   };
  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid bg-dark text-white">
        <div className="container">
          <h1 className="display-4">Manage Store</h1>
        </div>
      </div>
      <div className="row">
        <h4>Total Orders : {totalOrders}</h4>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={addCategoryView}>
            {" "}
            Add Category
          </button>
          <br/>          <br/>

          <button className="btn btn-primary" onClick={addItemView}>
            {" "}
            Add Item
          </button>
          <br/>          <br/>


          <button className="btn btn-primary" onClick={addCouponView}>
            {" "}
            Add Coupon
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => router.push("/admin/store/item")}
          >
            {" "}
            Manage Items
          </button>
          <br/>          <br/>


          <button
            className="btn btn-primary"
            onClick={() => router.push("/admin/store/order")}
          >
            {" "}
            Manage Orders
          </button>
          <br/>          <br/>


          <button
            className="btn btn-primary"
            onClick={() => router.push("/admin/store/coupon")}
          >
            {" "}
            Manage Coupons
          </button>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
}, EmployeePermissions.STORE_MANAGEMENT);

storemanagement.getLayout = function getLayout(page) {
  return <AdminLayout active_page="4">{page}</AdminLayout>;
};

export default storemanagement;

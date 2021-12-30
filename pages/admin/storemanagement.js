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
  orderBy,
  limit,
  endAt,
  startAt,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { uploadDocToStorage } from "../../utilities/utils";
import { EmployeePermissions } from "../../dbObjects/Employee";

const MySwal = withReactContent(Swal);
const db = getFirestore(firebase);

const storemanagement = withAdminAuth(() => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
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
  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid bg-dark text-white">
        <div className="container">
          <h1 className="display-4">Manage Store</h1>
        </div>
      </div>
      <div className="row">
        <h4>Total Orders : 100</h4>
        <h4>Total Items : 100</h4>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={addCategoryView}>
            {" "}
            Add Category
          </button>
          <button className="btn btn-primary" onClick={addItemView}>
            {" "}
            Add Item
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
          <button
            className="btn btn-primary"
            onClick={() => router.push("/admin/store/order")}
          >
            {" "}
            Manage Orders
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

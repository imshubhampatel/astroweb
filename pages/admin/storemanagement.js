import React from "react";
import styles from "../../styles/pages/admin/astrologer/[id].module.css";

import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  where,
  getDocs,
  getFirestore,
  query,
    orderBy,
  limit,
    endAt,
  startAt,
} from "firebase/firestore";
import { firebase } from "../../config";
import Link from "next/link";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const db = getFirestore(firebase);

const storemanagement = withAdminAuth(()=> {

    const [categories,setCategories] = useState([{name:"gemstone"}]);

    async function addCategoryHandler(e) {
        e.preventDefault();
        Swal.clickConfirm();
    }
    async function addItemHandler(e) {
        e.preventDefault();
        console.log(e.target.images.files);
        Swal.clickConfirm();
    }
    async function getAllCategories() {

    }
  
    const addCategoryView = () => {
        MySwal.fire({
            showConfirmButton: false,
            html: <div>
                <form onSubmit={addCategoryHandler}>
            <input 
            className="form-control"
            placeholder="Name of Category "
            name="reason-text"
            onChange={e => {
            }}      
            />
             <input 
            className="form-control"
            type="file"
            name="reason-text"     
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
    const addItemView = () => {
        MySwal.fire({
            showConfirmButton: false,
            html: <div>
        <form onSubmit={addItemHandler}>
        <input 
            className="form-control"
            placeholder="Product Name "
            name="reason-text"
               
            />  
            <input 
            className="form-control"
            placeholder="Product Description "
            name="reason-text"
              
            />
            <input 
            className="form-control"
            placeholder="Product Headline "
            name="reason-text"
              
            />
             <input 
            className="form-control"
            type="file" multiple
            name="images"
            id="images" 
            placeholder="Choose photos for product"

            />
            <select className="form-control" >
            {categories.map(e =><option value={e.name}>{e.name}</option>)}
            </select>
            <input 
            className="form-control"
            placeholder="MRP "
            name="reason-text"
            type="number"
              
            />


            <input 
            className="form-control"
            placeholder="SP"
            name="reason-text"
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

        </div>,
        preConfirm: () => {
        }
          })

    }
    return (
        <div className="container">
            <div class="jumbotron jumbotron-fluid bg-dark text-white">
            <div class="container">
                <h1 class="display-4">Manage Store</h1>
            </div>
            </div>  
            <div className="row">
                <h4>Total Orders :  100</h4>
                <h4>Total Items : 100</h4>

            </div>
            <div className="row">
            <div className="col">
                <button className="btn btn-primary" onClick={addCategoryView}> Add Category</button>
                <button className="btn btn-primary" onClick={addItemView}> Add Item</button>
                <button className="btn btn-primary"> Manage Items</button>
            </div>
            <div className="col">
                <button  className="btn btn-primary"> Manage Orders</button>
            </div>

        </div>     
        <div className="row">
            
        </div>     
        </div>
        )});

storemanagement.getLayout = function getLayout(page) {
    return <AdminLayout active_page="4">{page}</AdminLayout>;
  };

export default storemanagement

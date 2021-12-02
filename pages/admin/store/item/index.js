
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
import ItemsSearchPagination from '../../../../components/adminPanel/ItemsSearchPagination'
import {Item ,ItemConverter} from '../../../../dbObjects/Item'

const MySwal = withReactContent(Swal);
const db = getFirestore(firebase);

const itemManagement = withAdminAuth(()=> {
    
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [items, setItems] = useState([]);
    const [employee,setEmployee] = useState();
    
    useEffect(()=>{
        getAllCategories();
        onAuthStateChanged(auth, (authUser) => {
            if (!authUser) {
              router.replace("/admin/signin");
            } else {
                setEmployee(authUser);
            }
          });

    },[]);
    async function getAllCategories() {
        const ref = query(collection(db, "app_details/store/categories"));
        const querySnapshot = await getDocs(ref);
        let data = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });        
        setCategories(data);
        let selected = data.length > 0 ? data[0] : null;
        selectCategory(selected.id);
    }
    async function addInventory(event) {
        event.preventDefault();

        let inventory = {
            timestamp : new Date(),
            quantity : event.target.quantity.value,
            remark : event.target.remark.value,
            userUid : employee.uid,
        }
        console.log(inventory);
        const ref = collection(db, "items",event.target.id.value,"inventory");
        await addDoc(ref,inventory);
        MySwal.clickConfirm();

    }
    async function addInventoryView(ItemId) {
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
    async function getItemForCategory(category) {
        const ref = query(collection(db, "items"),where("category","==",category));
        const querySnapshot = await getDocs(ref);
        let data = querySnapshot.docs.map((doc) => {
          return doc.data();
        });        
        setItems(data);

    }
    async function selectCategory(category) {
        setSelectedCategory(category);
        getItemForCategory(category);
    }

    return (
        <div className="container">
              <div class="jumbotron jumbotron-fluid bg-dark text-white">
            <div class="container">
                <h1 class="display-4">Manage Store Items</h1>
            </div>
            </div> 
            <div className="dropdown">
                <label for="category" > Select Category  </label>
                <select name="category" onChange={(e)=>selectCategory(e.target.value)} class="btn btn-secondary dropdown-toggle">
                    {categories.map((ctg) => <option value={ctg.id}> {ctg.name}</option>)}
                </select>
     
            </div>
            <div className="row">
                <ItemsSearchPagination data={items} addInventoryView={addInventoryView} ItemsPerPage={10}></ItemsSearchPagination>

            </div>
            
        </div>
    )
});
itemManagement.getLayout = function getLayout(page) {
    return <AdminLayout active_page="4">{page}</AdminLayout>;
  };
export default itemManagement

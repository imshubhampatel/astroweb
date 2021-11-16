import styles from "../../../../styles/pages/admin/astrologermanagement.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  doc,getDoc,
  getDocs,
  getFirestore,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { firebase,auth } from "../../../../config";
import Link from "next/link";
import AdminLayout from "../../../../components/adminPanel/layout";
import withAdminAuth from "../../../../auth/withAdminAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ItemsSearchPagination from '../../../../components/adminPanel/ItemsSearchPagination'
import {Item ,ItemConverter} from '../../../../dbObjects/Item'
import FireImage from '../../../../components/FireImage'


const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);

function ItemEdit() {
    const router = useRouter();
    const { pid } = router.query;
    const [itemInfo,setItemInfo] = useState({});
    const [selectedImage,setSelectedImage] = useState(0);

    async function getItemInfo(Id) {
        const ref = doc(db, "items",Id).withConverter(ItemConverter);
        const querySnapshot = await getDoc(ref);  
        setItemInfo(querySnapshot.data());
    }
    useEffect(()=>{
        if(pid) 
        getItemInfo(pid);
    },[pid]);

    async function addItemHandler(event) {
        event.preventDefault();
        let itemInfoTemp = itemInfo;
        itemInfoTemp.name = event.target.name.value;
        itemInfoTemp.headline = event.target.headline.value;
        itemInfoTemp.description = event.target.description.value;
        itemInfoTemp.mrp = event.target.mrp.value;
        itemInfoTemp.sellingPrice = event.target.sellingPrice.value;
        setItemInfo(itemInfoTemp);
        const ref = doc(db, "items",itemInfo.id).withConverter(ItemConverter);
        const querySnapshot = await setDoc(ref,itemInfoTemp);  
        MySwal.clickConfirm();

    }
    function nextImage() {
        setSelectedImage((selectedImage+1)%(itemInfo.photos.length));
    }
    const editItemView = () => {
        MySwal.fire({
            showConfirmButton: false,
            html: <div>
        <form onSubmit={addItemHandler}>
        <input 
            className="form-control"
            placeholder="Product Name "
            name="reason-text"
            id="name"
            defaultValue={itemInfo.name}
            required
            />  
            <input 
            className="form-control"
            placeholder="Product Description "
            name="reason-text"
            id="description"
            defaultValue={itemInfo.description}
            required
            />
            <input 
            className="form-control"
            placeholder="Product Headline "
            name="reason-text"
            id="headline"  
            defaultValue={itemInfo.headline}
            required
            />
            <input 
            className="form-control"
            placeholder="please enter MRP"
            name="mrp"
            type="number"
            id="mrp"
            defaultValue={itemInfo.mrp}
            required
            />


            <input 
            className="form-control"
            placeholder="please enter Selling Price"
            name="sp"
            type="number"
            id="sellingPrice"
            defaultValue={itemInfo.sellingPrice}

            required
            
            />
            <input 
             class="form-check"
            name="visible"
            id="visible"
            type="checkbox"
            defaultChecked={itemInfo.visible}
            />

            <div className="text-end mt-4">
              <button
                className={"btn btn-success"}
                type="submit"
              >
                  Save Changes
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
            <div className="row">
                <div className="col">  <h4>Item Name : {itemInfo.name}</h4></div>
                <div className="col"> <button className="btn btn-success" onClick={editItemView}>Edit Item Information</button></div>
          
            <p>{itemInfo.headline} </p>
            <p>Desc : {itemInfo.description}</p>
    <p>MRP : {itemInfo.mrp} |   selling Price : {itemInfo.sellingPrice}</p>

            </div>
            <div className="row">
                <h4>Photos :</h4>
                <div className="my-3" style={{ display: "block" }}>
               {itemInfo.photos ? 
                    <FireImage
                      src={itemInfo?.photos[selectedImage]}
                      alt="Question Image"
                      layout="responsive"
                      width="600"
                      height="300"
                    />
                  :"loading"}
                  </div>
                <button onClick={nextImage} className="btn btn-primary">Next</button>
            </div>
            
        </div>
    );
}

ItemEdit.getLayout = function getLayout(page) {
    return <AdminLayout active_page="4">{page}</AdminLayout>;
  };
export default ItemEdit
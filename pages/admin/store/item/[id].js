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
import {uploadDocToStorage} from '../../../../utilities/utils'
import {Item ,ItemConverter} from '../../../../dbObjects/Item'
import FireImage from '../../../../components/FireImage'
import {deleteDataFromStorage} from '../../../../utilities/utils'
import { EmployeePermissions } from "../../../../dbObjects/Employee";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);

const ItemEdit = withAdminAuth(() =>{
    const router = useRouter();
    const { pid } = router.query;
    const [itemInfo,setItemInfo] = useState({});
    const [selectedImage,setSelectedImage] = useState(0);

    async function getItemInfo(Id) {
        const ref = doc(db, "items",Id).withConverter(ItemConverter);
        const querySnapshot = await getDoc(ref);  
        setItemInfo(querySnapshot.data());
    }
   
    async function removePhoto(path) {
        let itemInfoTemp = itemInfo;
        const index = itemInfoTemp.photos.indexOf(path);
        if (index > -1) {
         itemInfoTemp.photos.splice(index, 1);
         setItemInfo(itemInfoTemp);
         const ref = doc(db, "items",itemInfo.id).withConverter(ItemConverter);
         setDoc(ref,itemInfoTemp).then(()=>{
            deleteDataFromStorage(path).then(()=>{
                alert("Image Successfully deleted");
            }).catch((err)=>{
                alert("Error Occcured while deleting");

            });
         });  
        }

    }
    async function addPhotos(event) {
        event.preventDefault();
        let itemInfoTemp = itemInfo;
        let photos = [];
        let time = (new Date()).getTime();
        for(let i=0;i<event.target.photos.files.length;i++)
        {    
            photos.push("items/"+itemInfo.id+"/photo_"+time+"_"+i);
            itemInfoTemp.photos.push(photos[i]);
            uploadDocToStorage({path: photos[i],file:event.target.photos.files[i]});
        }  
        setItemInfo(itemInfoTemp);
        const ref = doc(db, "items",itemInfo.id).withConverter(ItemConverter);
        setDoc(ref,itemInfoTemp).then().catch(e=>{
            alert("Failed to add Images");
        });
        MySwal.clickConfirm();
    }
    async function addInventory(event) {
        event.preventDefault();

        let inventory = {
            timestamp : new Date(),
            quantity : Number(event.target.quantity.value),
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
                    <label htmlFor="id" >Item ID</label>
        <input 
            className="form-control"
            placeholder="ID"
            name="id"
            id="id"
            value={ItemId}
            type="text"  
            disabled   
            />        
              <label htmlFor="quantity" > Quantity</label>
 
             <input 
            className="form-control"
            placeholder="Qauntity of item "
            name="quantity"
            id="quantity"
            type="number"  
            required   
            />
            <label htmlFor="remark" > remark</label>

             <input 
             className="form-check"
            name="remark"
            id="remark"
            type="text"   
            placeholder="Please Add Remarks !" 
            />
    
            <div className="text-end mt-4">
              <button
                className={"btn btn-primary"}
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
    async function addPhotosView(event) {
        MySwal.fire({
            showConfirmButton: false,
            html: <div>
        <form onSubmit={addPhotos}>
       <label htmlFor="photos"> photos : </label>
        <input 
            className="form-control"
            type="file" multiple
            name="photos"
            id="photos" 
            placeholder="Choose photos for product"
            required

            />

            <div className="text-end mt-4">
              <button
                className={"btn btn-success"}
                type="submit"
              >
                  Add Photos
              </button>
            </div>
        </form>

        </div>,
        preConfirm: () => {
        }
          })

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
        itemInfoTemp.mrp =  Number(event.target.mrp.value);
        itemInfoTemp.sellingPrice = Number(event.target.sellingPrice.value);
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
             className="form-check"
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
                <div className="col-10">  <h4>Item Name : {itemInfo.name}</h4>
                <p>{itemInfo.headline} </p>
                </div>
                <div className="col-2"> 
                <div className="row">                
                <button className="btn btn-primary btn-md" onClick={()=>addInventoryView(itemInfo.id)}>Add Inventory</button>
                </div>
                <div className="row">
                <button className="btn btn-primary btn-md" onClick={addPhotosView}>Add Photos</button>

                <button className="btn btn-success btn-md" onClick={editItemView}>Edit Item Information</button>
                </div>
                </div>
            <p>Desc : {itemInfo.description}</p>
            <p>MRP : {itemInfo.mrp} |   selling Price : {itemInfo.sellingPrice}</p>
            <p><b>Quantity Available : </b> {itemInfo.available}</p>

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
                <div className="row">
                    <div className="col">
                    <button onClick={()=>removePhoto(itemInfo?.photos[selectedImage])} className="btn btn-danger">Delete Image</button>

                    </div>
                    <div className="col">
                    <button onClick={nextImage} className="btn btn-primary">Next</button>

                    </div>
                </div>
            </div>
            
        </div>
    );
},EmployeePermissions.STORE_MANAGEMENT);

ItemEdit.getLayout = function getLayout(page) {
    return <AdminLayout active_page="4">{page}</AdminLayout>;
  };
export default ItemEdit
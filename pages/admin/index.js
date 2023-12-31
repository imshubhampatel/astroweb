import AdminLayout from "../../components/adminPanel/layout";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import withAdminAuth from "../../auth/withAdminAuth";
import { EmployeePermissions } from "../../dbObjects/Employee";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { firebase } from "../../config";
import EditBanner from "../../components/editBanner";
import { setDoc } from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";
import { getFile, uploadDocToStorageWithUrl } from "../../utilities/utils";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);


const Home = withAdminAuth(() => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAstrologers, setTotalAstrologers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [commission, setCommission] = useState(0);
  const [banners, setBanners] = useState([]);
  const [adminWalletBalance, setadminWalletBalance] = useState(0);
  const [totalMeetings, setTotalMeetings] = useState(0);

  async function getBanners() {
    const astros = collection(db, "banners");
    var querySnapshot = await getDocs(astros);
    return querySnapshot.docs.map((e)=>{
      return {...e.data(),id:e.id}})
 
  }

  async function getAppDetails() {
   const astros = collection(db, "app_details");
   var querySnapshot = await getDoc(
     doc(astros, "astrologerDetails"));
    
   if (querySnapshot.exists()) {
     setTotalAstrologers(querySnapshot.data().astrologerCount);
   } else {
     // console.log("no")
   }
     querySnapshot = await getDoc(doc(astros, "userDetails"));

     if (querySnapshot.exists()) {
       setTotalUsers(querySnapshot.data().userCount);
     } else {
       // console.log("no")
     }
    querySnapshot = await getDoc(doc(astros, "store"));

    if (querySnapshot.exists()) {
      setTotalOrders(querySnapshot.data().orderCount);
    } else {
      // console.log("no")
    }
    querySnapshot = await getDoc(doc(astros, "money"));
    if (querySnapshot.exists()) {
      setCommission(querySnapshot.data().commission);
      setadminWalletBalance(querySnapshot.data().adminBalance);
    } else {
      // console.log("no")
    }
    querySnapshot = await getDoc(doc(astros, "astrologerDetails"));
    if (querySnapshot.exists()) {
      setTotalMeetings(querySnapshot.data().totalMeetings);
      console.log(querySnapshot.data())
    } else {
      // console.log("no")
    }
 }
  useEffect(() => {
    getAppDetails();
  }, []);
  async function changeCommissionHandler(e) {
    e.preventDefault();
    setCommission(e.target.commission.value);
    updateDoc(doc(collection(db, "app_details"), "money"), {
      commission:  parseInt(e.target.commission.value),
    });
    MySwal.clickConfirm();

  }
  const filterView = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div className="container">
          <h4>Change Commission</h4>
          <form onSubmit={changeCommissionHandler}>
            <input type="number" name="commission" id="commission"placeholder="enter commission"></input>
            <div className="text-end mt-4">
              <button className={"btn btn-success"} type="submit">
                Change
              </button>
            </div>
          </form>
        </div>
      ),
    });
  };
  async function changeCommissionHandler(e) {
    setCommission(e.target.commission.value);
    updateDoc(doc(collection(db, "app_details"), "money"), {
      commission:  parseInt(e.target.commission.value),
    });
    MySwal.clickConfirm();

  }
  async function editBannerHandler(e) {
    let uid = uuidv4();
    let path = "banners/" + uid ;
    let url = await uploadDocToStorageWithUrl({
      path: path,
      file: e.photos[0],
    })
    addDoc(collection(db, "banners"), {
    imageUrl: url,
  });
    MySwal.clickConfirm();
  }
  async function removeBanner(id) {
    deleteDoc(doc(db, "banners/"+id));
    MySwal.clickConfirm();
  }
  const editBlogView = async () => {
    getBanners().then(e=>{
      MySwal.fire({
        showConfirmButton: false,
        html: (
          <EditBanner handleSubmit={editBannerHandler} data={e} removeBanner={removeBanner}></EditBanner>
        ),
      });
    });
   
  };
 
  return (
    <>
      <div className="">
        <Head>
          <title>Dreshkan</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Admin Home</h1>
          <div className="container row">
            <div className="col-3">
            <button onClick={filterView} className="btn btn-primary">
              Change Commission
            </button>
            <br/>
            <br/>
            <button onClick={editBlogView} className="btn btn-primary">
              Edit Banners
            </button>
            <br/>
            </div>
            <div className="col-9">
           

          <p className="">
            Total Users : {totalUsers} <br />
            Total Astrologers :{totalAstrologers} <br />
            Total Orders :{totalOrders} <br />
            Current Commission for Astrologers :{100 - commission} <br />
            Wallet Balance : {adminWalletBalance}<br />
            Total Meetings : {totalMeetings}
          </p>
          </div>
          </div>

        </main>
      </div>
    </>
  );
}, EmployeePermissions.NONE);
Home.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Home;

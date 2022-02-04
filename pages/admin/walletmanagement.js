import layoutStyles from "../../styles/pages/admin/BaseLayout.module.css";
import styles from "../../styles/pages/admin/walletmanagement.module.css";
import FireImage from "../../components/FireImage";
import {BsFunnel} from "react-icons/bs";
import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firebase,auth } from "../../config";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import {
  walletWithdrawalConverter,
  WalletWithdrawal,
  WalletWithdrawalStatus,
  WalletWithdrawalType
} from "../../dbObjects/WalletWithdrawal";
import PendingRequestWallet from "../../components/adminPanel/pendingRequestsWallet";
import WalletHistory from "../../components/adminPanel/walletHistory";
import { EmployeePermissions } from "../../dbObjects/Employee";
import {
  astrologerPrivateDataConverter,
  AstrologerPrivateData,
} from "../../dbObjects/AstrologerPrivateInfo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);

const walletManagment = withAdminAuth(() => {
  const [history, setHistory] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentUser,setCurrentUser] = useState("")
  

  useEffect(() => {
    getWalletInformation();
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setCurrentUser(userAuth.uid);
      }
    })
  }, []);

  async function getWalletInformation() {
    const PRs = query(
      collection(db, "wallet_withdrawal"),
      where("status", "==", WalletWithdrawalStatus.INITIATED)
    );
    let querySnapshot = await getDocs(PRs);
    let data = querySnapshot.docs.map((doc) => {
      return new WalletWithdrawal({ id: doc.id, ...doc.data() });
    });
    setPendingRequests(data);

    const oldHistory = query(
      collection(db, "wallet_withdrawal"),
      where("status", "!=", WalletWithdrawalStatus.INITIATED)
    );
    querySnapshot = await getDocs(oldHistory);
    data = querySnapshot.docs.map((doc) => {
      return new WalletWithdrawal({ id: doc.id, ...doc.data() });
    });

    setHistory(data);
  }
  const approvePendingRequestView = (data) => {
     MySwal.fire({
       showConfirmButton: false,
       html: (
         <div>
           <form onSubmit={(e) => approvePendingRequest(data, e)}>
             <label htmlFor="type">Automate it ? </label>
             <input
               type="checkbox"
               name="type"
               id="type"
             />
             <br />
             <label htmlFor="type">Approved Amount </label>
             <input
               className="form-control"
               placeholder="Amount to be approved "
               name="approvedAmount"
               id="approvedAmount"
               type="number"
               max={data.amount}
               required
             />
             <label htmlFor="type">Please Fill transactionId (If want to do manually)</label>
             <input
               className="form-control"
               placeholder="transactionId "
               name="transactionId"
               id="transactionId"
             />

             <div className="text-end mt-4">
               <button
                 className={"btn btn-primary"}
                 type="submit"
               >
                 Approve
               </button>
             </div>
           </form>
         </div>
       ),
       preConfirm: () => {},
     });
   };

  async function astrologerPrivateDetailView(requestData) {
    getPrivateData(requestData.astrologer).then((data) =>
      MySwal.fire({
        title: `Astrologer ${data.astrologer}`,
        html: (
          <>
            <div className={`contianer text-start `}>
              <h5>Contact Info</h5>
              <div>Phone: {data.phoneNumber}</div>
              <div>
                Alternative Phone:{" "}
                {data.alternativePhoneNumber}
              </div>
              <h5 className={`my-2`}>Documents</h5>
              <br />
              <b>Aadhar card : </b>
              <FireImage
                src={data.verificationIdFront}
                layout="responsive"
                width="400"
                height="200"
              />
              <br />
              <FireImage
                src={data.verificationIdBack}
                layout="responsive"
                width="400"
                height="200"
              />
              <div className="my-4 d-flex flex-column gap-2">
                <h5>Account Info</h5>
                <div className="row ">
                  <div className="col font-weight-bold"> Pan Card Number </div>
                  <div className="col"> {data.pancardNumber} </div>
                </div>

                <div className="row">
                  <div className="col font-weight-bold"> Account Number </div>
                  <div className="col"> {data.accountInfo.accountNo} </div>
                </div>

                <div className="row">
                  <div className="col font-weight-bold"> IFSC Code </div>
                  <div className="col"> {data.accountInfo.ISFC} </div>
                </div>

                <div className="row">
                  <div className="col font-weight-bold"> Branch </div>
                  <div className="col">
                    {" "}
                    {data.accountInfo.bank + " " + data.accountInfo.branch}{" "}
                  </div>
                </div>

                <div className="row">
                  <div className="col font-weight-bold">
                    {" "}
                    Account Holders Name{" "}
                  </div>
                  <div className="col"> {data.accountInfo.holderName} </div>
                </div>
              </div>
            </div>
          </>
        ),
      })
    );
  }
  function removeFromPR(data) {
    let pr = pendingRequests;
    pr.splice(pendingRequests.indexOf(data), 1);
    setPendingRequests(pr);
  }
  async function getPrivateData(pid) {
    console.log(pid);
    const astros = collection(db, "astrologer/" + pid + "/privateInfo/");
    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(astrologerPrivateDataConverter)
    );
    return querySnapshot.data();
  }

  async function approvePendingRequest(data,e) {
    e.preventDefault();
    let private_data = await getPrivateData(data.astrologer);
    if(e.target.type.checked)
    {
    if (private_data.razorpayId == null || private_data.razorpayId == "") {
      alert(
        "please Update Razorpay Id of this astrologer , cannot proceed this request"
      );
      return;
    }
  }
    data.approvedBy = currentUser ;
    data.status = WalletWithdrawalStatus.APPROVED;
    data.approvedAmount = parseInt(e.target.approvedAmount.value);
    data.transactionId = e.target.transactionId.value;
    data.type = e.target.type.checked ? WalletWithdrawalType.automated : WalletWithdrawalType.manual;

    const ref = doc(db, "wallet_withdrawal", data.id).withConverter(
      walletWithdrawalConverter
    );
    await setDoc(ref, data);
    removeFromPR(data);
    setHistory([...history, data]);
    MySwal.clickConfirm();
  }
  

  async function rejectPendingRequest(data) {
    removeFromPR(data);
    data.status = WalletWithdrawalStatus.REJECTED;
    const ref = doc(db, "wallet_withdrawal", data.id).withConverter(
      walletWithdrawalConverter
    );
    await setDoc(ref, data);
    setHistory([...history, data]);
  }

  const [pageNum, setPageNum] = useState(0);
  const viewPendingRequest = () => {
    setPageNum(0);
  };
  const viewHistory = () => {
    setPageNum(1);
  };


  return (
    <div className={` ${layoutStyles.base_container} `}>
      <div className={`${layoutStyles.main_container}`}>
        <h2 className={`${layoutStyles.headingText}`}>Manage Wallet</h2>

        <div className={styles.topButtonContainer}>
          <div onClick={viewPendingRequest} className={`${styles.button} ${ pageNum == 0 ? styles.buttonActive : "" }`}>
            {" "}
            Pending Requests{" "}
          </div>
          <div onClick={viewHistory} className={`${styles.button} ${ pageNum == 1 ? styles.buttonActive : "" } `}>
            {" "}
            History{" "}
          </div>


          {/* <div onClick={() => {}} className={`${styles.filterButton}  `}>
            
          <BsFunnel/>
            Filter
          </div> */}

        </div>

        {/* Pending Requests  container */}

        <div
          className={styles.pendingRequestContainer}
          style={pageNum == 1 ? { display: "none" } : {}}
        >
          <PendingRequestWallet
            astrologerPrivateDetailView={astrologerPrivateDetailView}
            data={pendingRequests}
            ItemsPerPage={itemsPerPage}
            approvePendingRequest={approvePendingRequestView}
            rejectPendingRequest={rejectPendingRequest}
          ></PendingRequestWallet>
        </div>

        {/* Wallet history Container  */}
        <div
          className={styles.historyContainer}
          style={pageNum == 0 ? { display: "none" } : {}}
        >
          <WalletHistory
            astrologerPrivateDetailView={astrologerPrivateDetailView}
            data={history}
            ItemsPerPage={itemsPerPage}
          ></WalletHistory>
        </div>
      </div>
    </div>
  );
}, EmployeePermissions.WALLET_MANAGEMENT);

walletManagment.getLayout = function getLayout(page) {
  return <AdminLayout active_page="5">{page}</AdminLayout>;
};

export default walletManagment;

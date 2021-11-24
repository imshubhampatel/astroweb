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
import { firebase } from "../../config";
import AdminLayout from "../../components/adminPanel/layout";
import withAdminAuth from "../../auth/withAdminAuth";
import {
  walletWithdrawalConverter,
  WalletWithdrawal,
  WalletWithdrawalStatus,
} from "../../dbObjects/WalletWithdrawal";
import PendingRequestWallet from "../../components/adminPanel/pendingRequestsWallet";
import WalletHistory from "../../components/adminPanel/walletHistory";
import {
  astrologerPrivateDataConverter,
  AstrologerPrivateData,
} from "../../dbObjects/AstrologerPrivateInfo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);

const walletManagment = withAdminAuth(() => {
  const [history, setHistory] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    getWalletInformation();
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

  async function astrologerPrivateDetailView(requestData) {
    getPrivateData(requestData.astrologer).then(data => 
    MySwal.fire({
      title: `Astrologer ${data.astrologer}`,
      html: (
        <>
          <div className={`contianer text-start `}>
            <h5>Contact Info</h5>
            <h5 className={`my-2`}>Documents</h5>
            @TODO <br />
            Show adhar, pan images
            {data.verificationIdFront}
            <div className="my-4 d-flex flex-column gap-2">
              <h5>Account Info</h5>
              <div className="row ">
                <div className="col font-weight-bold"> Pan Card Number </div>
                <div className="col">
                  {" "}
                  {data.pancardNumber}{" "}
                </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> Account Number </div>
                <div className="col">
                  {" "}
                  {data.accountInfo.accountNo}{" "}
                </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> IFSC Code </div>
                <div className="col">
                  {" "}
                  {data.accountInfo.ISFC}{" "}
                </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> Branch </div>
                <div className="col">
                  {" "}
                  {data.accountInfo.bank +
                    " " +
                    data.accountInfo.branch}{" "}
                </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold">
                  {" "}
                  Account Holders Name{" "}
                </div>
                <div className="col">
                  {" "}
                  {data.accountInfo.holderName}{" "}
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    }));

  }
  function removeFromPR(data) {
    let pr = pendingRequests;
    pr.splice(pendingRequests.indexOf(data), 1);
    setPendingRequests(pr);
  }
  async function getPrivateData(pid) {
    console.log(pid)
    const astros = collection(db, "astrologer/" + pid + "/privateInfo/");
    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(astrologerPrivateDataConverter)
    );
    return querySnapshot.data();
  }

  async function approvePendingRequest(data) {
    let private_data = await getPrivateData(data.astrologer);
    if(private_data.razorpayId == null || private_data.razorpayId=="") {
      alert("please Update Razorpay Id of this astrologer , cannot proceed this request");
      return;
    }
    data.status = WalletWithdrawalStatus.APPROVED;
    const ref = doc(db, "wallet_withdrawal", data.id).withConverter(
      walletWithdrawalConverter
    );
    await setDoc(ref, data);
    removeFromPR(data);
    setHistory([...history, data]);
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

  return (
    <div className="container">
      <div className="row">
        <h3>Wallet Management</h3>
      </div>
      <div className="row">
        <div className="col">
          <PendingRequestWallet 
            astrologerPrivateDetailView={astrologerPrivateDetailView}
            data={pendingRequests}
            ItemsPerPage={itemsPerPage}
            approvePendingRequest={approvePendingRequest}
            rejectPendingRequest={rejectPendingRequest}
          ></PendingRequestWallet>
        </div>
        <div className="col">
          <WalletHistory
            astrologerPrivateDetailView={astrologerPrivateDetailView}
            data={history}
            ItemsPerPage={itemsPerPage}
          ></WalletHistory>
        </div>
      </div>
    </div>
  );
});

walletManagment.getLayout = function getLayout(page) {
  return <AdminLayout active_page="4">{page}</AdminLayout>;
};

export default walletManagment;

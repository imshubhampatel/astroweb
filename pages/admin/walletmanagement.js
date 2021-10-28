import React from 'react'
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebase } from "../../config";
import AdminLayout from "../../components/adminPanel/layout";
import useAdminAuth from "../../auth/useAdminAuth";
import WalletInfoCard from "../../components/adminPanel/WalletInfoCard";
import {
  walletWithdrawalConverter,
  WalletWithdrawal,
  WalletWithdrawalStatus,
} from "../../dbObjects/WalletWithdrawal";

const db = getFirestore(firebase);


const walletManagment = useAdminAuth(() => {
    const [history, setHistory] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        getWalletInformation();
    }, [])
    
  async function getWalletInformation() {
    const PRs = query(
      collection(db, "wallet_withdrawal"),
      where("status", "==", WalletWithdrawalStatus.INITIATED)
    );
    let querySnapshot = await getDocs(PRs);
    let data = querySnapshot.docs.map((doc) => { return new WalletWithdrawal({id:doc.id,...doc.data()})});
    setPendingRequests(data);
  
    const oldHistory = query(
      collection(db, "wallet_withdrawal"),
      where("status", "!=", WalletWithdrawalStatus.INITIATED)
    );
    querySnapshot  = await getDocs(oldHistory);
    data = querySnapshot.docs.map((doc) => {
      return  new WalletWithdrawal({ id: doc.id, ...doc.data() });
    });
    setHistory(data);
                           
  }
  function removeFromPR(data) {
    let pr = pendingRequests;
    pr.splice(pendingRequests.indexOf(data),1);
    setPendingRequests(pr);
  }

  async function approvePendingRequest(data) {
    removeFromPR(data);
    data.status = WalletWithdrawalStatus.APPROVED;
    const ref = doc(db, "wallet_withdrawal",data.id).withConverter(
            walletWithdrawalConverter
    );
    await setDoc(ref, data);
  }
  
  async function rejectPendingRequest(data) {
    removeFromPR(data);
    data.status = WalletWithdrawalStatus.REJECTED;
    const ref = doc(db, "wallet_withdrawal", data.id).withConverter(
    walletWithdrawalConverter
  );
  await setDoc(ref, data);

    }
    return (
      <div className="container">
        <div className="row">
          <h3>Wallet Management</h3>
        </div>
        <div className="row">
          <div className="col">
            <h4>Pending Requests </h4>

            {pendingRequests.map((e) => (
              <WalletInfoCard
                data={e}
                reject={rejectPendingRequest}
                approve={approvePendingRequest}
              ></WalletInfoCard>
            ))}
          </div>
          <div className="col">
            <h4>History </h4>
            {history.map((e) => (
              <WalletInfoCard data={e}></WalletInfoCard>
            ))}
          </div>
        </div>
      </div>
    );
});

walletManagment.getLayout = function getLayout(page) {
  return <AdminLayout active_page="4">{page}</AdminLayout>;
};

export default walletManagment

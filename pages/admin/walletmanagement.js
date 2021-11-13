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

const db = getFirestore(firebase);

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

  function removeFromPR(data) {
    let pr = pendingRequests;
    pr.splice(pendingRequests.indexOf(data), 1);
    setPendingRequests(pr);
  }

  async function approvePendingRequest(data) {
    removeFromPR(data);
    data.status = WalletWithdrawalStatus.APPROVED;
    const ref = doc(db, "wallet_withdrawal", data.id).withConverter(
      walletWithdrawalConverter
    );
    await setDoc(ref, data);
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
            data={pendingRequests}
            ItemsPerPage={itemsPerPage}
            approvePendingRequest={approvePendingRequest}
            rejectPendingRequest={rejectPendingRequest}
          ></PendingRequestWallet>
        </div>
        <div className="col">
          <WalletHistory
            data={history}
            ItemsPerPage={itemsPerPage}
          ></WalletHistory>
        </div>
      </div>
    </div>
  );
});

walletManagment.getLayout = function getLayout(page) {
  return <AdminLayout active_page="5">{page}</AdminLayout>;
};

export default walletManagment;

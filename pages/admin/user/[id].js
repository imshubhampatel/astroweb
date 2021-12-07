import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { firebase } from "../../../config";
import AdminLayout from "../../../components/adminPanel/layout";
import MeetingCard from "../../../components/adminPanel/meetingCard";
import TransactionCard from "../../../components/adminPanel/transactionCard";
import OrderCard from "../../../components/adminPanel/OrderCard";

import { isUser, setUserPerm, removeUserPerm } from "../../../auth/utils";
import withAdminAuth from "../../../auth/withAdminAuth";
import { UserConverter, User } from "../../../dbObjects/User";

const db = getFirestore(firebase);

const user = withAdminAuth(() => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  var [enabled, setenabled] = useState(true);
  const [meetings, setMeetings] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [activeState, setActiveState] = useState(0);
  const [orders, setOrders] = useState([]);

  async function getUserInfo(pid) {
    const astros = collection(db, "user");
    const querySnapshot = await getDoc(
      doc(astros, String(pid))
      // .withConverter(UserConverter)
    );
    if (querySnapshot.exists()) {
      setastro(querySnapshot.data());
    } else {
      // console.log("no")
    }
  }
  async function getAllOrders(uuid) {
    const astros = collection(db, "order");
    const querySnapshot = await getDocs(
      query(astros, where("user", "==", String(uuid)))
    );
    let data = querySnapshot.docs.map((doc) => {
      return {id:doc.id,...doc.data()}});
    //    console.log(data);
    setOrders(data);
  }
  async function getAllMeeting(uuid) {
    const astros = collection(db, "meetings");
    const querySnapshot = await getDocs(
      query(astros, where("user", "==", uuid))
    );
    let data = querySnapshot.docs.map((doc) => {
      return {id:doc.id,...doc.data()}});    setMeetings(data);
  }
  async function getAllWalletTransactions(uuid) {
    const astros = query(collection(db, "user", uuid, "wallet_transaction"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return {id:doc.id,...doc.data()}});  
        setWalletTransactions(data);
    return data;
  }

  async function toggleEnable(uid) {
    var response;
    if (!enabled) {
      response = await setUserPerm(uid);
    } else {
      response = await removeUserPerm(uid);
    }
    // console.log(response);
    setenabled(!enabled);
  }

  useEffect(() => {
    getUserInfo(pid);
    if (pid)
      isUser(pid).then((e) => {
        if (e) setenabled(true);
        else setenabled(false);
      });
  }, [pid]);

  const getDataForAstroLists = () => {
    switch (activeState) {
      case 1: {
        if (orders.length == 0) {
          getAllOrders(pid);
        }
        return (
          <div>
            {" "}
            {orders.map((e) => {
              return <OrderCard key={e.id} props={e}></OrderCard>;
            })}
          </div>
        );
      }
      case 2: {
        if (meetings.length == 0) {
          getAllMeeting(pid);
        }
        return (
          <ul>
            {meetings.map((e) => {
              return <MeetingCard key={e.id} props={e}></MeetingCard>;
            })}
          </ul>
        );
      }
      case 3: {
        if (walletTransactions.length == 0) {
          getAllWalletTransactions(pid);
        }
        return (
          <ul>
            {walletTransactions.map((e) => {
              return <TransactionCard key={e.id}  props={e}></TransactionCard>;
            })}
          </ul>
        );
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        {astro ? (
          <div className="container">
            <div className="row">
              <table>
                <tbody>
                  <tr>
                    <td> {astro.firstName + " " + astro.secondName}</td>
                    <td> {astro.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td> {astro.email}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <button
                  className={"btn btn-primary"}
                  onClick={() => toggleEnable(pid)}
                >
                  Enabled : {enabled ? "   On  " : "  off   "}
                </button>
              </div>
            </div>
          </div>
        ) : (
          "no user"
        )}
      </div>

      <br></br>
      <hr></hr>

      <div className="row">
        <div className="row">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button
                className={`nav-link ${activeState == 1 ? "active" : ""}`}
                onClick={() => setActiveState(1)}
              >
                Orders History
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeState == 2 ? "active" : ""}`}
                onClick={() => setActiveState(2)}
              >
                Meeting History
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${activeState == 3 ? "active" : ""}`}
                onClick={() => setActiveState(3)}
              >
                Wallet History
              </button>
            </li>
          </ul>
        </div>
        <hr></hr>
        <div className="row">{getDataForAstroLists()}</div>
      </div>
    </div>
  );
});

user.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};
export default user;

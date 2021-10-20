import React,{useState,useEffect} from 'react'
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
import {firebase} from '../../../config'
import AdminLayout from "../../../components/adminPanel/layout";
import Review from "../../../components/adminPanel/Review";
import MeetingCard from "../../../components/adminPanel/meetingCard";
import  TransactionCard from "../../../components/adminPanel/transactionCard";

import { isAstrologer, setAstrologerPerm, removeAstrologerPerm } from '../../../auth/utils'
import useAdminAuth from '../../../auth/useAdminAuth'
import {astrologerConverter,Astrologer} from '../../../dbObjects/Astrologer'

const db = getFirestore(firebase);

const astrologer = useAdminAuth(() => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  var [enabled, setenabled] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [activeState, setActiveState] = useState(0);
  
    
    async function getAstrologerInfo(pid) {
        const astros = collection(db, "astrologer");
        const querySnapshot = await getDoc(doc(astros, String(pid)).withConverter(astrologerConverter));
        if (querySnapshot.exists())
        {
            setastro(querySnapshot.data())
        }
        else {
            // console.log("no")
        }
    }
  async function getAllReviews(uuid) {
     const astros = query(collection( db, "astrologer", uuid, "astrologer_reviews"));
     const querySnapshot = await getDocs(astros);
     let data = querySnapshot.docs.map((doc) => doc.data());
    setReviews(data);
    return data;
  }
  async function getAllMeeting(uuid) {
    const astros = collection(db, "meetings");
    const querySnapshot = await getDocs(query(astros, where("astrologer", "==", uuid)));
    let data = querySnapshot.docs.map((doc) => doc.data());
    setMeetings(data);

  }
  async function getAllWalletTransactions(uuid) {
    const astros = query(
      collection(db, "astrologer", uuid, "astrologer_wallet_transactions")
    );
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => doc.data());
    setWalletTransactions(data);
    return data;
  }
  
  async function toggleEnable(uid) {
        var response;
        if (!enabled)
        {
           response = await setAstrologerPerm(uid);
        }
        else {
           response = await removeAstrologerPerm(uid);
        }
        // console.log(response);
        setenabled(!enabled);
    }
    async function toggleVerify(uid) {
        const ref = doc(
              db,
              "astrologer",
              String(uid)
            ).withConverter(astrologerConverter);

         if (!astro.verified) {
             setastro({ ...astro, verified: true });   
            await updateDoc(ref, { ...astro, verified: true });
  
         } else {
           setastro({ ...astro, verified: false });
            await updateDoc(ref, { ...astro, verified: false });

         }
     }
    useEffect(() => {
        getAstrologerInfo(pid);
        if(pid)
        isAstrologer(pid).then((e) => {
            if (e)
                setenabled(true);
            else setenabled(false);
        })

    }, [pid]);
  
  const getDataForAstroLists = () => {
    switch (activeState) {
     
      case 1: {
        if (reviews.length == 0)
        {
          getAllReviews(pid);
          }
        return (
          <div>
            {" "}
            {reviews.map((e) => {
              return <Review props={e}></Review>;
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
                return <MeetingCard props={e}></MeetingCard>;
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
                return <TransactionCard props={e}></TransactionCard>;
              })}
            </ul>
           );        
      }
    }
  }

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
                      <td> {astro.verified ? "Verified" : "Not Verified"}</td>
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

                  <button
                    className={"btn btn-primary"}
                    onClick={() => toggleVerify(pid)}
                  >
                    Verified : {astro.verified ? "  Yes  " : "  Nope   "}
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
                  aria-current="page"
                  onClick={() => setActiveState(1)}
                >
                  Reviews
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
})

astrologer.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};
export default astrologer

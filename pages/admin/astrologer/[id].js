import styles from "../../../styles/pages/admin/astrologer/[id].module.css";
import RatingBox from "../../../components/ratingBox";

import { MdOutlineMessage } from "react-icons/md";
import { FiPhoneCall, FiEdit } from "react-icons/fi";
import { BiVideoPlus } from "react-icons/bi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
import Review from "../../../components/adminPanel/Review";
import MeetingCard from "../../../components/adminPanel/meetingCard";
import TransactionCard from "../../../components/adminPanel/transactionCard";

import {
  isAstrologer,
  setAstrologerPerm,
  removeAstrologerPerm,
} from "../../../auth/utils";
import withAdminAuth from "../../../auth/withAdminAuth";
import { astrologerConverter, Astrologer } from "../../../dbObjects/Astrologer";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);

const astrologer = withAdminAuth(() => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  const [enabled, setenabled] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [activeState, setActiveState] = useState(0);

  async function getAstrologerInfo(pid) {
    const astros = collection(db, "astrologer");
    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(astrologerConverter)
    );
    if (querySnapshot.exists()) {
      setastro(querySnapshot.data());
    } else {
      // console.log("no")
    }
  }
  async function getAllReviews(uuid) {
    const astros = query(
      collection(db, "astrologer", uuid, "astrologer_reviews")
    );
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    setReviews(data);
    return data;
  }
  async function getAllMeeting(uuid) {
    const astros = collection(db, "meetings");
    const querySnapshot = await getDocs(
      query(astros, where("astrologer", "==", uuid))
    );
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    setMeetings(data);
  }
  async function getAllWalletTransactions(uuid) {
    const astros = query(
      collection(db, "astrologer", uuid, "astrologer_wallet_transactions")
    );
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    setWalletTransactions(data);
    return data;
  }

  async function toggleEnable(uid) {
    var response;
    if (!enabled) {
      response = await setAstrologerPerm(uid);
    } else {
      response = await removeAstrologerPerm(uid);
    }
    // console.log(response);
    setenabled(!enabled);
  }
  async function toggleVerify(uid) {
    const ref = doc(db, "astrologer", String(uid)).withConverter(
      astrologerConverter
    );

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
    if (pid)
      isAstrologer(pid).then((e) => {
        if (e) setenabled(true);
        else setenabled(false);
      });
  }, [pid]);

  const getDataForAstroLists = () => {
    switch (activeState) {
      case 1: {
        if (reviews.length == 0) {
          getAllReviews(pid);
        }
        return reviews.map((e) => {
          return <Review key={e.id} props={e.data}></Review>;
        });
      }
      case 2: {
        if (meetings.length == 0) {
          getAllMeeting(pid);
        }
        return (
          
            meetings.map((e) => {
              return <MeetingCard key={e.id} props={e.data}></MeetingCard>;
            })
          
        );
      }
      case 3: {
        if (walletTransactions.length == 0) {
          getAllWalletTransactions(pid);
        }
        return (
          <ul>
            {walletTransactions.map((e) => {
              return (
                <TransactionCard key={e.id} props={e.data}></TransactionCard>
              );
            })}
          </ul>
        );
      }
    }
  };

  return (
    <div className={` ${styles.base_container} `}>
      <div className={`${styles.main_container}`}>
        <h2 className={`${styles.headingText}`}>
          Astrologer Management System
        </h2>

        <div className={`${styles.mainInfoContainer}`}>
          <div className={`${styles.astroPhoto}`}></div>

          <div className={`${styles.astroInfo}`}>
            <h4>Astrologer Mahesh</h4>

            <div className={`d-flex `}>
              <div className={`me-2`}>15th January 1991</div>

              <div className={`mx-2`}>mahesh112@gmail.com</div>

              <div className={`ms-2`}>+91 1234567869</div>
            </div>

            <i>Vedic, Tarot</i>

            <br />

            <i>15 Years of experience </i>

            <br />

            <i>Hindi English, Sanskrit </i>
          </div>
          <div className={`${styles.subContainer}`}>
          {astro.verified ==false ? 
          <>
            <button
              className={`${styles.astroVerifyButton} ${styles.astroButton}`}
              onClick={() => toggleVerify(pid)}
            >
              {" "}
              Verify Astrologer
            </button>
            <button
              className={`${styles.astroDiscardButton}  ${styles.astroButton}`}
            >
              {" "}
              Discard Request
            </button>
            </>
          :           
          <button
            className={"btn btn-primary"}
            onClick={() => toggleEnable(pid)}
          >
            Enabled : {enabled ? "   On  " : "  off   "}
          </button>}</div> 
          
        </div>

        {/* About Container  */}
        <div className={`mt-3`}>
          <div className={`d-flex`}>
            <h5 className={`me-2`}>About Mahesh </h5>
            <RatingBox rating="4.3" />

            <div
              className={`ms-auto  ${styles.textButton}`}
              onClick={() => MySwal.fire("More Details ")}
            >
              More Details
            </div>
          </div>

          <p>
            Id deserunt ad cupidatat sit nulla pariatur deserunt aliquip. Quis
            dolore voluptate ad incididunt nisi. Veniam minim fugiat magna amet
            minim aute reprehenderit culpa. Veniam tempor fugiat eiusmod
            adipisicing veniam cillum ad pariatur duis. Veniam qui enim laboris
            id commodo ea. Do fugiat cillum cupidatat labore et mollit nostrud
            non. Mollit irure do magna esse consequat.
          </p>
        </div>

        {/* Accomplishments Container  */}
        <div className={`row  justify-content-center`}>
          <div className="col-2  ">
            <h5> Accomplishments </h5>
          </div>

          <div className="col-2 border-end  text-center">
            <MdOutlineMessage /> 10k mins
          </div>

          <div className="col-2   text-center">
            <FiPhoneCall /> 10k mins
          </div>

          <div className="col-2 border-start  text-center">
            <BiVideoPlus /> 10k mins
          </div>

          <div className="col  "></div>
        </div>

        {/* Pricing Container  */}
        <div className={`row  justify-content-center my-3`}>
          <div className="col-2  ">
            <h5> Price/minute </h5>
          </div>

          <div className="col-2  border-end text-center">
            <MdOutlineMessage /> 10k mins
          </div>

          <div className="col-2  text-center">
            <FiPhoneCall /> 10k mins
          </div>

          <div className="col-2 border-start text-center">
            <BiVideoPlus /> 10k mins
          </div>

          <div
            className={`col   text-end ${styles.textButton} `}
            onClick={() => {}}
          >
            <FiEdit />
            Edit Price
          </div>
        </div>

        <div className={`${styles.buttonContainer}`}>
          <button
            className={`${styles.yelloButton}   ${
              activeState == 1 ? styles.yelloButtonActive : ""
            } `}
            aria-current="page"
            onClick={() => setActiveState(1)}
          >
            Reviews
          </button>

          <button
            className={`${styles.yelloButton}   ${
              activeState == 2 ? styles.yelloButtonActive : ""
            }  `}
            onClick={() => setActiveState(2)}
          >
            Meeting History
          </button>

          <button
            className={`${styles.yelloButton}  ${
              activeState == 3 ? styles.yelloButtonActive : ""
            }   `}
            onClick={() => setActiveState(3)}
          >
            Wallet History
          </button>
        </div>

        <div className="my-3">{getDataForAstroLists()}</div>
      </div>
    </div>
  );
}

);

astrologer.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};
export default astrologer;

{
  /* <div className="container">
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
</div> */
}

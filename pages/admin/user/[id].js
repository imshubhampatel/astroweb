import layoutStyles from "../../../styles/pages/admin/BaseLayout.module.css";
import styles from "../../../styles/pages/admin/user/[id].module.css";
import ToggleButton from "../../../components/SimpleToggleButton";
import {
  AiOutlineCalendar,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";
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
import { EmployeePermissions } from "../../../dbObjects/Employee";
import FireImage from "../../../components/FireImage";

import { isUser, setUserPerm, removeUserPerm } from "../../../auth/utils";
import withAdminAuth from "../../../auth/withAdminAuth";
import { UserConverter, User } from "../../../dbObjects/User";

const db = getFirestore(firebase);

// const user = withAdminAuth(() => {

const user = () => {
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
      return { id: doc.id, ...doc.data() };
    });
    //    console.log(data);
    setOrders(data);
  }
  async function getAllMeeting(uuid) {
    const astros = collection(db, "meetings");
    const querySnapshot = await getDocs(
      query(astros, where("userUid", "==", uuid))
    );
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setMeetings(data);
  }
  async function getAllWalletTransactions(uuid) {
    const astros = query(collection(db, "user", uuid, "wallet_transaction"));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
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
          <>
            {orders.map((e) => {
              return <OrderCard key={e.id} props={e}></OrderCard>;
            })}
          </>
        );
      }
      case 2: {
        if (meetings.length == 0) {
          getAllMeeting(pid);
        }
        return (
          <>
            {meetings.map((e) => {
              return <MeetingCard key={e.id} props={e}></MeetingCard>;
            })}
          </>
        );
      }
      case 3: {
        if (walletTransactions.length == 0) {
          getAllWalletTransactions(pid);
        }
        return (
          <>
            {walletTransactions.map((e) => {
              return <TransactionCard key={e.id} props={e}></TransactionCard>;
            })}
          </>
        );
      }
    }
  };

  return (
    <div className={` ${layoutStyles.base_container} `}>
      <div className={`${layoutStyles.main_container}`}>
        <h2 className={`${layoutStyles.headingText}`}>
          User Management System
        </h2>

        <div className={`${styles.mainInfoContainer}`}>
          <div className={`${styles.astroPhoto}`} style={{ display: "block" }}>
            {astro.profilePhoto ? (
              <>
                <FireImage
                  src={astro.profilePhoto}
                  layout="responsive"
                  width="400"
                  height="400"
                />
              </>
            ) : (
              ""
            )}{" "}
          </div>

          <div className={`${styles.astroInfo}`}>
            <h4>User {astro.firstName + " " + astro.secondName}</h4>

            <div className={`d-flex flex-column gap-1 `}>
              <div className={`${styles.astroInfoText}`}>
                <AiOutlineCalendar />{" "}
                {astro.dob ? new Date(astro.dob).toDateString() : ""}
              </div>

              <div className={`${styles.astroInfoText}`}>
                <AiOutlinePhone /> {astro.phoneNumber}
              </div>

              <div className={`${styles.astroInfoText}`}>
                <AiOutlineMail /> {astro.email}
              </div>
            </div>
          </div>

          <div className={`${styles.subContainer}`}>
            Enabled{" "}
            <ToggleButton
              size="32"
              initialState={enabled}
              clickHandler={() => {
                toggleEnable(pid);
              }}
            />
          </div>
        </div>

        <div className={`${styles.buttonContainer}`}>
          <button
            className={`${styles.blueButton}   ${
              activeState == 1 ? styles.blueButtonActive : ""
            } `}
            aria-current="page"
            onClick={() => setActiveState(1)}
          >
            Reviews
          </button>

          <button
            className={`${styles.blueButton}   ${
              activeState == 2 ? styles.blueButtonActive : ""
            }  `}
            onClick={() => setActiveState(2)}
          >
            Meeting History
          </button>

          <button
            className={`${styles.blueButton}  ${
              activeState == 3 ? styles.blueButtonActive : ""
            }   `}
            onClick={() => setActiveState(3)}
          >
            Wallet History
          </button>
        </div>

        <div className="d-flex my-3 gap-1">{getDataForAstroLists()}</div>
      </div>
    </div>
  );
};

// ,EmployeePermissions.USER_MANAGEMENT);

user.getLayout = function getLayout(page) {
  return <AdminLayout active_page="0">{page}</AdminLayout>;
};
export default user;



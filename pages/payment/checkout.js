import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/pages/index.module.css";
import Logo from "../../public/images/logo_transparent.png";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/dist/client/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeRazorpay } from "../../utilities/razorypay/intializeRazorpay";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebase } from "../../config";
import { adminfirebase } from "../../AdminConfig";
import { initiateCall } from "../../utilities/astrologer/InitiateCall";
export default function InitiateCall() {
  // admin and auth and top of variables
  const MySwal = withReactContent(Swal);
  const auth = getAuth(firebase);
  const adminAuth = getAuth(adminfirebase);
  const router = useRouter();
  let id = router.query.id;

  // useState ?
  const [astrologer, setAstrologer] = useState("");
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    placeOfBirth: "",
    timeOfBirth: "",
    dateOfBirth: "",
    query: "",
    customerNumber: "",
    language: "",
    astrologerUid: "",
    userUid: "",
    language: "",
  });

  // useEffect ??

  // useState for getting the astrolger data from server  ?
  useEffect(() => {
    if (!id) return;
    getAstrologer(id);
  }, [id]);

  // useEffect for user authentication and uid

  useEffect(() => {
    console.log("called");
    onAuthStateChanged(adminAuth, (Authuser) => {
      if (Authuser) {
        setUser(Authuser);
        console.log("user", Authuser.uid);
      } else {
        onAuthStateChanged(auth, (User) => {
          console.log("User", User);
          router.push({
            pathname: "/signin",
          });
        });
      }
    });
  }, []);

  // useEffect for logging changes in state ?
  useEffect(() => {
    console.table(userDetails);
  }, [userDetails]);

  // useEffect for logging changes in state ?
  useEffect(() => {
    if (!user) return;
    setUserDetails({ ...userDetails, userUid: user.uid });
  }, [user]);

  // useEffect for setting astrolger uid
  useEffect(() => {
    if (!astrologer) return;
    setUserDetails({ ...userDetails, astrologerUid: astrologer?.id });
  }, [astrologer]);

  useEffect(() => {}, []);

  // functions ?

  const openingAlertView = () => {
    MySwal.fire({
      showConfirmButton: false,
      customClass: {
        htmlContainer: styles.maincontainer,
      },
      html: (
        <div>
          <div className={styles.close}>
            <CloseIcon
              style={{ marginLeft: "auto" }}
              onClick={() => {
                Swal.clickConfirm();
              }}
            />
          </div>

          <div>
            <Image height={140} width={140} src={Logo} />
            <h2 className={styles.heading}>Call Placed Successfully </h2>
          </div>
          <hr />
          <h4 className={styles.subheading}>
            Get in instant touch with Astrologers
          </h4>
          <hr />

          <h6 className={styles.subpartheading}>
            DRESHKAN- A PRODUCT OF ASTROCHRCHA{" "}
          </h6>
        </div>
      ),
    });
  };

  async function getAstrologer(uid) {
    let db = getFirestore(firebase);
    const astros = query(collection(db, "astrologer"), where("id", "==", uid));
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log(data);
    setAstrologer(data[0]);
  }

  let redirectHandler = () => {};

  const onChangeInput = (name) => (e) => {
    setUserDetails({ ...userDetails, [name]: e.target.value });
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    console.log("submitted");
    let res = await initializeRazorpay();
    let data = await fetch(
      "https://us-central1-astrochrchafirebase.cloudfunctions.net/webApi/api/intiatetransaction_razorypay",
      {
        method: "POST",
      }
    ).then((data) => data.json());

    console.log(data);

    if (!res) {
      alert("eroor");
      return;
    }
    console.log(data);
    var options = {
      key: "rzp_test_FuZPDTFdRxeNou", // Enter the Key ID generated from the Dashboard
      name: "bt-contrivers",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.
        try {
        let paymentStatus = await fetch(
          `https://us-central1-astrochrchafirebase.cloudfunctions.net/webApi/api/razor_capture/${response.razorpay_payment_id}`,
          {
            method: "POST",
          }
        ).then((data) => data.json());
          console.log(response);
          console.log("paymentStatus",paymentStatus);
        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name: "Shubham Patel",
        email: "shubhampatel2024@gmail.com",
        contact: "+919389112183",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // try {

    //   let result = await initiateCall(userDetails);
    //   console.log("result", result);
    //   if (result) {
    //     openingAlertView();
    //   }
    // } catch (error) {
    //   console.log(error.response.data || error.response || error);
    // }
  }

  return (
    <div className="main_calling_div">
      <div className="parentDivCalling">
        <div className="astrologer_info">
          <div className="astrologersImage">
            <img src={astrologer?.profilePicLink} />
          </div>
          <div className="astrologersContent"></div>
        </div>
        <div className="user_info">
          <h3>Please fill the Details</h3>
          <form>
            <div>
              <label htmlFor="first-name">First name</label>
              <input
                required
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={userDetails.firstName}
                onChange={onChangeInput("firstName")}
              />
            </div>

            <div>
              <label htmlFor="last-name">Last name</label>
              <input
                required
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                value={userDetails.lastName}
                onChange={onChangeInput("lastName")}
              />
            </div>

            <div>
              <label htmlFor="email-address">Contact Number</label>
              <input
                required
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="username"
                value={userDetails.customerNumber}
                onChange={onChangeInput("customerNumber")}
                className="text-input"
              />
            </div>

            <div>
              <label htmlFor="email-address">Date of Birth</label>
              <input
                required
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                value={userDetails.dateOfBirth}
                onChange={onChangeInput("dateOfBirth")}
              />
            </div>

            <div>
              <label htmlFor="email-address">Place Of Birth</label>
              <input
                required
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="username"
                value={userDetails.placeOfBirth}
                onChange={onChangeInput("placeOfBirth")}
              />
            </div>
            <div>
              <label htmlFor="email-address">Time of Birth</label>
              <input
                required
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="username"
                value={userDetails.timeOfBirth}
                onChange={onChangeInput("timeOfBirth")}
              />
            </div>
            <div>
              <label htmlFor="email-address">Language</label>
              <input
                required
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="username"
                value={userDetails.language}
                onChange={onChangeInput("language")}
              />
            </div>

            <div>
              <label htmlFor="email-address">Enter your Query</label>
              <textarea
                required
                value={userDetails.query}
                onChange={onChangeInput("query")}
              />
            </div>
          </form>
          <button type="submit" onClick={(e) => onSubmitHandler(e)}>
            Call now
          </button>
        </div>
      </div>
    </div>
  );
}

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
export default function Checkout() {
  // admin and auth and top of variables
  const MySwal = withReactContent(Swal);
  const auth = getAuth(firebase);
  const adminAuth = getAuth(adminfirebase);
  const router = useRouter();
  let id = router.query.user;

  // useState ?
  const [amount, setAmount] = useState(0);

  // useEffect ??

  // useState for getting the astrolger data from server  ?

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
            <h2 className={styles.heading}>Your Payment was successfull </h2>
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

  let redirectHandler = () => {};

  const onChangeInput = (name) => (e) => {
    setUserDetails({ ...userDetails, [name]: e.target.value });
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    console.log("submitted");
    let res = await initializeRazorpay();
    let data = await fetch(
      // "http://localhost:5001/astrochrchafirebase/us-central1/webApi/api/intiatetransaction_razorypay",
      "https://us-central1-astrochrchafirebase.cloudfunctions.net/webApi/api/intiatetransaction_razorypay",
      {
        method: "POST",
        body: JSON.stringify({
          userUid: id,
          amount: amount,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
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
            // `http://localhost:5001/astrochrchafirebase/us-central1/webApi/api/razor_capture/${response.razorpay_payment_id}`,
            `https://us-central1-astrochrchafirebase.cloudfunctions.net/webApi/api/razor_capture/${response.razorpay_payment_id}`,
            {
              method: "POST",
              body: JSON.stringify({
                userUid: id,
                amount: data.amount,
              }),

              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          ).then((data) => data.json());
          console.log(response);
          console.log("paymentStatus", paymentStatus);
          console.log("hey callling");
          let makePayment = await fetch(
            // `http://localhost:5001/astrochrchafirebase/us-central1/webApi/api/updatetransaction_razorpay`,
            `https://us-central1-astrochrchafirebase.cloudfunctions.net/webApi/api/updatetransaction_razorpay`,
            {
              method: "POST",
              body: JSON.stringify({
                USER: id,
                ORDERID: data.receipt,
                TXNAMOUNT: data.amount / 100,
                STATUS: "TXN_SUCCESS",
                TXNID: response.razorpay_payment_id,
                CASHBACK_ID: "",
              }),

              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );
          openingAlertView();
          console.log("makePayment", makePayment);
          router.push({ pathname: "/user" });
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
  }

  return (
    <div className="user_payment">
      <h3>Recharge Wallet</h3>
      <form>
        <div>
          <label htmlFor="email-address">Amount</label>
          <input
            required
            type="number"
            name="number"
            id="number"
            autoComplete="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-input"
          />
        </div>
      </form>

      <div className="payment_cards">
        <ul>
          <li value={10} onClick={() => setAmount(10)}>
            <span>10 </span>
          </li>
          <li value={50} onClick={() => setAmount(50)}>
            <span>50 </span>
          </li>
          <li value={100} onClick={() => setAmount(100)}>
            <span>100 </span>
          </li>
          <li value={200} onClick={() => setAmount(200)}>
            <span>200 </span>
          </li>
          <li value={500} onClick={() => setAmount(500)}>
            <span>500 </span>
          </li>
          <li value={1000} onClick={() => setAmount(1000)}>
            <span>1000 </span>
          </li>
        </ul>
      </div>
      <button type="submit" onClick={(e) => onSubmitHandler(e)}>
        Pay now
      </button>
    </div>
  );
}

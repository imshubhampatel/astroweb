import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/components/RegistrationForm2.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import GooglePlayBadge from "../public/images/google-play-badge.png";
import Image from "next/image";
import { useRouter } from "next/router";
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
import { firebase } from "../config";
import { adminfirebase } from "../AdminConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const db = getFirestore(firebase);

const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function UserRegistrationForm(props) {
  const auth = getAuth(firebase);
  const adminAuth = getAuth(adminfirebase);
  const [user, setUser] = useState(props.userProfile);
  let isRegistered = props.isRegistered;
  const [date, setDate] = useState(getDate());
  const [currentTab, setCurrentTab] = useState(0);
  const [rejectedPage, sethardRegister] = useState(true);
  const [userId, setUserId] = useState("");
  const [walletBalance, setWalletBalance] = useState("0000");

  useEffect(() => {
    console.log("one");
    console.log("called");
    onAuthStateChanged(adminAuth, (Authuser) => {
      if (Authuser) {
        setUser(Authuser);
        console.log("user", Authuser.uid);
        setUserId(Authuser.uid);
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

  // console.log(user)
  useEffect(() => {
    if (!userId == "") {
      getUserWalletBalance();
    }
  }, [userId]);
  async function getUserWalletBalance() {
    const que = query(collection(db, "user"), where("uid", "==", `${userId}`));
    const querySnapshot = await getDocs(que);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    let userData = data[0];
    console.log(userData);
    setWalletBalance(userData.walletBalance);
  }

  const router = useRouter();
  const paymentClickHandler = () => {
    router.push({
      pathname: "/payment/checkout",
      query: { user: userId },
    });
  };

  const firetoast = (name) => {
    Toast.fire({
      icon: "error",
      title: "Please fill " + name + " !",
    });
  };
  useEffect(() => {
    setUser(props.userProfile);
  }, [props.userProfile]);

  function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    // console.log(today);
    return today;
  }
  // Return Form Completion Page
  if (props.isRegistered) {
    if (currentTab == 0)
      return (
        <div className={`${styles.baseContainer}`}>
          <div className="container-fluid bg-white">
            <div className={`row`}>
              <div className="col-sm" style={{ background: "#FBE5AD" }}>
                <div className={`${styles.imageContainer}`} />
              </div>

              <div className="col-sm-8 my-4  ">
                <div className="row mt-10">
                  <div className="col">
                    <button
                      className="btn btn-success"
                      onClick={() => setCurrentTab(1)}
                    >
                      Profile
                    </button>
                  </div>
                  <div className="col">
                    <div className="main-wallet-container">
                      <h4>Account Credits</h4>
                      <div className="wallet-container">
                        <div className="wallet-box">
                          <span>₹</span>
                        </div>
                        <div className="user-wallet">
                          <div className="wallet-balance">
                            {walletBalance && (
                              <p>{walletBalance && walletBalance}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-wallet"
                        onClick={() => paymentClickHandler()}
                      >
                        Recharge Now
                      </button>
                    </div>
                  </div>
                </div>
                <br></br>
                <br></br>
                <div className="row">
                  <center>
                    <p className="mx-sm-auto text-sm-center">
                      Hey {user.firstName}, Welcome to Dreshkan !<br></br>
                      For availing all the consultation services and getting
                      free reports <br />
                      Download our app now on playstore !
                    </p>
                    <div className={styles.badge_container}>
                      <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
                        <a>
                          <Image src={GooglePlayBadge} />
                        </a>
                      </Link>
                    </div>

                    <div
                      className={`${styles.endingBlueText} mx-auto text-center my-5 `}
                    >
                      May you have a great day
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    else if (currentTab == 1) {
      return (
        <div className={`${styles.baseContainer}`}>
          <div className="container-fluid bg-white">
            <div className={`row`}>
              <div className="col-sm" style={{ background: "#FBE5AD" }}>
                <div className={`${styles.imageContainer}`} />
              </div>

              <div className="col-sm-8 my-4  ">
                <div className="row mt-10">
                  <div className="col">
                    <button
                      className="btn btn-success"
                      onClick={() => setCurrentTab(0)}
                    >
                      Back
                    </button>
                  </div>
                  <div className="col"></div>
                </div>
                <br></br>
                <br></br>
                <div className="row">
                  <center>
                    <h3> Profile</h3>

                    <div
                      className={
                        "card text-black border-warning mb-3 m-3 " +
                        `${styles.profileCard}`
                      }
                    >
                      <div className="card-body border-warning">
                        <Image
                          src={
                            user?.profilePhotoLink
                              ? user?.profilePhotoLink
                              : "/images/logo_transparent.png"
                          }
                          width="200"
                          height="200"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          {user.firstName + " " + user.lastName}
                        </h5>
                        <p className="card-text">
                          <b>Place of Birth : </b>
                          {user.placeOfBirth}
                          <br />
                          <b> DOB : </b>
                          {user?.dob?.toDate()?.toDateString()}
                        </p>
                      </div>
                      <ul className="list-group border-warning list-group-flush">
                        <li className="list-group-item border-warning">
                          {" "}
                          Email : {user?.email}
                        </li>
                        <li className="list-group-item border-warning">
                          Phone number :{" "}
                          {user?.phoneNumber
                            ? user?.phoneNumber
                            : "Please fill this !"}
                        </li>
                      </ul>
                      <div className="card-body bg-warning">
                        <Link href="https://play.google.com/store/apps/details?id=com.dreshkan">
                          <a>Download our app now on Playstore !</a>
                        </Link>
                      </div>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className={`${styles.baseContainer}`}>
        <div className="container-fluid bg-white">
          <div className={`row`}>
            <div className="col-sm" style={{ background: "#FBE5AD" }}>
              <div className={`${styles.imageContainer}`} />
            </div>

            <div className="col-sm-8 my-4 my-sm-0 d-sm-flex flex-column justify-content-between">
              {/* Form Container  */}
              <div className={`container m-0 py-sm-3 ${styles.formContainer} `}>
                <h3 className={`${styles.mainHeading}`}>
                  User Registration Form
                </h3>

                <form
                  className={`row g-3 needs-validation`}
                  onSubmit={props.registerFormHandler}
                >
                  {/* Form Part one  */}
                  <div className={`col-xs-12 col-md-6`}>
                    <label htmlFor="firstName" className="form-label">
                      First Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      required
                    />
                  </div>

                  <div className={`col-xs-12 col-md-6`}>
                    <label htmlFor="lastName" className="form-label">
                      Last Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      required
                    />
                  </div>

                  <div className={`col-12 `}>
                    <label htmlFor="email" className="form-label">
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={user.email}
                      readOnly={user.email ? true : false}
                    />
                  </div>

                  <div className={`col-12 `}>
                    <label htmlFor="dob" className="form-label">
                      Date of Birth <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      max={date}
                      required
                    />
                  </div>
                  <div className={`col-12 `}>
                    <label htmlFor="phone" className="form-label">
                      Place Of Birth <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="placeOfBirth"
                      name="placeOfBirth"
                      required
                    />
                  </div>

                  <div className={`col-12 `}>
                    <label htmlFor="phone" className="form-label">
                      Your Phone Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      readOnly={user.phoneNumber ? true : false}
                      required
                    />
                  </div>

                  {/* Form Part Two  */}

                  <div className={`col-12 `}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="tnc"
                        aria-describedby="tncFeedback"
                        required
                      />
                      <label className="form-check-label" htmlFor="tnc">
                        Agree to{" "}
                        <Link href="/termsncondition">
                          <a>
                            <u>Terms and conditions</u>
                          </a>
                        </Link>
                      </label>
                      <div id="tnc" className="invalid-feedback">
                        You must agree before submitting. Please read all the
                        terms and conditions carefully before submitting *
                      </div>
                    </div>
                  </div>

                  <div className={`col-xs-12 `}>
                    <div className="float-end mt-5">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        id="submitButton"
                        name="submitButton"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegistrationForm;

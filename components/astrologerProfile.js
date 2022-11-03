import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/components/RegistrationForm2.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import GooglePlayBadge from "../public/images/google-play-badge.png";
import Image from "next/image";
import router from "next/router";

import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

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
function AstrologerProfile(props) {
  let user = props.userProfile;
  const [currentTab, setCurrentTab] = useState(0);

  const firetoast = (name) => {
    Toast.fire({
      icon: "error",
      title: "Please fill " + name + " !",
    });
  };
  useEffect(() => {}, []);

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
                <div className="col"></div>
              </div>
              <br></br>
              <br></br>
              <div className="row">
                <center>
                  <p className="mx-sm-auto text-sm-center">
                    Hey Astrologer {user.firstName}, Welcome to Dreshkan !
                    <br></br>
                    For working with us on providing consultations via chat ,
                    voice and video , Download our app now on playstore !
                  </p>
                  <div className={styles.badge_container}>
                    <Link href="https://play.google.com/store/apps/details?id=com.astrologer.dreshkan.astrologer_dreshkan">
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
                          user?.profilePicLink
                            ? user?.profilePicLink
                            : "/images/loading.svg"
                        }
                        width="200"
                        height="200"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {"Astrologer " + user.firstName + " " + user.secondName}
                      </h5>
                      <p className="card-text">
                        <b>Address : </b>
                        {user.address}
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
                      <Link href="https://play.google.com/store/apps/details?id=com.astrologer.dreshkan.astrologer_dreshkan">
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
}

export default AstrologerProfile;

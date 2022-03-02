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
function UserRegistrationForm(props) {
  let user = props.userProfile;
  let isRegistered = props.isRegistered;
  const [date, setDate] = useState(getDate());
  const [currentTab, setCurrentTab] = useState(0);
  const [rejectedPage, sethardRegister] = useState(true);
  // console.log(user)

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
                  <div className="col"></div>
                  <div className="col">
                    <button className="btn btn-success" onClick={()=>setCurrentTab(1)}>Profile</button>
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
    else if(currentTab == 1) {
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
                  <button className="btn btn-success" onClick={()=>setCurrentTab(0)}>Back</button>
                  </div>
                  <div className="col"></div>
                </div>
                <br></br>
                <br></br>
                <div className="row">
                  <center>
                  <div className="card text-white bg-warning border-light mb-3 m-3" >
                    <div className="card-body">
                    <Image src={user?.profilePhotoLink ? user?.profilePhotoLink : "/images/loading.svg"} width="200" height="200" />
                    </div>
                  <div className="card-body">
                    <h5 className="card-title">{user.firstName + " " + user.lastName}</h5>
                    <p className="card-text">{user.placeOfBirth}<br/> {user?.dob?.toDate()?.toDateString()}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"> Email : {user?.email}</li>
                    <li className="list-group-item">Phone number : {user?.phoneNumber ? user?.phoneNumber : "Please fill this !"}</li>
                  </ul>
                  <div className="card-body">
                
                  </div>
                </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>);

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
                      readOnly
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

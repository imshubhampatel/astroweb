import React, { useState } from "react";
import styles from "../styles/components/RegistrationForm2.module.css";
import Link from "next/link";

function RegistrationForm(props) {
 
  const user = props.user;
  const [date, setDate] = useState(getDate());

  const [formPage, setFormPage] = useState(1);
  const toggleFormPage = () => {
    setFormPage(formPage === 1 ? 2 : 1);
  };

  function getDate()
  {
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
    console.log(today)
    return today;
  }

  return (
    <div className={`${styles.baseContainer}`}>
      <div className="container-fluid bg-white">
        <div className={`row`}>
          <div className="col-sm">
            <div className={`${styles.imageContainer}`} />
          </div>

          <div className="col-sm-8 my-4 my-sm-0 d-sm-flex flex-column justify-content-between">
            {/* Form Container  */}
            <div className={`container m-0 py-sm-3 ${styles.formContainer} `}>
              <h3 className={`${styles.mainHeading}`}>
                Astrologer Registration Form
              </h3>

              <form className={`row g-3`} onSubmit={props.registerFormHandler}>
                {/* Form Part one  */}
                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-xs-12 col-md-6`}
                >
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-xs-12 col-md-6`}
                >
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="secondName"
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    nam="email"
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="date" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="dob"
                    max={date}
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="address" className="form-label">
                    Complete Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label
                    htmlFor="alternativePhoneNumber"
                    className="form-label"
                  >
                    Alternate Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="alternativePhoneNumber"
                    name="alternativePhoneNumber"
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <div>
                    <label className="form-label" htmlFor="maleOption">
                      Gender
                    </label>
                  </div>
                  <div className={`d-flex justify-content-between flex-wrap`}>
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      value="male"
                      id="maleOption"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-warning"
                      htmlFor="maleOption"
                    >
                      Male
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      value="female"
                      id="femaleOption"
                      autoComplete="off"
                    />
                    <label
                      className={`btn btn-outline-warning `}
                      htmlFor="femaleOption"
                    >
                      Female
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      value="other"
                      id="other"
                      autoComplete="off"
                    />
                    <label
                      className={`btn btn-outline-warning `}
                      htmlFor="opther"
                    >
                      Other
                    </label>
                  </div>
                </div>

                {/* Form Part Two  */}

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6 `}
                >
                  <label htmlFor="verificationIdFront" className="form-label">
                    (Aadhar/DL) Front
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="verificationIdFront"
                    name="verificationIdFront"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6 `}
                >
                  <label htmlFor="verificationIdBack" className="form-label">
                    (Aadhar/DL) Back
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="verificationIdBack"
                    name="verificationIdBack"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="profilePicture" className="form-label">
                    Recent Profile Picture
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="profilePicture"
                    name="profilePicture"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="pancard" className="form-label">
                    PAN Card
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="pancard"
                    name="pancard"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="pancardNumber" className="form-label">
                    PAN Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pancardNumber"
                    name="pancardNumber"
                    required
                  />
                </div>
                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
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
                      Agree to terms and conditions
                    </label>
                    <div id="tncFeedback" className="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-xs-12 `}
                >
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

            {/* Bottom button container  */}
            <div
              className={`  ${styles.formContainer} mt-4 mt-sm-0 mb-sm-4 px-4`}
            >
              <div className={`d-flex `}>
                <button
                  onClick={() => toggleFormPage()}
                  className={`btn btn-warning ms-auto`}
                >
                  {formPage === 1 ? "Next" : "Back"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;

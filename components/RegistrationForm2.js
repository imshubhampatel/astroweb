import React, { useState } from "react";
import styles from "../styles/components/RegistrationForm2.module.css";
import Link from "next/link";

function RegistrationForm(props) {
  const Expertise = [
    "vedicAstrology",
    "tarotCardReading",
    "numerlogy",
    "matchMaking",
  ];
  const user = props.user;

  const [formPage, setFormPage] = useState(1);
  const toggleFormPage = () => {
    setFormPage(formPage === 1 ? 2 : 1);
  };

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

              <form className={`row g-3`}>
                {/* Form Part one  */}
                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-xs-12 col-md-6`}
                >
                  <label htmlFor="firstNameInput" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstNameInput"
                    name="firstName"
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-xs-12 col-md-6`}
                >
                  <label htmlFor="lastNameInput" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastNameInput"
                    name="lastName"
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="emailInput" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
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
                    name="phone"
                    required
                  />
                </div>

                <div
                  style={formPage === 2 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="lastNameInput" className="form-label">
                    Alternate Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="lastNameInput"
                    name="lastName"
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
                      id="opther"
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
                  <label htmlFor="id-document-front" className="form-label">
                    (Aadhar/DL) Front
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="id-document-front"
                    name="id-document-front"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6 `}
                >
                  <label htmlFor="id-document-back" className="form-label">
                    (Aadhar/DL) Back
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="id-document-back"
                    name="id-document-back"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 `}
                >
                  <label htmlFor="profile-pic" className="form-label">
                    Recent Profile Picture
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="profile-pic"
                    name="profile-pic"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="pancard-pic" className="form-label">
                    PAN Card
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="pancard-pic"
                    name="pancard-pic"
                    required
                  />
                </div>

                <div
                  style={formPage === 1 ? { display: "none" } : {}}
                  className={`col-12 col-md-6`}
                >
                  <label htmlFor="pancard-number" className="form-label">
                    PAN Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pancard-number"
                    name="pancard-number"
                    required
                  />
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

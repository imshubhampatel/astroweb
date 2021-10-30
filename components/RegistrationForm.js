import React from 'react'
import styles from "../styles/Home.module.css";
import Link from "next/link";

function RegistrationForm(props) {
    const Expertise = ['vedicAstrology',"tarotCardReading","numerlogy","matchMaking"]
    const user = props.user;
    return (
      <div>
        <div className="container">
          <div>
            <hr />
            <h4>Your Registered Phone Number : {user.phoneNumber}</h4>

            <h2>Complete Your Registration </h2>
            <div>
              <form onSubmit={props.registerFormHandler}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={user?.email}
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <label for="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="form-group col">
                    <label for="secondName">Second Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="secondName"
                      placeholder="Second Name"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label for="dob"> Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    placeholder="Date of Birth"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="address"> Complete Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="phoneNumber">Extra Phone Number </label>
                  <input
                    type="text"
                    // pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                    className="form-control"
                    name="phoneNumber"
                    placeholder={user.phoneNumber}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="gender">Gender</label>
                  <select className="form-control" id="gender" name="gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <label for="verificationId">
                  {" "}
                  Upload ID verification documents - Aadhaar / DL
                </label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    name="verificationId"
                    id="verificationId"
                    required
                  />
                </div>

                <label for="profilePicture"> Profile Picture</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    name="profilePicture"
                    id="profilePicture"
                    required
                  />
                </div>
                <label for="profilePicture"> Pan Card</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    name="pancard"
                    id="pancard"
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="pancardNumber"
                    id="pancardNumber"
                    placeholder="Pancard Number"
                    required
                  />
                </div>

                <div>
                  <hr />
                  <h7>Please read and accept : </h7>
                  <Link href="#">
                    <a> Terms & Conditions</a>
                  </Link>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="tnc"
                      aria-describedby="tncFeedback"
                      required
                    />
                    <label className="form-check-label" for="tnc">
                      Agree to terms and conditions
                    </label>
                    <div id="tncFeedback" className="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default RegistrationForm

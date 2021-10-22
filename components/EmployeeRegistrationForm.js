import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

function EmployeeRegistrationForm(props) {
  return (
    <div>
      <div className="container">
        <div>
          <hr />

          <h2> Add New Employee </h2>
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
                  required
                />
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
                <label for="phoneNumber">Phone Number </label>
                <input
                  type="text"
                  // pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                  className="form-control"
                  name="phoneNumber"
                  placeholder={"Phone Number"}
                  required
                />
              </div>
              <div className="form-group">
                <label for="gender">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  required
                >
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

export default EmployeeRegistrationForm;
